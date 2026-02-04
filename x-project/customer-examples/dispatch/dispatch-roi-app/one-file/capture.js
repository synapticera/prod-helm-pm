const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORT = 3479;

async function capture() {
  console.log('Starting capture...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 2 // 2x for retina
  });
  const page = await context.newPage();

  console.log(`Loading page at http://localhost:${PORT}...`);
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Extract computed styles
  console.log('Extracting styles...');
  const styles = await page.evaluate(() => {
    let css = '';
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          css += rule.cssText + '\n';
        }
      } catch (e) {
        // Skip cross-origin stylesheets
      }
    }
    return css;
  });

  // Clean up font references
  const cleanedStyles = styles
    .replace(/url\(["']?\.\.\/media\/[^)]+["']?\)/g, 'local("Inter")')
    .replace(/url\(["']?\/_next\/[^)]+["']?\)/g, 'local("Inter")');

  // Capture header as screenshot (includes logos and branding)
  console.log('Capturing header...');
  const headerElement = await page.$('header');
  let headerB64 = '';
  if (headerElement) {
    const screenshot = await headerElement.screenshot({ type: 'png' });
    headerB64 = screenshot.toString('base64');
  }

  // ----- Tab 1: Core Data -----
  console.log('Capturing Tab 1: Spend & Savings...');
  await page.waitForSelector('main');

  const tab1TableHtml = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return '';
    const firstSection = main.querySelector('.space-y-6 > div:first-child');
    return firstSection ? firstSection.outerHTML : '';
  });

  // Capture Tab 1 chart section
  const tab1ChartSection = await page.$('.bg-surface.border.border-border.rounded-xl');
  let tab1ChartB64 = '';
  if (tab1ChartSection) {
    const screenshot = await tab1ChartSection.screenshot({ type: 'png' });
    tab1ChartB64 = screenshot.toString('base64');
  }

  // ----- Tab 2: EBITDA & EV -----
  console.log('Capturing Tab 2: EBITDA & EV...');
  await page.click('button:has-text("EBITDA")');
  await page.waitForTimeout(1500);

  const tab2TableHtml = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return '';
    const sections = main.querySelectorAll('.space-y-5 > div');
    return sections[0] ? sections[0].outerHTML : '';
  });

  const tab2ChartSection = await page.$('.bg-surface.border.border-border.rounded-xl');
  let tab2ChartB64 = '';
  if (tab2ChartSection) {
    const screenshot = await tab2ChartSection.screenshot({ type: 'png' });
    tab2ChartB64 = screenshot.toString('base64');
  }

  // ----- Tab 3: Cash Flow -----
  console.log('Capturing Tab 3: Cash Flow...');
  await page.click('button:has-text("Cash Flow")');
  await page.waitForTimeout(1500);

  const tab3Html = await page.evaluate(() => {
    const main = document.querySelector('main');
    return main ? main.innerHTML : '';
  });

  // ----- Tab 4: AI Roadmap -----
  console.log('Capturing Tab 4: AI Roadmap...');
  await page.click('button:has-text("AI Roadmap")');
  await page.waitForTimeout(1500);

  const tab4Html = await page.evaluate(() => {
    const main = document.querySelector('main');
    return main ? main.innerHTML : '';
  });

  // Build final HTML
  console.log('Building standalone HTML...');
  const html = buildHtml({
    styles: cleanedStyles,
    header: headerB64,
    tab1Table: tab1TableHtml,
    tab1Chart: tab1ChartB64,
    tab2Table: tab2TableHtml,
    tab2Chart: tab2ChartB64,
    tab3: tab3Html,
    tab4: tab4Html
  });

  const outputPath = path.join(__dirname, 'dispatch-roi.html');
  fs.writeFileSync(outputPath, html);

  const stats = fs.statSync(outputPath);
  console.log(`\nSaved: dispatch-roi.html (${(stats.size / 1024).toFixed(0)} KB)`);

  await browser.close();
  console.log('Done!');
}

function buildHtml({ styles, header, tab1Table, tab1Chart, tab2Table, tab2Chart, tab3, tab4 }) {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dispatch AI Opportunity Analysis</title>
  <style>
    @font-face { font-family: 'Geist'; src: local('Inter'), local('SF Pro Display'), local('Segoe UI'); }
    @font-face { font-family: 'Geist Mono'; src: local('SF Mono'), local('Monaco'), local('Consolas'); }
    ${styles}
    .tab-panel { display: none !important; }
    .tab-panel.active { display: block !important; }
    .chart-image { width: 100%; border-radius: 12px; }
    /* Ensure proper dark background */
    body { background: var(--background, #0a0a0a) !important; }
    .header-image { width: 100%; display: block; }
  </style>
</head>
<body>
  <!-- Header captured as image to preserve all branding -->
  <div class="sticky top-0 z-50">
    <img src="data:image/png;base64,${header}" alt="Header" class="header-image">
  </div>

  <!-- Tab Navigation -->
  <div class="border-b border-border">
    <div class="container mx-auto px-6">
      <div class="flex gap-1">
        <button onclick="switchTab('core-data')" data-tab="core-data" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-accent-blue text-accent-blue">Spend & Savings by Department</button>
        <button onclick="switchTab('ebitda-ev')" data-tab="ebitda-ev" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary hover:text-text-primary">EBITDA & EV Impact</button>
        <button onclick="switchTab('cash-flow')" data-tab="cash-flow" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary hover:text-text-primary">Cash Flow Analysis</button>
        <button onclick="switchTab('ai-roadmap')" data-tab="ai-roadmap" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary hover:text-text-primary">AI Roadmap</button>
      </div>
    </div>
  </div>

  <main class="container mx-auto py-4" style="padding-left: 100px; padding-right: 100px;">
    <!-- Tab 1: Spend & Savings -->
    <div id="panel-core-data" class="tab-panel active">
      <div class="space-y-6">
        ${tab1Table}
        ${tab1Chart ? `<img src="data:image/png;base64,${tab1Chart}" class="chart-image" alt="Department Analysis Charts">` : ''}
      </div>
    </div>

    <!-- Tab 2: EBITDA & EV -->
    <div id="panel-ebitda-ev" class="tab-panel">
      <div class="space-y-5">
        ${tab2Table}
        ${tab2Chart ? `<img src="data:image/png;base64,${tab2Chart}" class="chart-image" alt="Financial Impact Charts">` : ''}
      </div>
    </div>

    <!-- Tab 3: Cash Flow -->
    <div id="panel-cash-flow" class="tab-panel">
      ${tab3}
    </div>

    <!-- Tab 4: AI Roadmap -->
    <div id="panel-ai-roadmap" class="tab-panel">
      ${tab4}
    </div>
  </main>

  <script>
    function switchTab(tabId) {
      // Hide all panels
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      // Show selected panel
      const panel = document.getElementById('panel-' + tabId);
      if (panel) panel.classList.add('active');

      // Update tab button styles
      document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.dataset.tab === tabId;
        btn.classList.toggle('border-accent-blue', isActive);
        btn.classList.toggle('text-accent-blue', isActive);
        btn.classList.toggle('border-transparent', !isActive);
        btn.classList.toggle('text-text-secondary', !isActive);
      });
    }
  </script>
</body>
</html>`;
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
