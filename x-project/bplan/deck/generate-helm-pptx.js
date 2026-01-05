#!/usr/bin/env node

/**
 * Helm by Synaptic - PowerPoint Deck Generator
 * Generates professional .pptx file from presentation outline
 * Generated: January 5, 2026
 * Presentation: Seed Extension Round
 */

const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// Create presentation
const pres = new PptxGenJS();

// Synaptic Branding Constants
const COLORS = {
  darkNavy: '#07253D',
  cyan: '#01A9DB',
  orange: '#FB4100',
  white: '#FFFFFF',
  gray: '#44546A',
  lightGray: '#E7E6E6'
};

const FONTS = {
  primary: 'Arial',
  sizes: {
    title: 48,
    subtitle: 28,
    header: 24,
    body: 14,
    small: 12
  }
};

// Set presentation defaults
pres.defineLayout({ name: 'LAYOUT1', width: 10, height: 5.625 }); // 16:9
pres.layout = 'LAYOUT1';
pres.theme = { colors: [COLORS.darkNavy, COLORS.cyan, COLORS.orange] };

console.log('[1/15] Creating title slide: Opening & Vision...');
// Slide 1: Opening & Vision
let slide = pres.addSlide();
slide.background = { fill: COLORS.darkNavy };
slide.addText('Helm by Synaptic', {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 1,
  fontSize: FONTS.sizes.title,
  color: COLORS.white,
  bold: true,
  align: 'center'
});
slide.addText('Executive Agent for Service Leaders', {
  x: 0.5,
  y: 2.7,
  w: 9,
  h: 0.8,
  fontSize: FONTS.sizes.subtitle,
  color: COLORS.cyan,
  align: 'center'
});
slide.addText('Give service leaders the insight and control they need to evolve their operations with confidence and impact', {
  x: 0.5,
  y: 3.7,
  w: 9,
  h: 1,
  fontSize: FONTS.sizes.body,
  color: COLORS.white,
  align: 'center'
});

console.log('[2/15] Creating content slide: The AI Agent Explosion...');
// Slide 2: The AI Agent Explosion
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('The AI Agent Explosion', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Market Inflection & Customer Service Opportunity', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});
const slide2Bullets = [
  'AI agents entering every business process: $640B+ opportunity emerging (Gartner 2026)',
  'Service leaders face the most complex deployment challenge: orchestrating agents across Salesforce, Microsoft, SAP, custom systems',
  'Salesforce Service Cloud: 70K+ customers, $9B in revenue (~$125K ACV), massive installed base ready for agent governance',
  'Customer pain: "How do I design agents? Control them? Measure ROI? How do I govern them?"'
];
slide.addText(slide2Bullets.join('\n\n'), {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.gray
});

console.log('[3/15] Creating content slide: The AI Deployment Crisis...');
// Slide 3: The AI Deployment Crisis
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('The AI Deployment Crisis', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Why 90% of Agent Investments Fail', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});
const slide3Bullets = [
  'Agents designed in silos without understanding customer context or operational impact',
  'No orchestration layer: agents create chaos, contradictory decisions, poor customer experience',
  'Black-box governance: impossible to understand why agents made decisions, audit for compliance, or correct course',
  'No learning mechanism: each agent is a standalone project, no continuous improvement',
  'Result: 7-10x cost overrun, 18-24 month delays, 70% of projects abandoned'
];
slide.addText(slide3Bullets.join('\n\n'), {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.gray
});

console.log('[4/15] Creating content slide: Market Evolution & Category...');
// Slide 4: Market Evolution & Category
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Market Evolution & Category Leadership', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Establishing "Executive Agent" as the Dominant Category', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});
const slide4Bullets = [
  'Gartner 2026: Decision Intelligence #1 on AI Hype Cycle (moving into mainstream adoption)',
  'Analyst consensus: Service leaders will buy an orchestration + governance layer first',
  '"Executive Agent" category emerging: distinct from process automation or low-code platforms',
  'First-mover advantage: establish brand, shape market definition, lock in customers before category saturation'
];
slide.addText(slide4Bullets.join('\n\n'), {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.gray
});

