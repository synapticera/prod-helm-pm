# Dispatch AI ROI Navigator

An interactive financial analysis tool showing AI transformation scenarios and enterprise value impact for Dispatch.

## Quick Start

```bash
npm install
npm run dev
```

App runs at **http://localhost:3000**

## Project Structure

```
dispatch-roi-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main page with tab navigation
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles & CSS variables
│   ├── components/
│   │   ├── charts/            # Recharts visualizations
│   │   │   ├── EBITDAProgressionChart.tsx
│   │   │   ├── EVGrowthChart.tsx
│   │   │   ├── SavingsCompositionChart.tsx
│   │   │   ├── SavingsPercentageChart.tsx
│   │   │   └── SpendByDepartmentChart.tsx
│   │   ├── layout/            # Header, ScenarioSelector
│   │   ├── sections/          # KeyInsightsSidebar
│   │   └── tables/            # Data tables for each tab
│   │       ├── CoreDataTable.tsx      # Tab 1: Spend & Savings
│   │       ├── EBITDAImpactTable.tsx  # Tab 2: EBITDA & EV
│   │       ├── CashFlowTable.tsx      # Tab 3: Cash Flow Analysis
│   │       ├── AIRoadmapTable.tsx     # Tab 4: AI Roadmap
│   │       └── ScenarioComparisonTable.tsx
│   └── lib/
│       ├── data/
│       │   ├── index.ts       # Data access functions
│       │   └── dispatch-roi.json  # ALL FINANCIAL DATA
│       └── utils/
│           ├── calculations.ts # Savings calculations
│           ├── colors.ts       # Department color mapping
│           └── formatters.ts   # Currency/percent formatting
├── one-file/                   # Standalone HTML generation
│   ├── CLAUDE.md              # Capture script documentation
│   └── dispatch-roi.html      # Generated standalone file
├── public/                     # Static assets (logo)
└── archive/                    # Old files for reference
```

## The 4 Tabs

### Tab 1: Spend & Savings by Department

- Department costs vs industry median benchmarks
- Visual "vs Market Median" indicator with dot chart
- AI savings potential across 3 scenarios (Incremental, Moderate, Aggressive)
- Total row with aggregate savings percentages

### Tab 2: EBITDA & EV Impact

- EBITDA progression across scenarios
- Enterprise Value at different multiples (8x, 10x, 12x)
- ROI metrics and payback periods

### Tab 3: Cash Flow Analysis

- 7-year DCF projection (Aggressive scenario)
- Key assumptions (revenue growth, WACC, tax rate, D&A, CapEx)
- DCF valuation with discount factors
- Valuation summary and key insights

### Tab 4: AI Roadmap

- Department-by-department AI opportunities
- Use cases and market evidence
- Implementation timeline guidance

## Data Structure

All financial data lives in `src/lib/data/dispatch-roi.json`:

```json
{
  "company": { "name", "metrics": { "totalRevenue", "ebitda", ... } },
  "departments": [
    {
      "id": "css",
      "name": "Customer Success & Service",
      "annualSpend": 2767617,
      "percentOfRevenue": 0.108,
      "benchmark": { "median": 0.08, "topQuartile": 0.06 },
      "aiOpportunity": { "useCases": [...], "evidence": [...] }
    }
  ],
  "aiScenarios": {
    "departmentImpact": {
      "css": { "conservative": 0.125, "moderate": 0.30, "aggressive": 0.45 }
    }
  },
  "projectedOutcomes": { ... },
  "enterpriseValueImpact": { ... }
}
```

## Key Components

### CashFlowTable.tsx (Tab 3)

Contains hardcoded projection data for the 7-year DCF:

- `projections[]` - Year 0-7 cash flow data
- `discountFactors[]` - PV discount factors at 12% WACC
- `presentValues[]` - Calculated PV for each year
- Valuation summary with DCF components and key insights

### CoreDataTable.tsx (Tab 1)

- Calculates savings using `calculateDepartmentSavings()` from lib/utils
- Visual benchmark comparison with dot chart
- Aggregate totals with deviation from market median

## Styling

