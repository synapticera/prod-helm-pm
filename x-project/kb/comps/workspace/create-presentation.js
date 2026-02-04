const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/wkarp/devlocal/prod-helm-pm/.claude/skills/x:pptx/scripts/html2pptx');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Synaptic brand colors (without # for PptxGenJS)
const COLORS = {
    blue: '01A9DB',
    orange: 'FB4100',
    navy: '07253D',
    grayBlue: '44546A',
    white: 'FFFFFF',
    lightGray: 'F5F7FA',
    mediumGray: 'E8ECF0'
};

const workspace = '/Users/wkarp/devlocal/prod-helm-pm/x-project/kb/comps/workspace';

// Create Venn diagram as PNG
async function createVennDiagram() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 600 500">
  <defs>
    <style>
      .circle { fill-opacity: 0.25; stroke-width: 3; }
      .label { font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #07253D; }
      .center-label { font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; fill: #FB4100; }
    </style>
  </defs>

  <!-- BI Circle - Top Left -->
  <circle cx="220" cy="180" r="130" class="circle" fill="#01A9DB" stroke="#01A9DB"/>
  <text x="150" y="120" class="label">BI</text>

  <!-- BPM Circle - Top Right -->
  <circle cx="380" cy="180" r="130" class="circle" fill="#FB4100" stroke="#FB4100"/>
  <text x="420" y="120" class="label">BPM</text>

  <!-- ITOM Circle - Bottom Left -->
  <circle cx="220" cy="340" r="130" class="circle" fill="#44546A" stroke="#44546A"/>
  <text x="130" y="420" class="label">ITOM</text>

  <!-- SI Circle - Bottom Right -->
  <circle cx="380" cy="340" r="130" class="circle" fill="#07253D" stroke="#07253D"/>
  <text x="420" y="420" class="label">SI</text>

  <!-- Center Helm logo area -->
  <circle cx="300" cy="260" r="50" fill="#FB4100" stroke="#07253D" stroke-width="3"/>
  <text x="300" y="265" class="center-label" text-anchor="middle" fill="white">HELM</text>
</svg>`;

    await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(workspace, 'venn-diagram.png'));

    return path.join(workspace, 'venn-diagram.png');
}

// Create TAM visual as PNG
async function createTAMVisual() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400">
  <defs>
    <style>
      .label { font-family: Arial, sans-serif; font-weight: bold; fill: white; }
      .value { font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; fill: white; }
    </style>
  </defs>

  <!-- TAM Circle (largest) -->
  <circle cx="250" cy="200" r="180" fill="#01A9DB" fill-opacity="0.3" stroke="#01A9DB" stroke-width="2"/>
  <text x="250" y="50" class="label" font-size="14" text-anchor="middle" fill="#07253D">TAM: $400B+</text>

  <!-- SAM Circle -->
  <circle cx="250" cy="220" r="120" fill="#01A9DB" fill-opacity="0.5" stroke="#01A9DB" stroke-width="2"/>
  <text x="250" y="130" class="label" font-size="14" text-anchor="middle" fill="#07253D">SAM: $127B</text>

  <!-- SOM Circle (smallest) -->
  <circle cx="250" cy="240" r="60" fill="#FB4100" stroke="#FB4100" stroke-width="2"/>
  <text x="250" y="235" class="label" font-size="12" text-anchor="middle">SOM</text>
  <text x="250" y="255" class="label" font-size="12" text-anchor="middle">$31B</text>
</svg>`;

    await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(workspace, 'tam-visual.png'));

    return path.join(workspace, 'tam-visual.png');
}