console.log('[5/15] Creating content slide: Helm\'s Unique Approach...');
// Slide 5: Helm's Unique Approach
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Helm\'s Unique Approach', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Four-Module Journey from Discovery to Continuous Improvement', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});
const slide5Bullets = [
  'Helm.Explore: Understand your current operations and data without integrations',
  'Helm.Mine: Design agents with context-aware intelligence and decision visibility',
  'Helm.Manage: Deploy agents with governance, audit trails, and compliance controls',
  'Helm.Improve: Continuous learning from cross-customer benchmarks and outcomes'
];
slide.addText(slide5Bullets.join('\n\n'), {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.gray
});

console.log('[6/15] Creating table slide: Four-Module Monetization...');
// Slide 6: Four-Module Monetization Journey
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Four-Module Monetization Journey', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
const moduleData = [
  [{text: 'Module', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'Primary Use Case', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'Unit Economics', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}}],
  [{text: 'Explore', options: {color: COLORS.gray}},
   {text: 'Data audit & agent design', options: {color: COLORS.gray}},
   {text: '$30-50K per engagement', options: {color: COLORS.gray}}],
  [{text: 'Mine', options: {color: COLORS.gray}},
   {text: 'Agent design & optimization', options: {color: COLORS.gray}},
   {text: '$75-150K per implementation', options: {color: COLORS.gray}}],
  [{text: 'Manage', options: {color: COLORS.gray}},
   {text: 'Governance, audit, deployment', options: {color: COLORS.gray}},
   {text: '$100-250K annually per org', options: {color: COLORS.gray}}],
  [{text: 'Improve', options: {color: COLORS.gray}},
   {text: 'Fleet learning & benchmarking', options: {color: COLORS.gray}},
   {text: '$50-100K annually per org', options: {color: COLORS.gray}}]
];
slide.addTable(moduleData, {
  x: 0.5,
  y: 1.2,
  w: 9,
  h: 3.8,
  colW: [2, 3.5, 3.5],
  border: [{pt: 1, color: COLORS.lightGray}],
  rowH: 0.76
});