Uses Tailwind CSS with custom CSS variables in `globals.css`:

```css
--background, --surface, --surface-elevated
--text-primary, --text-secondary, --text-tertiary
--accent-blue, --accent-green, --accent-red
--synaptic-orange (highlight color)
--border, --border-strong
```

Dark theme only. Cards use `bg-surface border border-border rounded-xl p-4 backdrop-blur-xl`.

## Formatting Utilities

```typescript
import {
  formatCurrency,
  formatPercent,
  formatAccounting
} from "@/lib/utils/formatters";

formatCurrency(1234567); // "$1.2M"
formatPercent(0.157); // "15.7%"
formatAccounting(-500000); // { text: "($500.0K)", isNegative: true }
```

---

# Generating Standalone HTML

The `one-file/` folder contains tools to generate a single HTML file that works without a server.

## How It Works

1. Run the Next.js dev server
2. Use Playwright to capture each tab's content
3. Capture chart sections as 2x resolution PNG screenshots
4. Extract all CSS rules from the rendered page
5. Embed everything into a single HTML file

## Regenerating

### 1. Start dev server

```bash
npm run dev
# Note the port (usually 3000)
```

### 2. Run capture script

Create `one-file/capture.js`:

```javascript
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 2 // 2x for retina
  });
  const page = await context.newPage();

  const PORT = 3000; // UPDATE IF NEEDED

  console.log("Loading page...");
  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Extract styles
  const styles = await page.evaluate(() => {
    let css = "";
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) css += rule.cssText + "\n";
      } catch (e) {}
    }
    return css;
  });

  const cleanedStyles = styles
    .replace(/url\(["']?\.\.\/media\/[^)]+["']?\)/g, 'local("Inter")')
    .replace(/url\(["']?\/_next\/[^)]+["']?\)/g, 'local("Inter")');

  // Capture Tab 1
  console.log("Capturing Tab 1...");
  const tab1Chart = await page.$(".bg-surface.border.border-border.rounded-xl");
  const tab1ChartB64 = tab1Chart
    ? (await tab1Chart.screenshot({ type: "png" })).toString("base64")
    : "";
  const tab1Table = await page.evaluate(() => {
    const s = document.querySelector("main > div > div:first-child");
    return s ? s.outerHTML : "";
  });

  // Capture Tab 2
  console.log("Capturing Tab 2...");
  await page.click('button:has-text("EBITDA")');
  await page.waitForTimeout(1000);
  const tab2Table = await page.evaluate(() => {
    const s = document.querySelector("main > div > div:first-child");
    return s ? s.outerHTML : "";
  });
  const tab2Chart = await page.$(".bg-surface.border.border-border.rounded-xl");
  const tab2ChartB64 = tab2Chart
    ? (await tab2Chart.screenshot({ type: "png" })).toString("base64")
    : "";

  // Capture Tab 3
  console.log("Capturing Tab 3...");
  await page.click('button:has-text("Cash Flow")');
  await page.waitForTimeout(1000);
  const tab3Html = await page.evaluate(
    () => document.querySelector("main")?.innerHTML || ""
  );

  // Capture Tab 4
  console.log("Capturing Tab 4...");
  await page.click('button:has-text("AI Roadmap")');
  await page.waitForTimeout(1000);
  const tab4Html = await page.evaluate(
    () => document.querySelector("main")?.innerHTML || ""
  );

  // Get logo
  const logoB64 = await page.evaluate(() => {
    const logo = document.querySelector("header img");
    if (!logo) return "";
    try {
      const canvas = document.createElement("canvas");
      canvas.width = logo.naturalWidth || 200;
      canvas.height = logo.naturalHeight || 40;
      canvas.getContext("2d").drawImage(logo, 0, 0);
      return canvas.toDataURL("image/png");
    } catch (e) {
      return logo.src;
    }
  });

  // Build final HTML
  const html = buildHtml(
    cleanedStyles,
    logoB64,
    tab1Table,
    tab1ChartB64,
    tab2Table,
    tab2ChartB64,
    tab3Html,
    tab4Html
  );

  fs.writeFileSync(path.join(__dirname, "dispatch-roi.html"), html);
  console.log(
    `Saved: dispatch-roi.html (${(fs.statSync(path.join(__dirname, "dispatch-roi.html")).size / 1024).toFixed(0)} KB)`
  );

  await browser.close();
}

function buildHtml(
  styles,
  logo,
  tab1Table,
  tab1Chart,
  tab2Table,
  tab2Chart,
  tab3,
  tab4
) {
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
  </style>
</head>
<body>
  <header class="border-b border-border backdrop-blur-xl sticky top-0 z-50" style="background: var(--surface);">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center gap-3">
        <img src="${logo}" alt="Dispatch" class="h-8">
        <div class="h-8 w-px bg-border mx-2"></div>
        <h1 class="text-xl font-bold text-text-primary">AI Opportunity Analysis</h1>
      </div>
    </div>
  </header>
  <div class="border-b border-border">
    <div class="container mx-auto px-6 flex gap-1">
      <button onclick="switchTab('core-data')" data-tab="core-data" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-accent-blue text-accent-blue">Spend & Savings by Department</button>
      <button onclick="switchTab('ebitda-ev')" data-tab="ebitda-ev" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary">EBITDA & EV Impact</button>
      <button onclick="switchTab('cash-flow')" data-tab="cash-flow" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary">Cash Flow Analysis</button>
      <button onclick="switchTab('ai-roadmap')" data-tab="ai-roadmap" class="tab-btn px-6 py-3 text-sm font-medium border-b-2 border-transparent text-text-secondary">AI Roadmap</button>
    </div>
  </div>
  <main class="container mx-auto py-4" style="padding-left: 100px; padding-right: 100px;">
    <div id="panel-core-data" class="tab-panel active"><div class="space-y-6">${tab1Table}<img src="data:image/png;base64,${tab1Chart}" class="chart-image"></div></div>
    <div id="panel-ebitda-ev" class="tab-panel"><div class="space-y-6">${tab2Table}<img src="data:image/png;base64,${tab2Chart}" class="chart-image"></div></div>
    <div id="panel-cash-flow" class="tab-panel">${tab3}</div>
    <div id="panel-ai-roadmap" class="tab-panel">${tab4}</div>
  </main>
  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + tabId)?.classList.add('active');
      document.querySelectorAll('.tab-btn').forEach(btn => {
        const active = btn.dataset.tab === tabId;
        btn.classList.toggle('border-accent-blue', active);
        btn.classList.toggle('text-accent-blue', active);
        btn.classList.toggle('border-transparent', !active);
        btn.classList.toggle('text-text-secondary', !active);
      });
    }
  </script>
</body>
</html>`;
}

