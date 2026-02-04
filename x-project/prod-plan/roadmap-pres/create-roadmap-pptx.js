const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/wkarp/devlocal/prod-helm-pm/.claude/skills/x:pptx/scripts/html2pptx');
const fs = require('fs');
const path = require('path');

// Synaptic Brand Colors (no # prefix for PptxGenJS)
const COLORS = {
  blue: '01A9DB',
  orange: 'FB4100',
  navy: '07253D',
  grayBlue: '44546A',
  white: 'FFFFFF',
  lightGray: 'F5F7FA',
  mediumGray: 'E8ECF1'
};

const SLIDE_DIR = path.join(__dirname, 'slides');

// Ensure slides directory exists
if (!fs.existsSync(SLIDE_DIR)) {
  fs.mkdirSync(SLIDE_DIR, { recursive: true });
}

// Slide 1: Title
const slide1Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.navy}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.navy}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
h1 { color: #${COLORS.white}; font-size: 48pt; margin: 0 0 10pt 0; text-align: center; }
h2 { color: #${COLORS.blue}; font-size: 28pt; margin: 0 0 30pt 0; font-weight: normal; text-align: center; }
p { color: #${COLORS.white}; font-size: 16pt; margin: 5pt 0; opacity: 0.8; text-align: center; }
.accent-bar { width: 100pt; height: 4pt; background: #${COLORS.orange}; margin: 20pt 0; }
</style>
</head>
<body>
<h1>HELM Product Roadmap</h1>
<div class="accent-bar"></div>
<h2>February - June 2026</h2>
<p>Strategic Focus: Depth Before Breadth</p>
<p>Design Partner: Dispatch</p>
</body>
</html>`;

// Slide 2: Strategic Focus
const slide2Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 20pt 30pt; }
.header h1 { color: #${COLORS.white}; font-size: 28pt; margin: 0; }
.content { padding: 25pt 30pt; flex: 1; }
.principle-box { background: #${COLORS.lightGray}; padding: 20pt; margin-bottom: 20pt; border-left: 6pt solid #${COLORS.blue}; }
.principle-box h2 { color: #${COLORS.navy}; font-size: 20pt; margin: 0 0 10pt 0; }
.principle-box p { color: #${COLORS.grayBlue}; font-size: 14pt; margin: 0; line-height: 1.5; }
.modules { display: flex; gap: 15pt; margin-top: 15pt; }
.module { flex: 1; background: #${COLORS.mediumGray}; padding: 15pt; text-align: center; }
.module h3 { color: #${COLORS.navy}; font-size: 14pt; margin: 0 0 8pt 0; }
.module p { color: #${COLORS.grayBlue}; font-size: 11pt; margin: 0; }
.arrow { color: #${COLORS.orange}; font-size: 24pt; display: flex; align-items: center; }
</style>
</head>
<body>
<div class="header"><h1>Strategic Focus</h1></div>
<div class="content">
<div class="principle-box">
<h2>Core Principle: Depth Before Breadth</h2>
<p>Prove the full value chain with Dispatch before spreading resources thin. The four modules are sequential - Mine feeds Design feeds Manage. Explore runs as parallel lead generation.</p>
</div>
<div class="modules">
<div class="module"><h3>EXPLORE</h3><p>Free Lead Gen</p></div>
<div class="module"><h3>MINE</h3><p>Baseline Data</p></div>
<div class="module"><h3>DESIGN</h3><p>Transformation</p></div>
<div class="module"><h3>MANAGE</h3><p>Monitoring</p></div>
</div>
</div>
</body>
</html>`;

// Slide 3: Key Milestones
const slide3Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.content { padding: 15pt 30pt 40pt 30pt; flex: 1; }
.timeline { display: flex; flex-direction: column; gap: 8pt; }
.milestone { display: flex; align-items: center; gap: 12pt; }
.date { background: #${COLORS.blue}; color: #${COLORS.white}; padding: 6pt 10pt; font-size: 11pt; width: 70pt; text-align: center; }
.detail { flex: 1; background: #${COLORS.lightGray}; padding: 8pt 12pt; }
.detail h3 { color: #${COLORS.navy}; font-size: 12pt; margin: 0 0 2pt 0; }
.detail p { color: #${COLORS.grayBlue}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header"><h1>Key Milestones</h1></div>
<div class="content">
<div class="timeline">
<div class="milestone">
<div class="date"><p>End Feb</p></div>
<div class="detail"><h3>Dispatch Baseline Complete</h3><p>Data extracted, validated, insights delivered</p></div>
</div>
<div class="milestone">
<div class="date"><p>End Mar</p></div>
<div class="detail"><h3>PMF Validation</h3><p>Dispatch confirms value; testimonial commitment</p></div>
</div>
<div class="milestone">
<div class="date"><p>End Apr</p></div>
<div class="detail"><h3>Second Design Partner</h3><p>Signed agreement, engagement started</p></div>
</div>
<div class="milestone">
<div class="date"><p>End May</p></div>
<div class="detail"><h3>First Commercial Revenue</h3><p>Paid Mine engagement (non-design partner)</p></div>
</div>
<div class="milestone">
<div class="date"><p>End Jun</p></div>
<div class="detail"><h3>Market Entry</h3><p>Revenue from all three paid modules</p></div>
</div>
</div>
</div>
</body>
</html>`;

// Slide 4: February
const slide4Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; display: flex; justify-content: space-between; align-items: center; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.header h2 { color: #${COLORS.blue}; font-size: 16pt; margin: 0; font-weight: normal; }
.content { padding: 15pt 30pt; flex: 1; display: flex; gap: 20pt; }
.col { flex: 1; }
.module-card { background: #${COLORS.lightGray}; padding: 12pt; margin-bottom: 10pt; }
.module-card h3 { color: #${COLORS.navy}; font-size: 13pt; margin: 0 0 8pt 0; display: flex; align-items: center; gap: 8pt; }
.badge { background: #${COLORS.orange}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
.badge-secondary { background: #${COLORS.grayBlue}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
ul { margin: 0; padding-left: 15pt; }
li { color: #${COLORS.grayBlue}; font-size: 11pt; margin-bottom: 4pt; }
.exit-box { background: #${COLORS.navy}; padding: 12pt; margin-top: auto; }
.exit-box h4 { color: #${COLORS.blue}; font-size: 11pt; margin: 0 0 5pt 0; }
.exit-box p { color: #${COLORS.white}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
<h1>February 2026</h1>
<h2>Foundation Month</h2>
</div>
<div class="content">
<div class="col">
<div class="module-card">
<h3>MINE <span class="badge">70%</span></h3>
<ul>
<li>SFDC Service Cloud Connector</li>
<li>Dispatch Data Extraction</li>
<li>Data Validation</li>
</ul>
</div>
<div class="module-card">
<h3>DESIGN <span class="badge-secondary">20%</span></h3>
<ul>
<li>Deflection Business Case Template</li>
<li>ROI Model Structure</li>
</ul>
</div>
</div>
<div class="col">
<div class="module-card">
<h3>MANAGE</h3>
<ul>
<li>Paused - park until Mine/Design prove value</li>
</ul>
</div>
<div class="module-card">
<h3>EXPLORE <span class="badge-secondary">10%</span></h3>
<ul>
<li>Basic landing page with email capture</li>
</ul>
</div>
<div class="exit-box">
<h4>Exit Criteria</h4>
<p>Dispatch baseline data extracted and validated</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 5: March
const slide5Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; display: flex; justify-content: space-between; align-items: center; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.header h2 { color: #${COLORS.blue}; font-size: 16pt; margin: 0; font-weight: normal; }
.content { padding: 15pt 30pt; flex: 1; display: flex; gap: 20pt; }
.col { flex: 1; }
.module-card { background: #${COLORS.lightGray}; padding: 12pt; margin-bottom: 10pt; }
.module-card h3 { color: #${COLORS.navy}; font-size: 13pt; margin: 0 0 8pt 0; display: flex; align-items: center; gap: 8pt; }
.badge { background: #${COLORS.orange}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
.badge-secondary { background: #${COLORS.grayBlue}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
ul { margin: 0; padding-left: 15pt; }
li { color: #${COLORS.grayBlue}; font-size: 11pt; margin-bottom: 4pt; }
.exit-box { background: #${COLORS.navy}; padding: 12pt; margin-top: auto; }
.exit-box h4 { color: #${COLORS.blue}; font-size: 11pt; margin: 0 0 5pt 0; }
.exit-box p { color: #${COLORS.white}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
<h1>March 2026</h1>
<h2>Validation Month</h2>
</div>
<div class="content">
<div class="col">
<div class="module-card">
<h3>MINE <span class="badge">50%</span></h3>
<ul>
<li>Current State Analysis Report</li>
<li>Process Map</li>
<li>Team Performance Baseline</li>
<li>Financial Baseline</li>
</ul>
</div>
<div class="module-card">
<h3>DESIGN <span class="badge">50%</span></h3>
<ul>
<li>Dispatch Deflection Roadmap</li>
<li>ROI Forecast</li>
<li>Implementation Specifications</li>
</ul>
</div>
</div>
<div class="col">
<div class="module-card">
<h3>MANAGE</h3>
<ul>
<li>Scope Definition for Dispatch</li>
</ul>
</div>
<div class="module-card">
<h3>EXPLORE <span class="badge-secondary">10%</span></h3>
<ul>
<li>2-3 AI learning articles</li>
</ul>
</div>
<div class="exit-box">
<h4>Exit Criteria</h4>
<p>Dispatch confirms value; testimonial commitment</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 6: April
const slide6Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; display: flex; justify-content: space-between; align-items: center; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.header h2 { color: #${COLORS.blue}; font-size: 16pt; margin: 0; font-weight: normal; }
.content { padding: 15pt 30pt; flex: 1; display: flex; gap: 20pt; }
.col { flex: 1; }
.module-card { background: #${COLORS.lightGray}; padding: 12pt; margin-bottom: 10pt; }
.module-card h3 { color: #${COLORS.navy}; font-size: 13pt; margin: 0 0 8pt 0; display: flex; align-items: center; gap: 8pt; }
.badge { background: #${COLORS.orange}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
.badge-secondary { background: #${COLORS.grayBlue}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
ul { margin: 0; padding-left: 15pt; }
li { color: #${COLORS.grayBlue}; font-size: 11pt; margin-bottom: 4pt; }
.exit-box { background: #${COLORS.navy}; padding: 12pt; margin-top: auto; }
.exit-box h4 { color: #${COLORS.blue}; font-size: 11pt; margin: 0 0 5pt 0; }
.exit-box p { color: #${COLORS.white}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
<h1>April 2026</h1>
<h2>Expansion Prep</h2>
</div>
<div class="content">
<div class="col">
<div class="module-card">
<h3>MINE <span class="badge-secondary">20%</span></h3>
<ul>
<li>Desktop Observation Beta</li>
<li>Feedback Integration</li>
</ul>
</div>
<div class="module-card">
<h3>DESIGN <span class="badge">50%</span></h3>
<ul>
<li>Templatized Deliverables</li>
<li>Methodology Documentation</li>
</ul>
</div>
</div>
<div class="col">
<div class="module-card">
<h3>MANAGE <span class="badge-secondary">20%</span></h3>
<ul>
<li>MVP Dashboard</li>
<li>"What Matters Most" Alerts</li>
</ul>
</div>
<div class="module-card">
<h3>EXPLORE <span class="badge-secondary">10%</span></h3>
<ul>
<li>HELM Agent Chat live</li>
<li>Self-Service Registration</li>
</ul>
</div>
<div class="exit-box">
<h4>Exit Criteria</h4>
<p>Second design partner signed; Manage MVP ready</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 7: May
const slide7Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; display: flex; justify-content: space-between; align-items: center; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.header h2 { color: #${COLORS.blue}; font-size: 16pt; margin: 0; font-weight: normal; }
.content { padding: 15pt 30pt; flex: 1; display: flex; gap: 20pt; }
.col { flex: 1; }
.module-card { background: #${COLORS.lightGray}; padding: 12pt; margin-bottom: 10pt; }
.module-card h3 { color: #${COLORS.navy}; font-size: 13pt; margin: 0 0 8pt 0; display: flex; align-items: center; gap: 8pt; }
.badge { background: #${COLORS.orange}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
.badge-secondary { background: #${COLORS.grayBlue}; color: #${COLORS.white}; font-size: 9pt; padding: 2pt 6pt; }
ul { margin: 0; padding-left: 15pt; }
li { color: #${COLORS.grayBlue}; font-size: 11pt; margin-bottom: 4pt; }
.exit-box { background: #${COLORS.navy}; padding: 12pt; margin-top: auto; }
.exit-box h4 { color: #${COLORS.blue}; font-size: 11pt; margin: 0 0 5pt 0; }
.exit-box p { color: #${COLORS.white}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
<h1>May 2026</h1>
<h2>Commercial Readiness</h2>
</div>
<div class="content">
<div class="col">
<div class="module-card">
<h3>MINE <span class="badge-secondary">20%</span></h3>
<ul>
<li>Commercial Release 1.0</li>
<li>Pricing Validation ($20k)</li>
<li>Sales Materials</li>
</ul>
</div>
<div class="module-card">
<h3>DESIGN <span class="badge-secondary">30%</span></h3>
<ul>
<li>Partner #2 Delivery</li>
<li>Template Refinement</li>
</ul>
</div>
</div>
<div class="col">
<div class="module-card">
<h3>MANAGE <span class="badge">40%</span></h3>
<ul>
<li>Dispatch Pilot Live</li>
<li>RADAR Agent v1</li>
<li>Subscription Model ($5k/mo)</li>
</ul>
</div>
<div class="module-card">
<h3>EXPLORE <span class="badge-secondary">10%</span></h3>
<ul>
<li>Industry Benchmarks</li>
<li>Vendor Analysis Content</li>
</ul>
</div>
<div class="exit-box">
<h4>Exit Criteria</h4>
<p>First paid Mine engagement; Manage proving value</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 8: June
const slide8Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; display: flex; justify-content: space-between; align-items: center; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.header h2 { color: #${COLORS.orange}; font-size: 16pt; margin: 0; font-weight: normal; }
.content { padding: 15pt 30pt; flex: 1; display: flex; gap: 20pt; }
.col { flex: 1; }
.module-card { background: #${COLORS.lightGray}; padding: 12pt; margin-bottom: 10pt; }
.module-card h3 { color: #${COLORS.navy}; font-size: 13pt; margin: 0 0 8pt 0; }
ul { margin: 0; padding-left: 15pt; }
li { color: #${COLORS.grayBlue}; font-size: 11pt; margin-bottom: 4pt; }
.exit-box { background: #${COLORS.orange}; padding: 12pt; margin-top: auto; }
.exit-box h4 { color: #${COLORS.white}; font-size: 11pt; margin: 0 0 5pt 0; }
.exit-box p { color: #${COLORS.white}; font-size: 10pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
<h1>June 2026</h1>
<h2>Market Entry</h2>
</div>
<div class="content">
<div class="col">
<div class="module-card">
<h3>MINE</h3>
<ul>
<li>2-3 Commercial Customers</li>
<li>Published Case Studies</li>
</ul>
</div>
<div class="module-card">
<h3>DESIGN</h3>
<ul>
<li>Commercial Launch</li>
<li>Sales Enablement Complete</li>
</ul>
</div>
</div>
<div class="col">
<div class="module-card">
<h3>MANAGE</h3>
<ul>
<li>Dispatch Paid Subscription</li>
<li>Pricing Validated</li>
</ul>
</div>
<div class="module-card">
<h3>EXPLORE</h3>
<ul>
<li>Funnel Optimization</li>
<li>Explore to Mine Conversion</li>
</ul>
</div>
<div class="exit-box">
<h4>Success Criteria</h4>
<p>Revenue from all 3 paid modules; Clear PMF signals</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 9: Team Allocation
const slide9Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 20pt 30pt; }
.header h1 { color: #${COLORS.white}; font-size: 28pt; margin: 0; }
.content { padding: 20pt 30pt; flex: 1; }
.chart-placeholder { width: 100%; height: 220pt; background: #${COLORS.lightGray}; }
</style>
</head>
<body>
<div class="header"><h1>Team Allocation by Month</h1></div>
<div class="content">
<div id="chart" class="placeholder chart-placeholder"></div>
</div>
</body>
</html>`;

// Slide 10: Decision Points
const slide10Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { background: #${COLORS.navy}; padding: 15pt 30pt; }
.header h1 { color: #${COLORS.white}; font-size: 24pt; margin: 0; }
.content { padding: 15pt 30pt 40pt 30pt; flex: 1; display: flex; flex-direction: column; gap: 10pt; }
.decision { display: flex; gap: 12pt; align-items: stretch; }
.timing { background: #${COLORS.blue}; color: #${COLORS.white}; padding: 10pt; width: 80pt; display: flex; flex-direction: column; justify-content: center; }
.timing h3 { font-size: 12pt; margin: 0; text-align: center; }
.details { flex: 1; background: #${COLORS.lightGray}; padding: 10pt; }
.details h4 { color: #${COLORS.navy}; font-size: 12pt; margin: 0 0 5pt 0; }
.details p { color: #${COLORS.grayBlue}; font-size: 10pt; margin: 0 0 3pt 0; }
.go { color: #2E7D32; }
.nogo { color: #C62828; }
</style>
</head>
<body>
<div class="header"><h1>Key Decision Points</h1></div>
<div class="content">
<div class="decision">
<div class="timing"><h3>End of March</h3></div>
<div class="details">
<h4>Go/No-Go on Manage Investment</h4>
<p>Does Dispatch validate the Mine to Design value chain?</p>
<p><span class="go">Go:</span> Dispatch confirms value, wants monitoring</p>
<p><span class="nogo">No-Go:</span> Pivot approach, revisit Manage scope</p>
</div>
</div>
<div class="decision">
<div class="timing"><h3>End of April</h3></div>
<div class="details">
<h4>Demand Validation</h4>
<p>Is there demand beyond Dispatch?</p>
<p><span class="go">Accelerate:</span> Strong inbound, sign 2+ partners</p>
<p><span class="nogo">Pivot:</span> Weak demand, revisit positioning</p>
</div>
</div>
<div class="decision">
<div class="timing"><h3>End of May</h3></div>
<div class="details">
<h4>Pricing Validation</h4>
<p>Is the pricing model working?</p>
<p><span class="go">Confirm:</span> Deals closing at target prices</p>
<p><span class="nogo">Adjust:</span> Revise pricing before June push</p>
</div>
</div>
</div>
</body>
</html>`;

// Slide 11: Q2 Targets
const slide11Html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #${COLORS.navy}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #${COLORS.navy}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header { padding: 25pt 30pt 15pt 30pt; }
.header h1 { color: #${COLORS.white}; font-size: 28pt; margin: 0; }
.content { padding: 10pt 30pt; flex: 1; display: flex; gap: 20pt; }
.metric-card { flex: 1; background: #${COLORS.white}; padding: 20pt; text-align: center; display: flex; flex-direction: column; justify-content: center; }
.metric-card h2 { color: #${COLORS.blue}; font-size: 36pt; margin: 0 0 10pt 0; }
.metric-card p { color: #${COLORS.grayBlue}; font-size: 14pt; margin: 0; }
.footer { padding: 20pt 30pt; }
.footer p { color: #${COLORS.white}; font-size: 12pt; margin: 0; text-align: center; opacity: 0.8; }
</style>
</head>
<body>
<div class="header"><h1>Q2 2026 Targets</h1></div>
<div class="content">
<div class="metric-card">
<h2>3-5</h2>
<p>Paid Customers</p>
</div>
<div class="metric-card">
<h2>$100-150K</h2>
<p>ARR</p>
</div>
<div class="metric-card">
<h2>50+</h2>
<p>Design Partner NPS</p>
</div>
<div class="metric-card">
<h2>500+</h2>
<p>Explore Registrations</p>
</div>
</div>
<div class="footer">
<p>Primary Goal: Prove product-market fit with Dispatch, then expand</p>
</div>
</body>
</html>`;

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Synaptic Era';
  pptx.title = 'HELM Product Roadmap 2026';
  pptx.subject = 'February - June 2026';

  // Write HTML files
  const slides = [
    { name: 'slide1.html', content: slide1Html },
    { name: 'slide2.html', content: slide2Html },
    { name: 'slide3.html', content: slide3Html },
    { name: 'slide4.html', content: slide4Html },
    { name: 'slide5.html', content: slide5Html },
    { name: 'slide6.html', content: slide6Html },
    { name: 'slide7.html', content: slide7Html },
    { name: 'slide8.html', content: slide8Html },
    { name: 'slide9.html', content: slide9Html },
    { name: 'slide10.html', content: slide10Html },
    { name: 'slide11.html', content: slide11Html }
  ];

  for (const slide of slides) {
    fs.writeFileSync(path.join(SLIDE_DIR, slide.name), slide.content);
  }

  // Convert each HTML slide
  for (let i = 0; i < slides.length; i++) {
    const htmlPath = path.join(SLIDE_DIR, slides[i].name);
    console.log(`Processing slide ${i + 1}...`);

    const result = await html2pptx(htmlPath, pptx);

    // Add chart to slide 9 (Team Allocation)
    if (i === 8 && result.placeholders.length > 0) {
      result.slide.addChart(pptx.charts.BAR, [
        {
          name: 'Mine',
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [70, 50, 20, 20, 25]
        },
        {
          name: 'Design',
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [20, 50, 50, 30, 25]
        },
        {
          name: 'Manage',
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [0, 0, 20, 40, 25]
        },
        {
          name: 'Explore',
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [10, 10, 10, 10, 25]
        }
      ], {
        ...result.placeholders[0],
        barDir: 'col',
        barGrouping: 'stacked',
        showTitle: false,
        showLegend: true,
        legendPos: 'b',
        showCatAxisTitle: true,
        catAxisTitle: 'Month',
        showValAxisTitle: true,
        valAxisTitle: 'Team Allocation (%)',
        valAxisMaxVal: 100,
        chartColors: [COLORS.blue, COLORS.orange, COLORS.grayBlue, COLORS.navy]
      });
    }
  }

  // Save the presentation
  const outputPath = path.join(__dirname, 'helm-roadmap-2026.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\nPresentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