console.log('[7/15] Creating content slide: The Unfair Advantage...');
// Slide 7: The Unfair Advantage
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('The Unfair Advantage', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Four Defensible Moats in an Emerging Category', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});

// Four pillars with headers
const pillarY = 1.6;
const pillarHeight = 0.8;
const pillarWidth = 2;
const pillarGap = 0.3;

const pillars = [
  { title: '1. AI-Native\nArchitecture', desc: 'Built for agents from day one, not bolted-on legacy tech' },
  { title: '2. Platform\nIndependence', desc: 'Works across Salesforce, Microsoft, SAP, custom systems' },
  { title: '3. Data Network\nEffects', desc: 'Fleet learning from peer benchmarks drives continuous improvement' },
  { title: '4. First-Mover\nAdvantage', desc: 'Establish brand leadership before category saturation' }
];

let xPos = 0.5;
pillars.forEach((pillar, idx) => {
  slide.addText(pillar.title, {
    x: xPos,
    y: pillarY,
    w: pillarWidth,
    h: pillarHeight,
    fontSize: FONTS.sizes.small,
    bold: true,
    color: COLORS.white,
    align: 'center',
    fill: COLORS.cyan
  });
  slide.addText(pillar.desc, {
    x: xPos,
    y: pillarY + pillarHeight + 0.1,
    w: pillarWidth,
    h: 1.2,
    fontSize: 11,
    color: COLORS.gray,
    align: 'center'
  });
  xPos += pillarWidth + pillarGap;
});

console.log('[8/15] Creating table slide: 5-Year Financial Trajectory...');
// Slide 8: 5-Year Financial Trajectory
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('5-Year Financial Trajectory', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
const financialData = [
  [{text: 'Year', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'ARR', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'Customers', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'Avg. Customer Value', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}}],
  [{text: '2026', options: {color: COLORS.gray}},
   {text: '$2.5M', options: {color: COLORS.gray}},
   {text: '8-12', options: {color: COLORS.gray}},
   {text: '$210K', options: {color: COLORS.gray}}],
  [{text: '2027', options: {color: COLORS.gray}},
   {text: '$12M', options: {color: COLORS.gray}},
   {text: '35-50', options: {color: COLORS.gray}},
   {text: '$280K', options: {color: COLORS.gray}}],
  [{text: '2028', options: {color: COLORS.gray}},
   {text: '$35M', options: {color: COLORS.gray}},
   {text: '85-110', options: {color: COLORS.gray}},
   {text: '$350K', options: {color: COLORS.gray}}],
  [{text: '2029', options: {color: COLORS.gray}},
   {text: '$70M', options: {color: COLORS.gray}},
   {text: '150-200', options: {color: COLORS.gray}},
   {text: '$400K', options: {color: COLORS.gray}}],
  [{text: '2030', options: {color: COLORS.gray}},
   {text: '$120M', options: {color: COLORS.gray}},
   {text: '250-300', options: {color: COLORS.gray}},
   {text: '$425K', options: {color: COLORS.gray}}]
];
slide.addTable(financialData, {
  x: 0.5,
  y: 1.2,
  w: 9,
  h: 3.8,
  colW: [2, 2, 2.5, 2.5],
  border: [{pt: 1, color: COLORS.lightGray}],
  rowH: 0.63
});

console.log('[9/15] Creating table slide: Unit Economics & Path to Profitability...');
// Slide 9: Unit Economics & Path to Profitability
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Unit Economics & Path to Profitability', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
const unitEconomicsData = [
  [{text: 'Metric', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: 'Current', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: '2027', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}},
   {text: '2028', options: {bold: true, color: COLORS.white, fill: COLORS.darkNavy}}],
  [{text: 'CAC (blended)', options: {color: COLORS.gray}},
   {text: '$35K', options: {color: COLORS.gray}},
   {text: '$28K', options: {color: COLORS.gray}},
   {text: '$22K', options: {color: COLORS.gray}}],
  [{text: 'LTV (Year 5)', options: {color: COLORS.gray}},
   {text: '$850K', options: {color: COLORS.gray}},
   {text: '$1.2M', options: {color: COLORS.gray}},
   {text: '$1.5M', options: {color: COLORS.gray}}],
  [{text: 'LTV:CAC Ratio', options: {color: COLORS.gray}},
   {text: '24:1', options: {color: COLORS.gray}},
   {text: '43:1', options: {color: COLORS.gray}},
   {text: '68:1', options: {color: COLORS.gray}}],
  [{text: 'Payback Period', options: {color: COLORS.gray}},
   {text: '18 months', options: {color: COLORS.gray}},
   {text: '14 months', options: {color: COLORS.gray}},
   {text: '11 months', options: {color: COLORS.gray}}],
  [{text: 'Gross Margin %', options: {color: COLORS.gray}},
   {text: '65%', options: {color: COLORS.gray}},
   {text: '72%', options: {color: COLORS.gray}},
   {text: '78%', options: {color: COLORS.gray}}]
];
slide.addTable(unitEconomicsData, {
  x: 0.5,
  y: 1.2,
  w: 9,
  h: 3.8,
  colW: [2.5, 2, 2.25, 2.25],
  border: [{pt: 1, color: COLORS.lightGray}],
  rowH: 0.63
});

console.log('[10/15] Creating content slide: Three-Phase Market Expansion...');
// Slide 10: Three-Phase Market Expansion
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Three-Phase Market Expansion', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Go-to-Market Strategy: Vertical Specialization Then Horizontal Scaling', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});

// Three phases
const phaseY = 1.6;
const phaseWidth = 2.8;
const phaseGap = 0.4;
const phases = [
  { title: 'Phase 1: Beachhead\n(2026-2027)', bullets: ['Salesforce Service Cloud customers', 'Vertical: Fortune 1000 in Financial Services', 'Land & expand within installed base'] },
  { title: 'Phase 2: Multi-Cloud\n(2027-2028)', bullets: ['Microsoft Dynamics + custom CRM', 'Expand to mid-market (500-2000 employees)', 'Cross-vertical momentum'] },
  { title: 'Phase 3: Horizontal\n(2028+)', bullets: ['Enterprise and SMB horizontally', 'New verticals: Healthcare, Retail, Manufacturing', 'Market leadership position'] }
];

