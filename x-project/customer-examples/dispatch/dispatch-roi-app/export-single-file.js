#!/usr/bin/env node

/**
 * Export Dispatch ROI App as a single standalone HTML file
 * Creates a self-contained file that works offline
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Creating standalone HTML export...\n');

// Read the data file
const dataPath = path.join(__dirname, 'src/lib/data/dispatch-roi.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Read the global CSS
const cssPath = path.join(__dirname, 'src/app/globals.css');
const globalCSS = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';

// Create standalone HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dispatch - AI Opportunity Analysis</title>
  <style>
    ${globalCSS}

    /* Additional inline styles */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0D1321;
      color: #F0F6FC;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .tab-button {
      padding: 12px 24px;
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(139, 164, 196, 0.2);
      color: #8BA4C4;
      cursor: pointer;
      border-radius: 8px;
      margin-right: 8px;
    }

    .tab-button.active {
      background: rgba(0, 212, 255, 0.2);
      border-color: #00D4FF;
      color: #00D4FF;
    }

    .hidden { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1 style="font-size: 48px; text-align: center; margin: 40px 0;">
      Dispatch - AI Opportunity Analysis
    </h1>

    <div style="text-align: center; margin-bottom: 40px;">
      <button class="tab-button active" onclick="showTab('summary')">Summary</button>
      <button class="tab-button" onclick="showTab('scenarios')">Scenarios</button>
      <button class="tab-button" onclick="showTab('departments')">Departments</button>
      <button class="tab-button" onclick="showTab('financial')">Financial Impact</button>
    </div>

    <div id="summary-tab">
      <h2>Executive Summary</h2>
      <p>Annual Revenue: <strong style="color: #00D4FF;">$${(data.company.metrics.totalRevenue / 1000000).toFixed(1)}M</strong></p>
      <p>AI Savings Potential: <strong style="color: #10B981;">$${(data.projectedOutcomes.scenarios.conservative.totalSavings / 1000000).toFixed(1)}M - $${(data.projectedOutcomes.scenarios.transformed.totalSavings / 1000000).toFixed(1)}M</strong></p>

      <h3 style="margin-top: 30px;">Three Transformation Scenarios</h3>
      ${data.aiScenarios.definitions.map(scenario => `
        <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(139, 164, 196, 0.2); border-radius: 12px; padding: 20px; margin: 15px 0;">
          <h4 style="color: #00D4FF; margin-top: 0;">${scenario.name}</h4>
          <p>${scenario.description}</p>
          <p><strong>Timeline:</strong> ${scenario.timeline}</p>
          <p><strong>Savings:</strong> $${(data.projectedOutcomes.scenarios[scenario.id].totalSavings / 1000000).toFixed(1)}M</p>
          <p><strong>ROI:</strong> ${data.projectedOutcomes.scenarios[scenario.id].roiMultiple.toFixed(1)}x</p>
        </div>
      `).join('')}
    </div>

    <div id="scenarios-tab" class="hidden">
      <h2>Scenario Comparison</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid rgba(139, 164, 196, 0.3);">
            <th style="text-align: left; padding: 12px; color: #8BA4C4;">Scenario</th>
            <th style="text-align: right; padding: 12px; color: #8BA4C4;">Investment</th>
            <th style="text-align: right; padding: 12px; color: #8BA4C4;">Savings</th>
            <th style="text-align: right; padding: 12px; color: #8BA4C4;">ROI</th>
            <th style="text-align: right; padding: 12px; color: #8BA4C4;">Payback</th>
          </tr>
        </thead>
        <tbody>
          ${data.aiScenarios.definitions.map(scenario => `
            <tr style="border-bottom: 1px solid rgba(139, 164, 196, 0.1);">
              <td style="padding: 12px; font-weight: 600;">${scenario.name}</td>
              <td style="text-align: right; padding: 12px;">$${(data.projectedOutcomes.scenarios[scenario.id].investment / 1000).toFixed(0)}K</td>
              <td style="text-align: right; padding: 12px; color: #10B981; font-weight: 600;">$${(data.projectedOutcomes.scenarios[scenario.id].totalSavings / 1000000).toFixed(1)}M</td>
              <td style="text-align: right; padding: 12px; font-weight: 600;">${data.projectedOutcomes.scenarios[scenario.id].roiMultiple.toFixed(1)}x</td>
              <td style="text-align: right; padding: 12px;">${data.projectedOutcomes.scenarios[scenario.id].paybackPeriod}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div id="departments-tab" class="hidden">
      <h2>Department Analysis</h2>
      ${data.departments.filter(d => d.aiOpportunity).map(dept => `
        <div style="background: rgba(30, 41, 59, 0.6); border-left: 4px solid #00D4FF; border-radius: 8px; padding: 20px; margin: 15px 0;">
          <h3 style="margin-top: 0;">${dept.name}</h3>
          <p><strong>Current Spend:</strong> $${(dept.annualSpend / 1000000).toFixed(1)}M | <strong>Headcount:</strong> ${dept.headcount || 0} FTEs</p>
          <p style="color: #8BA4C4;">${dept.notes}</p>
        </div>
      `).join('')}
    </div>

    <div id="financial-tab" class="hidden">
      <h2>Financial Impact</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
        ${data.aiScenarios.definitions.slice(0, 3).map(scenario => {
          const outcome = data.projectedOutcomes.scenarios[scenario.id];
          return `
            <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(139, 164, 196, 0.2); border-radius: 12px; padding: 20px; text-align: center;">
              <h4 style="color: #00D4FF;">${scenario.name}</h4>
              <div style="font-size: 36px; font-weight: bold; color: #10B981; margin: 15px 0;">
                $${(outcome.newEbitda / 1000000).toFixed(1)}M
              </div>
              <div style="color: #8BA4C4; font-size: 14px;">New EBITDA</div>
              <div style="margin-top: 15px; font-size: 24px; font-weight: 600; color: #FB4100;">
                ${(outcome.newEbitdaMargin * 100).toFixed(1)}%
              </div>
              <div style="color: #8BA4C4; font-size: 14px;">EBITDA Margin</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  </div>

  <script>
    // Embedded data
    const appData = ${JSON.stringify(data, null, 2)};

    // Tab switching
    function showTab(tabName) {
      // Hide all tabs
      ['summary', 'scenarios', 'departments', 'financial'].forEach(name => {
        document.getElementById(name + '-tab').classList.add('hidden');
      });

      // Remove active from all buttons
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });

      // Show selected tab
      document.getElementById(tabName + '-tab').classList.remove('hidden');

      // Mark button as active
      event.target.classList.add('active');
    }

    console.log('Dispatch ROI App loaded. Data:', appData);
  </script>
</body>
</html>`;

// Write the file
const outputPath = path.join(__dirname, 'dispatch-roi-standalone.html');
fs.writeFileSync(outputPath, html, 'utf-8');

const stats = fs.statSync(outputPath);
const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);

console.log('✅ Standalone HTML file created!\n');
console.log(`📄 File: dispatch-roi-standalone.html`);
console.log(`📊 Size: ${fileSizeMB} MB`);
console.log(`\n💡 To use: Open dispatch-roi-standalone.html in any web browser`);
console.log(`   Works offline, no server required!`);