// HTML Slides
const slides = {
    // Slide 1: Title
    title: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #07253D; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #07253D; font-family: Arial, sans-serif;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.title { color: #FFFFFF; font-size: 36pt; font-weight: bold; text-align: center; margin: 20pt; }
.subtitle { color: #01A9DB; font-size: 20pt; text-align: center; margin: 10pt; }
.date { color: #FFFFFF; font-size: 14pt; text-align: center; margin-top: 40pt; opacity: 0.8; }
.accent-bar { width: 200pt; height: 4pt; background: #FB4100; margin: 20pt auto; }
</style>
</head>
<body>
<h1 class="title">Helm: Competitive Landscape<br/>& Category Analysis</h1>
<div class="accent-bar"></div>
<p class="subtitle">The Executive Agent Platform Opportunity</p>
<p class="date">February 2026</p>
</body>
</html>`,

    // Slide 2: Category Thesis
    categoryThesis: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #07253D; padding: 15pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 24pt; margin: 0; }
.content { display: flex; flex: 1; padding: 20pt 30pt; }
.left { flex: 1; display: flex; justify-content: center; align-items: center; }
.right { flex: 1; padding-left: 20pt; display: flex; flex-direction: column; justify-content: center; }
.tagline { color: #FB4100; font-size: 18pt; font-weight: bold; margin-bottom: 20pt; }
.point { color: #07253D; font-size: 12pt; margin: 8pt 0; line-height: 1.4; }
.placeholder { background: #E8ECF0; }
</style>
</head>
<body>
<div class="header"><h1>The Category Thesis</h1></div>
<div class="content">
  <div class="left">
    <div id="venn" class="placeholder" style="width: 280pt; height: 240pt;"></div>
  </div>
  <div class="right">
    <p class="tagline">Executive Agent = BI + BPM + ITOM + SI Convergence</p>
    <p class="point"><b>Business Intelligence:</b> Decision support & analytics</p>
    <p class="point"><b>BPM:</b> Process optimization & automation</p>
    <p class="point"><b>ITOM:</b> Operations monitoring & management</p>
    <p class="point"><b>SI:</b> Strategic consulting & transformation</p>
    <p class="point" style="margin-top: 15pt; color: #01A9DB;"><b>Helm sits at the intersection - the Executive Command Layer</b></p>
  </div>
</div>
</body>
</html>`,

    // Slide 3: Why Converging
    whyConverging: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #07253D; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 15pt 30pt 40pt 30pt; display: flex; flex-direction: column; }
.row { display: flex; gap: 15pt; margin-bottom: 10pt; }
.card { flex: 1; background: #F5F7FA; border-radius: 6pt; padding: 10pt; border-left: 4pt solid #01A9DB; }
.card-orange { border-left-color: #FB4100; }
.card-title { color: #07253D; font-size: 12pt; font-weight: bold; margin-bottom: 5pt; }
.card-text { color: #44546A; font-size: 10pt; line-height: 1.3; }
.gap-box { background: #FB4100; border-radius: 6pt; padding: 10pt; margin-top: 5pt; }
.gap-title { color: #FFFFFF; font-size: 14pt; font-weight: bold; margin-bottom: 3pt; }
.gap-text { color: #FFFFFF; font-size: 11pt; }
</style>
</head>
<body>
<div class="header"><h1>Why These Categories Are Converging</h1></div>
<div class="content">
  <div class="row">
    <div class="card">
      <p class="card-title">Agent Era Demands Unified Intelligence</p>
      <p class="card-text">AI agents need coordinated oversight across systems, processes, operations, and strategy.</p>
    </div>
    <div class="card card-orange">
      <p class="card-title">Each Category Solves Part of Problem</p>
      <p class="card-text">BI: insights, no action. BPM: optimizes, no visibility. ITOM: monitors, no business context. SI: advises, doesn't scale.</p>
    </div>
  </div>
  <div class="row">
    <div class="card">
      <p class="card-title">Executive Decision Layer Missing</p>
      <p class="card-text">95% of AI pilots fail because no one has "Full Command" across domains and horizons.</p>
    </div>
    <div class="card card-orange">
      <p class="card-title">Market Validation</p>
      <p class="card-text">McKinsey: 88% use AI, only 39% see EBIT impact. The 49-point gap is Helm's market.</p>
    </div>
  </div>
  <div class="gap-box">
    <p class="gap-title">THE GAP: No one owns the Executive Command Layer</p>
    <p class="gap-text">Helm positions as the Decision Intelligence layer above operational tools.</p>
  </div>
</div>
</body>
</html>`,

    // Slide 4: BI Category
    biCategory: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #01A9DB; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 12pt 25pt 45pt 25pt; display: flex; }
.left { flex: 1.2; padding-right: 15pt; }
.right { flex: 0.8; display: flex; flex-direction: column; justify-content: flex-start; padding-top: 5pt; }
.metric { background: #07253D; color: #FFFFFF; padding: 7pt 10pt; border-radius: 6pt; margin-bottom: 6pt; }
.metric-label { font-size: 8pt; opacity: 0.8; }
.metric-value { font-size: 16pt; font-weight: bold; }
.section-title { color: #07253D; font-size: 11pt; font-weight: bold; margin: 6pt 0 4pt 0; }
.players { color: #44546A; font-size: 10pt; line-height: 1.3; }
.good { color: #01A9DB; }
.missing { color: #FB4100; }
.advantage { background: #FB4100; color: #FFFFFF; padding: 7pt; border-radius: 6pt; margin-top: 8pt; }
.advantage p { font-size: 9pt; margin: 0; }
</style>
</head>
<body>
<div class="header"><h1>Category 1: Business Intelligence (BI)</h1></div>
<div class="content">
  <div class="left">
    <p class="section-title">Key Players</p>
    <p class="players"><b>Enterprise:</b> Power BI, Tableau, Qlik, SAP<br/>
    <b>Modern:</b> Looker, Domo, ThoughtSpot, Sisense<br/>
    <b>Emerging:</b> Mode, Hex, Lightdash</p>

    <p class="section-title good">What BI Does Well</p>
    <p class="players">Data visualization, dashboards, historical reporting</p>

    <p class="section-title missing">What's Missing</p>
    <p class="players">No process context, backward-looking, no action path</p>

    <div class="advantage">
      <p><b>Helm:</b> Forward-looking decision intelligence with process context</p>
    </div>
  </div>
  <div class="right">
    <div class="metric">
      <p class="metric-label">Market Size (2025)</p>
      <p class="metric-value">$33B</p>
    </div>
    <div class="metric">
      <p class="metric-label">CAGR</p>
      <p class="metric-value">12%</p>
    </div>
    <div class="metric">
      <p class="metric-label">2030 Projection</p>
      <p class="metric-value">$58B</p>
    </div>
  </div>
</div>
</body>
</html>`,

    // Slide 5: BPM Category
    bpmCategory: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #FB4100; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 12pt 25pt 45pt 25pt; display: flex; }
.left { flex: 1.2; padding-right: 15pt; }
.right { flex: 0.8; display: flex; flex-direction: column; justify-content: flex-start; padding-top: 5pt; }
.metric { background: #07253D; color: #FFFFFF; padding: 7pt 10pt; border-radius: 6pt; margin-bottom: 6pt; }
.metric-label { font-size: 8pt; opacity: 0.8; }
.metric-value { font-size: 16pt; font-weight: bold; }
.section-title { color: #07253D; font-size: 11pt; font-weight: bold; margin: 6pt 0 4pt 0; }
.players { color: #44546A; font-size: 10pt; line-height: 1.3; }
.evolution { background: #F5F7FA; padding: 6pt; border-radius: 6pt; margin: 6pt 0; }
.evolution p { font-size: 9pt; color: #07253D; margin: 0; }
.advantage { background: #01A9DB; color: #FFFFFF; padding: 7pt; border-radius: 6pt; margin-top: 6pt; }
.advantage p { font-size: 9pt; margin: 0; }
</style>
</head>
<body>
<div class="header"><h1>Category 2: BPM (Business Process Management)</h1></div>
<div class="content">
  <div class="left">
    <p class="section-title">Key Players</p>
    <p class="players"><b>Process Mining:</b> Celonis, Apromore, SAP Signavio<br/>
    <b>BPM Suites:</b> Pega, Appian, IBM, Camunda<br/>
    <b>RPA:</b> UiPath, Automation Anywhere, Blue Prism</p>

    <div class="evolution">
      <p><b>Evolution:</b> BPM → BOAT → Hyperautomation</p>
    </div>

    <p class="section-title" style="color: #FB4100;">What's Missing</p>
    <p class="players">Enterprise-only pricing ($100K+), no executive decision layer</p>

    <div class="advantage">
      <p><b>Helm:</b> Mining is free, SMB-first pricing, executive command layer</p>
    </div>
  </div>
  <div class="right">
    <div class="metric">
      <p class="metric-label">Process Mining TAM</p>
      <p class="metric-value">$23B</p>
    </div>
    <div class="metric">
      <p class="metric-label">RPA TAM</p>
      <p class="metric-value">$36B</p>
    </div>
    <div class="metric">
      <p class="metric-label">Combined CAGR</p>
      <p class="metric-value">30%+</p>
    </div>
  </div>
</div>
</body>
</html>`,

    // Slide 6: ITOM Category
    itomCategory: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #44546A; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 10pt 25pt 50pt 25pt; display: flex; }
.left { flex: 1.3; padding-right: 15pt; }
.right { flex: 0.7; display: flex; flex-direction: column; justify-content: flex-start; }
.metric { background: #07253D; color: #FFFFFF; padding: 5pt 8pt; border-radius: 4pt; margin-bottom: 4pt; }
.metric-label { font-size: 7pt; opacity: 0.8; }
.metric-value { font-size: 14pt; font-weight: bold; }
.section-title { color: #07253D; font-size: 10pt; font-weight: bold; margin: 4pt 0 3pt 0; }
.players { color: #44546A; font-size: 9pt; line-height: 1.3; }
.sub-cat { background: #F5F7FA; padding: 4pt 6pt; border-radius: 4pt; margin: 2pt 0; }
.sub-cat p { font-size: 8pt; color: #07253D; margin: 0; }
.advantage { background: #01A9DB; color: #FFFFFF; padding: 6pt; border-radius: 4pt; margin-top: 4pt; }
.advantage p { font-size: 8pt; margin: 0; }
</style>
</head>
<body>
<div class="header"><h1>Category 3: ITOM & Observability</h1></div>
<div class="content">
  <div class="left">
    <p class="section-title">Sub-Categories & Key Players</p>
    <div class="sub-cat">
      <p><b>ITSM:</b> ServiceNow, BMC, Freshworks</p>
    </div>
    <div class="sub-cat">
      <p><b>Cloud:</b> VMware, CloudHealth, Flexera</p>
    </div>
    <div class="sub-cat">
      <p><b>APM:</b> Datadog, Dynatrace, Splunk</p>
    </div>
    <div class="sub-cat">
      <p><b>AIOps:</b> Moogsoft, BigPanda, PagerDuty</p>
    </div>

    <p class="section-title" style="color: #FB4100;">What's Missing</p>
    <p class="players">Tech-focused, no process mining, lacks executive support</p>

    <div class="advantage">
      <p><b>Helm:</b> Business-outcome focused, ops + process intelligence</p>
    </div>
  </div>
  <div class="right">
    <div class="metric">
      <p class="metric-label">ITSM Market</p>
      <p class="metric-value">$15B</p>
    </div>
    <div class="metric">
      <p class="metric-label">Observability</p>
      <p class="metric-value">$22B</p>
    </div>
    <div class="metric">
      <p class="metric-label">AIOps</p>
      <p class="metric-value">$8B</p>
    </div>
    <div class="metric">
      <p class="metric-label">CAGR</p>
      <p class="metric-value">15%</p>
    </div>
  </div>
</div>
</body>
</html>`,

    // Slide 7: SI Category
    siCategory: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #07253D; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 12pt 25pt 50pt 25pt; display: flex; }
.left { flex: 1.2; padding-right: 15pt; }
.right { flex: 0.8; display: flex; flex-direction: column; justify-content: flex-start; padding-top: 5pt; }
.metric { background: #FB4100; color: #FFFFFF; padding: 7pt 10pt; border-radius: 6pt; margin-bottom: 6pt; }
.metric-label { font-size: 8pt; opacity: 0.9; }
.metric-value { font-size: 16pt; font-weight: bold; }
.section-title { color: #07253D; font-size: 11pt; font-weight: bold; margin: 6pt 0 4pt 0; }
.players { color: #44546A; font-size: 10pt; line-height: 1.3; }
.disruption { background: #01A9DB; color: #FFFFFF; padding: 6pt; border-radius: 6pt; margin: 6pt 0; }
.disruption p { font-size: 9pt; margin: 0; }
.advantage { background: #07253D; color: #FFFFFF; padding: 6pt; border-radius: 6pt; }
.advantage p { font-size: 9pt; margin: 0; }
</style>
</head>
<body>
<div class="header"><h1>Category 4: Systems Integration / Consulting</h1></div>
<div class="content">
  <div class="left">
    <p class="section-title">Key Players</p>
    <p class="players"><b>Big 4:</b> Accenture, Deloitte, PwC, EY, KPMG<br/>
    <b>Strategy:</b> McKinsey, BCG, Bain<br/>
    <b>Tech:</b> IBM GBS, Capgemini, Cognizant</p>

    <div class="disruption">
      <p><b>Consulting as Software:</b> AI delivers insights that required $500K+ engagements</p>
    </div>

    <p class="section-title" style="color: #FB4100;">What's Missing</p>
    <p class="players">High cost ($500-1000/hr), doesn't scale, knowledge walks out</p>

    <div class="advantage">
      <p><b>Helm:</b> Consulting-grade at software prices, fleet learning</p>
    </div>
  </div>
  <div class="right">
    <div class="metric">
      <p class="metric-label">Global Consulting TAM</p>
      <p class="metric-value">$300B+</p>
    </div>
    <div class="metric">
      <p class="metric-label">Digital Transformation</p>
      <p class="metric-value">$120B</p>
    </div>
    <div class="metric">
      <p class="metric-label">AI/Automation Consulting</p>
      <p class="metric-value">$45B</p>
    </div>
  </div>
</div>
</body>
</html>`,

    // Slide 8: Combined TAM
    combinedTAM: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #07253D; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 15pt 25pt 50pt 25pt; display: flex; }
.left { flex: 0.55; display: flex; justify-content: center; align-items: center; }
.right { flex: 0.45; display: flex; flex-direction: column; justify-content: flex-start; padding-left: 15pt; }
.placeholder { background: #E8ECF0; }
.total { background: #FB4100; color: #FFFFFF; padding: 10pt; border-radius: 6pt; margin-bottom: 10pt; text-align: center; }
.total-label { font-size: 10pt; margin-bottom: 3pt; }
.total-value { font-size: 26pt; font-weight: bold; }
.breakdown { color: #07253D; font-size: 10pt; line-height: 1.5; }
.sam { background: #01A9DB; color: #FFFFFF; padding: 8pt; border-radius: 6pt; margin-top: 10pt; text-align: center; }
.sam p { margin: 0; font-size: 11pt; }
</style>
</head>
<body>
<div class="header"><h1>Combined TAM Opportunity</h1></div>
<div class="content">
  <div class="left">
    <div id="tam" class="placeholder" style="width: 240pt; height: 200pt;"></div>
  </div>
  <div class="right">
    <div class="total">
      <p class="total-label">Combined Adjacent TAM (2030)</p>
      <p class="total-value">$400B+</p>
    </div>
    <p class="breakdown">
      <b>BI/Analytics:</b> $58B<br/>
      <b>BPM + RPA:</b> $59B<br/>
      <b>ITOM + Observability:</b> $45B<br/>
      <b>Digital Transformation:</b> $165B+
    </p>
    <div class="sam">
      <p><b>Helm SAM:</b> $31B (US/UK/EU)</p>
    </div>
  </div>
</div>
</body>
</html>`,

    // Slide 9: Public Comps
    publicComps: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #07253D; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 15pt 20pt; }
.placeholder { background: #E8ECF0; width: 100%; height: 100%; }
</style>
</head>
<body>
<div class="header"><h1>Public Company Comparables</h1></div>
<div class="content">
  <div id="table" class="placeholder" style="width: 680pt; height: 310pt;"></div>
</div>
</body>
</html>`,

    // Slide 10: Private Comps
    privateComps: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #01A9DB; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 15pt 20pt; }
.placeholder { background: #E8ECF0; width: 100%; height: 100%; }
</style>
</head>
<body>
<div class="header"><h1>Private Company Comparables</h1></div>
<div class="content">
  <div id="table" class="placeholder" style="width: 680pt; height: 310pt;"></div>
</div>
</body>
</html>`,

    // Slide 11: M&A Transactions
    transactions: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFFFFF; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #FB4100; padding: 12pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 22pt; margin: 0; }
.content { flex: 1; padding: 15pt 20pt; }
.placeholder { background: #E8ECF0; width: 100%; height: 100%; }
</style>
</head>
<body>
<div class="header"><h1>Comparable M&A Transactions</h1></div>
<div class="content">
  <div id="table" class="placeholder" style="width: 680pt; height: 310pt;"></div>
</div>
</body>
</html>`,

    // Slide 12: Key Takeaways
    takeaways: `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #07253D; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #07253D; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { padding: 15pt 30pt 8pt 30pt; }
.header h1 { color: #FFFFFF; font-size: 24pt; margin: 0; }
.content { flex: 1; padding: 6pt 25pt 50pt 25pt; }
.row { display: flex; gap: 12pt; margin-bottom: 8pt; }
.takeaway { flex: 1; background: rgba(255,255,255,0.1); border-radius: 5pt; padding: 8pt; border-left: 3pt solid #01A9DB; }
.takeaway-orange { border-left-color: #FB4100; }
.number { color: #01A9DB; font-size: 18pt; font-weight: bold; margin-bottom: 2pt; }
.number-orange { color: #FB4100; }
.title { color: #FFFFFF; font-size: 10pt; font-weight: bold; margin-bottom: 3pt; }
.text { color: rgba(255,255,255,0.85); font-size: 9pt; line-height: 1.2; }
.bottom { background: #FB4100; padding: 8pt 12pt; border-radius: 5pt; margin-top: 5pt; text-align: center; }
.bottom p { color: #FFFFFF; font-size: 11pt; margin: 0; font-weight: bold; }
</style>
</head>
<body>
<div class="header"><h1>Key Takeaways</h1></div>
<div class="content">
  <div class="row">
    <div class="takeaway">
      <p class="number">1</p>
      <p class="title">Unique Category Intersection</p>
      <p class="text">Helm sits at BI + BPM + ITOM + SI convergence - the Executive Command Layer no one else owns</p>
    </div>
    <div class="takeaway takeaway-orange">
      <p class="number number-orange">2</p>
      <p class="title">Massive Combined TAM</p>
      <p class="text">$400B+ combined adjacent markets, $31B SAM focused on SMB-mid market</p>
    </div>
  </div>
  <div class="row">
    <div class="takeaway">
      <p class="number">3</p>
      <p class="title">Compelling Valuation Benchmarks</p>
      <p class="text">Public comps: 8-15x revenue. M&A deals: 10-20x for high-growth assets</p>
    </div>
    <div class="takeaway takeaway-orange">
      <p class="number number-orange">4</p>
      <p class="title">The Opportunity</p>
      <p class="text">12-month window. SMB market (150K companies) unaddressed by legacy vendors</p>
    </div>
  </div>
  <div class="bottom">
    <p>Helm: The Executive Agent Platform for Service Leaders</p>
  </div>
</div>
</body>
</html>`
};

async function createPresentation() {
    console.log('Creating Helm Competitive Landscape Presentation...');

    // Create images first
    console.log('Creating visual assets...');
    const vennPath = await createVennDiagram();
    const tamPath = await createTAMVisual();

    // Write HTML files
    console.log('Writing HTML slide files...');
    for (const [name, html] of Object.entries(slides)) {
        fs.writeFileSync(path.join(workspace, `${name}.html`), html);
    }

    // Create presentation
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Synaptic Era';
    pptx.title = 'Helm: Competitive Landscape & Category Analysis';
    pptx.company = 'Synaptic Era, Inc.';

    // Slide 1: Title
    console.log('Processing slide 1: Title');
    await html2pptx(path.join(workspace, 'title.html'), pptx);

    // Slide 2: Category Thesis (with Venn diagram)
    console.log('Processing slide 2: Category Thesis');
    const { slide: slide2, placeholders: ph2 } = await html2pptx(path.join(workspace, 'categoryThesis.html'), pptx);
    if (ph2.length > 0) {
        slide2.addImage({ path: vennPath, ...ph2[0] });
    }

    // Slide 3: Why Converging
    console.log('Processing slide 3: Why Converging');
    await html2pptx(path.join(workspace, 'whyConverging.html'), pptx);

    // Slide 4: BI Category
    console.log('Processing slide 4: BI Category');
    await html2pptx(path.join(workspace, 'biCategory.html'), pptx);

    // Slide 5: BPM Category
    console.log('Processing slide 5: BPM Category');
    await html2pptx(path.join(workspace, 'bpmCategory.html'), pptx);

    // Slide 6: ITOM Category
    console.log('Processing slide 6: ITOM Category');
    await html2pptx(path.join(workspace, 'itomCategory.html'), pptx);

    // Slide 7: SI Category
    console.log('Processing slide 7: SI Category');
    await html2pptx(path.join(workspace, 'siCategory.html'), pptx);

    // Slide 8: Combined TAM (with TAM visual)
    console.log('Processing slide 8: Combined TAM');
    const { slide: slide8, placeholders: ph8 } = await html2pptx(path.join(workspace, 'combinedTAM.html'), pptx);
    if (ph8.length > 0) {
        slide8.addImage({ path: tamPath, ...ph8[0] });
    }

    // Slide 9: Public Comps (with table)
    console.log('Processing slide 9: Public Comps');
    const { slide: slide9, placeholders: ph9 } = await html2pptx(path.join(workspace, 'publicComps.html'), pptx);
    if (ph9.length > 0) {
        const publicCompsData = [
            [
                { text: 'Company', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Category', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Market Cap', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Revenue', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Growth', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'EV/Rev', options: { fill: { color: '07253D' }, color: 'FFFFFF', bold: true, align: 'center' } }
            ],
            ['ServiceNow', 'ITSM', '$185B', '$10.5B', '23%', '17.6x'],
            ['Salesforce', 'CRM/BI', '$290B', '$35B', '11%', '8.3x'],
            ['Datadog', 'Observability', '$42B', '$2.5B', '26%', '16.8x'],
            ['Dynatrace', 'APM', '$15B', '$1.4B', '22%', '10.7x'],
            ['Pega', 'BPM', '$5.2B', '$1.5B', '8%', '3.5x'],
            ['Appian', 'Low-Code/BPM', '$2.8B', '$600M', '15%', '4.7x'],
            ['Splunk', 'Observability', '$28B*', '$4.2B', '12%', '6.7x'],
            ['New Relic', 'Observability', '$6.5B*', '$950M', '14%', '6.8x']
        ];
        slide9.addTable(publicCompsData, {
            ...ph9[0],
            colW: [1.7, 1.4, 1.2, 1.1, 0.9, 0.9],
            border: { pt: 0.5, color: 'CCCCCC' },
            fontSize: 10,
            align: 'center',
            valign: 'middle'
        });
        slide9.addText('* Acquired - shown at acquisition valuation', { x: 0.3, y: 5.2, fontSize: 8, color: '666666' });
    }

    // Slide 10: Private Comps (with table)
    console.log('Processing slide 10: Private Comps');
    const { slide: slide10, placeholders: ph10 } = await html2pptx(path.join(workspace, 'privateComps.html'), pptx);
    if (ph10.length > 0) {
        const privateCompsData = [
            [
                { text: 'Company', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Category', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Last Valuation', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Total Funding', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Stage', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Key Investors', options: { fill: { color: '01A9DB' }, color: 'FFFFFF', bold: true, align: 'center' } }
            ],
            ['Celonis', 'Process Mining', '$13B', '$1.4B', 'Series D', 'Accel, Arena'],
            ['UiPath', 'RPA/BPM', '$7.2B*', '$2.1B', 'Public', 'Coatue, Sequoia'],
            ['Camunda', 'BPM', '$1.2B', '$400M', 'Series C', 'Insight, Highland'],
            ['Automation Anywhere', 'RPA', '$6.8B', '$840M', 'Series C', 'Softbank, NEA'],
            ['Workato', 'Integration', '$5.7B', '$450M', 'Series E', 'Altimeter, Redpoint'],
            ['Monte Carlo', 'Data Observability', '$1.6B', '$236M', 'Series D', 'Accel, GGV'],
            ['Cribl', 'Observability', '$2.5B', '$400M', 'Series D', 'CRV, Sequoia'],
            ['Observe Inc', 'Observability', '$500M', '$154M', 'Series B', 'Sutter Hill']
        ];
        slide10.addTable(privateCompsData, {
            ...ph10[0],
            colW: [1.5, 1.3, 1.2, 1.1, 0.9, 2.2],
            border: { pt: 0.5, color: 'CCCCCC' },
            fontSize: 9,
            align: 'center',
            valign: 'middle'
        });
        slide10.addText('* IPO valuation shown for reference', { x: 0.3, y: 5.2, fontSize: 8, color: '666666' });
    }

    // Slide 11: M&A Transactions (with table)
    console.log('Processing slide 11: M&A Transactions');
    const { slide: slide11, placeholders: ph11 } = await html2pptx(path.join(workspace, 'transactions.html'), pptx);
    if (ph11.length > 0) {
        const maData = [
            [
                { text: 'Target', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Acquirer', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Date', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Deal Value', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Revenue', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } },
                { text: 'Multiple', options: { fill: { color: 'FB4100' }, color: 'FFFFFF', bold: true, align: 'center' } }
            ],
            ['Figma', 'Adobe', '2022', '$20B', '$400M', '50x'],
            ['Splunk', 'Cisco', '2023', '$28B', '$4.2B', '6.7x'],
            ['Alteryx', 'Clearlake', '2023', '$4.4B', '$900M', '4.9x'],
            ['New Relic', 'Francisco Partners', '2023', '$6.5B', '$950M', '6.8x'],
            ['Signavio', 'SAP', '2021', '$1.2B', '$100M', '12x'],
            ['Apromore', 'TBD', '2025', 'TBD', '~$20M', 'TBD'],
            ['Tableau', 'Salesforce', '2019', '$15.7B', '$1.2B', '13x'],
            ['Looker', 'Google', '2020', '$2.6B', '$150M', '17x']
        ];
        slide11.addTable(maData, {
            ...ph11[0],
            colW: [1.4, 1.5, 0.9, 1.1, 1.0, 1.0],
            border: { pt: 0.5, color: 'CCCCCC' },
            fontSize: 10,
            align: 'center',
            valign: 'middle'
        });
        slide11.addText('Note: Multiples shown are EV/Revenue at time of transaction', { x: 0.3, y: 5.2, fontSize: 8, color: '666666' });
    }

    // Slide 12: Key Takeaways
    console.log('Processing slide 12: Key Takeaways');
    await html2pptx(path.join(workspace, 'takeaways.html'), pptx);

    // Save presentation
    const outputPath = '/Users/wkarp/devlocal/prod-helm-pm/x-project/kb/comps/Helm-Competitive-Landscape.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);

    return outputPath;
}

createPresentation().catch(console.error);