capture().catch(console.error);
```

### 3. Run it

```bash
npx playwright install chromium  # First time only
node one-file/capture.js
```

## Standalone Limitations

- Charts are static images (no hover tooltips)
- Data updates require regenerating the file
- Uses system fonts instead of Geist

---

# Common Tasks

## Update Cash Flow Data (Tab 3)

Edit `src/components/tables/CashFlowTable.tsx`:

- `projections[]` array contains year-by-year data
- `discountFactors[]` and `presentValues[]` for DCF
- Key assumptions at top of component

## Update Department Data

Edit `src/lib/data/dispatch-roi.json`:

- `departments[]` for spend and benchmarks
- `aiScenarios.departmentImpact` for savings percentages
- `projectedOutcomes` for scenario results

## Add New Department

1. Add to `departments[]` in JSON with `id`, `name`, `annualSpend`, `benchmark`, `aiOpportunity`
2. Add savings rates to `aiScenarios.departmentImpact[newId]`
3. Add color mapping in `src/lib/utils/colors.ts`

## Change Scenarios

Scenarios are defined in `aiScenarios.definitions[]` in the JSON. The app uses:

- `conservative` (displayed as "Incremental")
- `moderate` (displayed as "Moderate")
- `transformed` (displayed as "Aggressive")

---

# Build & Deploy

```bash
npm run build    # Production build
npm start        # Start production server
```

See `archive/DEPLOY.md` for GCP Cloud Run deployment instructions.
