const { chromium } = require('playwright');
const path = require('path');

async function captureCharts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport size for consistency
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Navigate to the app
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for charts to render
  await page.waitForTimeout(2000);

  // Capture full page screenshot
  const screenshotPath = path.join(__dirname, 'screenshot-charts.png');
  await page.screenshot({
    path: screenshotPath,
    fullPage: false
  });

  console.log(`Screenshot saved to: ${screenshotPath}`);

  // Try to find the Department Analysis section and capture just that
  const deptSection = await page.$('text=Department Analysis Across Scenarios');
  if (deptSection) {
    // Get the parent container that has both charts
    const parentContainer = await deptSection.evaluateHandle(el => {
      let parent = el.parentElement;
      // Go up until we find a container with both charts
      while (parent && !parent.querySelector('.recharts-wrapper')) {
        parent = parent.parentElement;
      }
      return parent;
    });

    if (parentContainer) {
      const sectionScreenshot = path.join(__dirname, 'screenshot-dept-charts.png');
      await parentContainer.screenshot({ path: sectionScreenshot });
      console.log(`Section screenshot saved to: ${sectionScreenshot}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureCharts().catch(console.error);