let xPhase = 0.5;
phases.forEach((phase) => {
  slide.addText(phase.title, {
    x: xPhase,
    y: phaseY,
    w: phaseWidth,
    h: 0.6,
    fontSize: FONTS.sizes.small,
    bold: true,
    color: COLORS.white,
    align: 'center',
    fill: COLORS.darkNavy
  });
  slide.addText(phase.bullets.join('\n'), {
    x: xPhase,
    y: phaseY + 0.7,
    w: phaseWidth,
    h: 2,
    fontSize: 10,
    color: COLORS.gray,
    align: 'left'
  });
  xPhase += phaseWidth + phaseGap;
});

console.log('[11/15] Creating content slide: Expansion & Retention Strategy...');
// Slide 11: Expansion & Retention Strategy
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Expansion & Retention Strategy', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('Driving Revenue Growth and Defensibility', {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan
});

const expansionBullets = [
  'Module expansion within existing customers (Explore → Mine → Manage → Improve)',
  'Seat expansion and organizational scaling',
  'Data Network Effects: customers benefit from benchmarks and learnings from peer fleet',
  'High NPS & retention: solving mission-critical problem with measurable ROI',
  'Expected NRR: 140-160% by Year 3 (strong land-and-expand economics)'
];
slide.addText(expansionBullets.join('\n\n'), {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.gray
});

console.log('[12/15] Creating content slide: Traction & Early Validation...');
// Slide 12: Traction & Early Validation
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Traction & Early Validation', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('[To fill in with current metrics]', {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.orange,
  italic: true
});
slide.addText('MVP status • Beta users/pilots • Signups/waitlist • Early revenue/LOIs • Customer testimonials • Case studies • Usage metrics', {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 1.5,
  fontSize: FONTS.sizes.small,
  color: COLORS.gray
});

console.log('[13/15] Creating content slide: Product Roadmap...');
// Slide 13: Product Roadmap
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('Product Roadmap', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('[To fill in with quarterly capabilities]', {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.orange,
  italic: true
});
slide.addText('Q1 2026 • Q2-Q3 2026 • Q4 2026-Q2 2027 • 2027+ long-term vision', {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 1.5,
  fontSize: FONTS.sizes.small,
  color: COLORS.gray
});

console.log('[14/15] Creating content slide: The Ask...');
// Slide 14: The Ask
slide = pres.addSlide();
slide.background = { fill: COLORS.white };
slide.addText('The Ask', {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.5,
  fontSize: FONTS.sizes.header,
  color: COLORS.darkNavy,
  bold: true
});
slide.addText('[To fill in with funding details]', {
  x: 0.5,
  y: 1.6,
  w: 9,
  h: 3.5,
  fontSize: FONTS.sizes.body,
  color: COLORS.orange,
  italic: true
});
slide.addText('Funding amount • Round structure • Use of funds • Key milestones • Runway • Series A timing', {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 1.5,
  fontSize: FONTS.sizes.small,
  color: COLORS.gray
});

console.log('[15/15] Creating closing slide: Vision & Next Steps...');
// Slide 15: Vision & Closing
slide = pres.addSlide();
slide.background = { fill: COLORS.darkNavy };
slide.addText('Long-Term Vision', {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 0.6,
  fontSize: FONTS.sizes.title,
  color: COLORS.cyan,
  bold: true,
  align: 'center'
});
slide.addText('Establish Helm as the dominant "Executive Agent" platform, enabling service leaders globally to orchestrate AI with confidence, governance, and continuous improvement.', {
  x: 0.5,
  y: 2.3,
  w: 9,
  h: 1.2,
  fontSize: FONTS.sizes.subtitle,
  color: COLORS.white,
  align: 'center'
});
slide.addText('helmbysynaptic.com', {
  x: 0.5,
  y: 4.5,
  w: 9,
  h: 0.4,
  fontSize: FONTS.sizes.body,
  color: COLORS.cyan,
  align: 'center'
});

// Save presentation
const outputPath = path.join(__dirname, 'helm-deck.pptx');
pres.writeFile({ fileName: outputPath });

console.log(`\n✅ PowerPoint presentation generated successfully!`);
console.log(`📄 File: ${outputPath}`);
console.log(`📊 Slides: 15`);
console.log(`🎨 Branding: Synaptic (Dark Navy, Cyan, Orange)`);
console.log(`\n✨ Ready for investor presentations!`);
