#!/usr/bin/env node

/**
 * Helm by Synaptic - Investor Presentation Generator
 *
 * This script generates a PowerPoint presentation for the Helm investor deck
 * using pptxgenjs directly.
 *
 * Usage: node generate-helm-deck.js
 * Output: helm-deck.pptx
 */

const PptxGenJS = require("pptxgenjs");

// Create presentation
const prs = new PptxGenJS();
prs.defineLayout({ name: "LAYOUT_16x9", width: 10, height: 5.625 });
prs.layout = "LAYOUT_16x9";

// Define Synaptic brand colors
const C = {
  darkNavy: "#07253D",
  cyan: "#01A9DB",
  orange: "#FB4100",
  white: "#FFFFFF",
  gray: "#44546A",
  lightGray: "#E7E6E6"
};

console.log("[Helm Presentation Generator]");
console.log("Generating PowerPoint presentation...\n");

// Helper function to add slide number
function addSlideNumber(slide, number) {
  slide.addText(number.toString(), {
    x: 9.2,
    y: 5.3,
    w: 0.6,
    h: 0.25,
    fontSize: 10,
    color: C.gray,
    align: "right"
  });
}

// Helper function to add logo
function addLogo(slide, whiteText = false) {
  slide.addText("Helm by Synaptic", {
    x: 0.2,
    y: 0.2,
    w: 1.5,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: whiteText ? C.white : C.darkNavy
  });
}

// Slide 1: Title Slide
console.log("[1/15] Creating title slide...");
let slide = prs.addSlide();
slide.background = { fill: C.darkNavy };
slide.addShape(prs.ShapeType.rect, {
  x: 5,
  y: 0,
  w: 5,
  h: 5.625,
  fill: C.cyan,
  line: { type: "none" },
  rotate: 45
});
addLogo(slide, true);
slide.addText("Executive Agent for Service Leaders", {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 1.2,
  fontSize: 44,
  bold: true,
  color: C.white,
  align: "center"
});
slide.addText(
  "Give service leaders the insight and control they need to evolve their operations with confidence and impact",
  {
    x: 0.5,
    y: 2.8,
    w: 9,
    h: 1,
    fontSize: 22,
    color: C.cyan,
    align: "center"
  }
);
slide.addText("Seed Extension Round", {
  x: 0.5,
  y: 4.1,
  w: 9,
  h: 0.3,
  fontSize: 14,
  color: C.white,
  align: "center"
});
slide.addText("January 2026", {
  x: 0.5,
  y: 4.4,
  w: 9,
  h: 0.3,
  fontSize: 12,
  color: C.cyan,
  align: "center"
});
addSlideNumber(slide, 1);

// Slide 2: The AI Agent Explosion
console.log('[2/15] Creating "The AI Agent Explosion" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("The AI Agent Explosion", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Market Inflection Point (2026)", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide2Text = [
  "Gartner: 40% of enterprise apps will feature task-specific AI agents by end of 2026 (vs <5% in 2025)",
  'Microsoft/Stanford HAI: Shift from "AI evangelism" to "pragmatic AI evaluation" in 2026',
  "Industry consensus: Agent adoption moving from pilots to production"
];
slide.addText(slide2Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 1.2,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Why Customer Service First", {
  x: 0.5,
  y: 2.65,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide2Text2 = [
  "158,000 total addressable companies (150K SMB + 8K enterprise)",
  "Highest ROI AI use case: cost per contact, CSAT improvement",
  "Salesforce Service Cloud: 70K+ customers, $9B revenue (~$125K ACV)",
  "33% of deployments failing due to lack of governance"
];
slide.addText(slide2Text2.join("\n\n"), {
  x: 0.7,
  y: 3.0,
  w: 8.6,
  h: 1.2,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 2);

// Slide 3: The AI Deployment Crisis
console.log('[3/15] Creating "The AI Deployment Crisis" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("The AI Deployment Crisis", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("The Problem", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.orange
});
const slide3Text = [
  "33% of service AI deployments fail due to lack of decision context and governance",
  'Companies mistake "deploying an agent" for "managing decisions"',
  "No audit trail for compliance and transparency (increasingly required)",
  "Historic: 95% of AI pilots deliver zero ROI (MIT), 85% fail before value (Gartner)"
];
slide.addText(slide3Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 1.2,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Why This Matters Now", {
  x: 0.5,
  y: 2.65,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide3Text2 = [
  "EU AI Act fully applicable August 2, 2026 (mandatory governance/transparency)",
  "60% of Fortune 100 will appoint Chief AI Officer in 2026",
  'Regulatory pressure forces "meaningful human review" of AI decisions'
];
slide.addText(slide3Text2.join("\n\n"), {
  x: 0.7,
  y: 3.0,
  w: 8.6,
  h: 0.9,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 3);

// Slide 4: Market Evolution & Emerging Category
console.log('[4/15] Creating "Market Evolution & Emerging Category" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Market Evolution & Emerging Category", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Category Crystallization (2026)", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide4Text = [
  "Gartner: Decision Intelligence is #1 trend in 2026 Hype Cycle",
  "Forrester: Agent Control Planes becoming essential governance layer",
  'VCs/Foundation Capital: Context Graphs and "Execution Intelligence Layer" as key infrastructure'
];
slide.addText(slide4Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 1.0,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("TAM Expansion", {
  x: 0.5,
  y: 2.45,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide4Text2 = [
  "Base TAM: 158,000 companies deploying customer service AI",
  "40% agent adoption by 2026 = billions in software transformation",
  "Revenue TAM: $2-3B annual market opportunity for decision intelligence infrastructure"
];
slide.addText(slide4Text2.join("\n\n"), {
  x: 0.7,
  y: 2.75,
  w: 8.6,
  h: 0.9,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 4);

// Slide 5: Helm's Unique Approach
console.log('[5/15] Creating "Helm\'s Unique Approach" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Helm's Unique Approach", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("What Helm Does", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide5Text = [
  "Mine: Captures how decisions are made across your customer service operation",
  "Design: Helps you design better processes and agent workflows",
  "Manage: Continuously monitors and improves with governance guardrails"
];
slide.addText(slide5Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 0.9,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Key Differentiators", {
  x: 0.5,
  y: 2.35,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide5Text2 = [
  "Executive-Friendly: Natural language interface, no technical training required",
  "Fast Time-to-Value: Start free, get insights immediately",
  "AI-Native: Continuously learns and improves from usage patterns",
  "Platform Independent: Works across Salesforce, Zendesk, and any system"
];
slide.addText(slide5Text2.join("\n\n"), {
  x: 0.7,
  y: 2.7,
  w: 8.6,
  h: 1.1,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 5);

// Slide 6: Four-Module Monetization Journey
console.log('[6/15] Creating "Four-Module Monetization Journey" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Four-Module Monetization Journey", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
const tableData = [
  [
    {
      text: "Module",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Purpose",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Price",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Users",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    }
  ],
  [
    { text: "Explore" },
    { text: "Build user base" },
    { text: "Free" },
    { text: "Individual Contributors" }
  ],
  [
    { text: "Mine" },
    { text: "Baseline understanding" },
    { text: "$10K-$50K" },
    { text: "Directors, VPs" }
  ],
  [
    { text: "Design" },
    { text: "AI-readiness plan" },
    { text: "$25K-$100K" },
    { text: "VPs, C-Suite" }
  ],
  [
    { text: "Manage" },
    { text: "Continuous improvement" },
    { text: "$500-$50K/mo" },
    { text: "C-Suite, Operations" }
  ]
];
slide.addTable(tableData, {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 2.0,
  fontSize: 10,
  color: C.gray,
  border: { pt: 1, color: C.lightGray },
  align: "left",
  valign: "middle"
});
slide.addText(
  "Result: 2% freemium conversion → 50K+ free users → $1-2M Y1 ARR",
  {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 0.4,
    fontSize: 11,
    color: C.gray,
    align: "center",
    bold: true
  }
);
addSlideNumber(slide, 6);

// Slide 7: The Unfair Advantage
console.log('[7/15] Creating "The Unfair Advantage" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("The Unfair Advantage", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Four Interconnected Advantages", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide7Text = [
  "1. AI-Native Architecture: Every component AI-driven = simplified deployment",
  "2. Platform Independence: Multi-platform aware, unbiased, vendor-neutral",
  "3. Data Network Effects: Fleet learning + peer benchmarks = true moat",
  '4. First-Mover Advantage: Own "Executive Agent" category (12-18 month window)'
];
slide.addText(slide7Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 1.2,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Why Competitors Can't Match", {
  x: 0.5,
  y: 2.65,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.orange
});
const slide7Text2 = [
  "Legacy Vendors: Trapped in enterprise model, no network effects",
  "Incumbents (Salesforce): Platform bias, can't be trustworthy governance layer"
];
slide.addText(slide7Text2.join("\n\n"), {
  x: 0.7,
  y: 3.0,
  w: 8.6,
  h: 0.7,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 7);

// Slide 8: 5-Year Financial Trajectory
console.log('[8/15] Creating "5-Year Financial Trajectory" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("5-Year Financial Trajectory", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
const tableData8 = [
  [
    {
      text: "Year",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Free Users",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Paying Customers",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "ARR",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "NDR",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    }
  ],
  [
    { text: "Y1 (2026)" },
    { text: "50,000" },
    { text: "500-1K" },
    { text: "$1-2M" },
    { text: "110-120%" }
  ],
  [
    { text: "Y2 (2027)" },
    { text: "200,000" },
    { text: "2.5-4K" },
    { text: "$5-10M" },
    { text: "130-150%" }
  ],
  [
    { text: "Y3 (2028)" },
    { text: "500,000" },
    { text: "7-10K" },
    { text: "$20-40M" },
    { text: "140-160%" }
  ],
  [
    { text: "Y5 (2030)" },
    { text: "2M+" },
    { text: "18-20K" },
    { text: "$100-150M" },
    { text: "150-180%" }
  ]
];
slide.addTable(tableData8, {
  x: 0.3,
  y: 1.0,
  w: 9.4,
  h: 2.0,
  fontSize: 9,
  color: C.gray,
  border: { pt: 1, color: C.lightGray },
  align: "center",
  valign: "middle"
});
slide.addText(
  "Key Driver: 2% freemium conversion + 130-180% NDR = exponential growth",
  {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 0.4,
    fontSize: 10,
    color: C.gray,
    align: "center",
    bold: true
  }
);
addSlideNumber(slide, 8);

// Slide 9: Unit Economics & Path to Profitability
console.log(
  '[9/15] Creating "Unit Economics & Path to Profitability" slide...'
);
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Unit Economics & Path to Profitability", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
const tableData9 = [
  [
    {
      text: "Segment",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "LTV:CAC",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "CAC Payback",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "Gross Margin",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    },
    {
      text: "NDR",
      options: { bold: true, color: C.darkNavy, fill: C.lightGray }
    }
  ],
  [
    { text: "SMB" },
    { text: "80-250:1" },
    { text: "1-2 mo" },
    { text: "80-85%" },
    { text: "110-120%" }
  ],
  [
    { text: "Mid-Market" },
    { text: "100-300:1" },
    { text: "2-4 mo" },
    { text: "82-87%" },
    { text: "130-150%" }
  ],
  [
    { text: "Enterprise" },
    { text: "100-400:1" },
    { text: "3-6 mo" },
    { text: "85-90%" },
    { text: "140-180%" }
  ]
];
slide.addTable(tableData9, {
  x: 0.3,
  y: 1.0,
  w: 9.4,
  h: 1.5,
  fontSize: 10,
  color: C.gray,
  border: { pt: 1, color: C.lightGray },
  align: "center",
  valign: "middle"
});
slide.addText("Profitability Timeline", {
  x: 0.5,
  y: 2.7,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide9Text = [
  "Gross Margin: 80-85% from day 1 (software high margin)",
  "EBITDA Positive: Year 2-3 (when growth moderates)",
  "Path to $100M ARR: Year 5 (sustainable, cash-generative)"
];
slide.addText(slide9Text.join("\n\n"), {
  x: 0.7,
  y: 3.0,
  w: 8.6,
  h: 0.8,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 9);

// Slide 10: Three-Phase Market Expansion
console.log('[10/15] Creating "Three-Phase Market Expansion" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Three-Phase Market Expansion", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Phase 1: SMB Domination (Y1-2)", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "Beachhead: 150K SMB via Salesforce AppExchange\nTarget: 50K free → 1K paying → $1-2M ARR",
  {
    x: 0.7,
    y: 1.3,
    w: 8.6,
    h: 0.5,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Phase 2: Mid-Market Expansion (Y2-3)", {
  x: 0.5,
  y: 1.9,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "Leverage: 5K+ SMB proof points\nTarget: 200K free → 4K paying → $5-10M ARR",
  {
    x: 0.7,
    y: 2.2,
    w: 8.6,
    h: 0.5,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Phase 3: Enterprise & Vertical Expansion (Y3+)", {
  x: 0.5,
  y: 2.8,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "Grassroots adoption + benchmarking\nTarget: 500K+ free → 10K+ paying → $20-40M+ ARR\nExpand: Finance, IT, HR, Support operations",
  {
    x: 0.7,
    y: 3.1,
    w: 8.6,
    h: 0.7,
    fontSize: 11,
    color: C.gray
  }
);
addSlideNumber(slide, 10);

// Slide 11: Expansion & Retention Strategy
console.log('[11/15] Creating "Expansion & Retention Strategy" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Expansion & Retention Strategy", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Expansion Revenue Levers", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide11Text = [
  "Explore → Mine: 60% conversion (baseline understanding)",
  "Mine → Design: 40% conversion (roadmap needed)",
  "Design → Manage: 50% conversion (governance required)",
  "Cross-team adoption: Finance, Operations, HR teams"
];
slide.addText(slide11Text.join("\n\n"), {
  x: 0.7,
  y: 1.35,
  w: 8.6,
  h: 1.0,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Network Effects & Retention", {
  x: 0.5,
  y: 2.45,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide11Text2 = [
  "Peer benchmarking: 130-180% NDR driven by expansion revenue",
  "Fleet learning: Every customer makes product smarter (network effects)",
  "Viral coefficient: Industry benchmarks incentivize sharing (NPS 50+ target)"
];
slide.addText(slide11Text2.join("\n\n"), {
  x: 0.7,
  y: 2.8,
  w: 8.6,
  h: 0.9,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
addSlideNumber(slide, 11);

// Slide 12: Traction & Early Validation
console.log('[12/15] Creating "Traction & Early Validation" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Traction & Early Validation", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Product Status", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.orange
});
slide.addText(
  "[To fill in]: MVP status, beta users, pilot customers\n[To fill in]: User signups or waitlist size",
  {
    x: 0.7,
    y: 1.3,
    w: 8.6,
    h: 0.6,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Triple Validation Framework", {
  x: 0.5,
  y: 2.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
const slide12Text2 = [
  "Customer Conversations: Service leaders report urgent need for governance",
  "Our Own Products: MAX, Claude Code show teams hitting constraints daily",
  "Market Validation: Ed Sim, Gartner, Forrester publishing same thesis"
];
slide.addText(slide12Text2.join("\n\n"), {
  x: 0.7,
  y: 2.35,
  w: 8.6,
  h: 0.8,
  fontSize: 11,
  color: C.gray,
  valign: "top"
});
slide.addText("Product Demonstration", {
  x: 0.5,
  y: 3.25,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
slide.addText(
  "Radar UI Prototype: Interactive visualization of real-time decision patterns (Mine module)",
  {
    x: 0.7,
    y: 3.55,
    w: 8.6,
    h: 0.5,
    fontSize: 11,
    color: C.gray
  }
);
addSlideNumber(slide, 12);

// Slide 13: Product Roadmap
console.log('[13/15] Creating "Product Roadmap" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("Product Roadmap", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Q1 2026 (Current Release)", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "[To fill in]: MVP feature set and current capabilities shipped",
  {
    x: 0.7,
    y: 1.3,
    w: 8.6,
    h: 0.3,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Q2-Q3 2026 (Near-Term)", {
  x: 0.5,
  y: 1.7,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText("[To fill in]: Key features and customer feedback integration", {
  x: 0.7,
  y: 2.0,
  w: 8.6,
  h: 0.3,
  fontSize: 11,
  color: C.gray
});
slide.addText("Q4 2026 - Q2 2027 (Mid-Term)", {
  x: 0.5,
  y: 2.4,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "[To fill in]: New module capabilities and vertical specialization",
  {
    x: 0.7,
    y: 2.7,
    w: 8.6,
    h: 0.3,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("2027+ (Long-Term)", {
  x: 0.5,
  y: 3.1,
  w: 9,
  h: 0.25,
  fontSize: 13,
  bold: true,
  color: C.cyan
});
slide.addText(
  "[To fill in]: Enterprise features and expansion to adjacent verticals",
  {
    x: 0.7,
    y: 3.4,
    w: 8.6,
    h: 0.3,
    fontSize: 11,
    color: C.gray
  }
);
addSlideNumber(slide, 13);

// Slide 14: The Ask
console.log('[14/15] Creating "The Ask" slide...');
slide = prs.addSlide();
slide.background = { fill: C.white };
addLogo(slide);
slide.addText("The Ask", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.4,
  fontSize: 28,
  bold: true,
  color: C.darkNavy
});
slide.addText("Funding Request", {
  x: 0.5,
  y: 1.0,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.orange
});
slide.addText(
  "[To fill in]: Amount sought\n[To fill in]: Round structure (SAFE, priced, etc.)",
  {
    x: 0.7,
    y: 1.3,
    w: 8.6,
    h: 0.5,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Use of Funds", {
  x: 0.5,
  y: 1.9,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
slide.addText(
  "Engineering/Product: [To fill in: %]\nSales & Marketing: [To fill in: %]\nOperations: [To fill in: %]",
  {
    x: 0.7,
    y: 2.2,
    w: 8.6,
    h: 0.6,
    fontSize: 11,
    color: C.gray
  }
);
slide.addText("Key Milestones", {
  x: 0.5,
  y: 2.9,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.cyan
});
slide.addText("[To fill in]: 3-4 major objectives and targets", {
  x: 0.7,
  y: 3.2,
  w: 8.6,
  h: 0.3,
  fontSize: 11,
  color: C.gray
});
addSlideNumber(slide, 14);

// Slide 15: Closing Title Slide
console.log("[15/15] Creating closing slide...");
slide = prs.addSlide();
slide.background = { fill: C.darkNavy };
slide.addShape(prs.ShapeType.rect, {
  x: 5,
  y: 0,
  w: 5,
  h: 5.625,
  fill: C.cyan,
  line: { type: "none" },
  rotate: 45
});
addLogo(slide, true);
slide.addText("Building the Future of Agent Governance", {
  x: 0.5,
  y: 1.3,
  w: 9,
  h: 0.6,
  fontSize: 40,
  bold: true,
  color: C.white,
  align: "center"
});
slide.addText(
  '"Helm is building the decision intelligence infrastructure for the service industry—a world where every decision is understood, every agent is governed by human wisdom, and every outcome drives continuous organizational learning."',
  {
    x: 0.7,
    y: 2.1,
    w: 8.6,
    h: 1.0,
    fontSize: 14,
    color: C.cyan,
    align: "center",
    valign: "top"
  }
);
slide.addText("Why Now", {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 0.25,
  fontSize: 14,
  bold: true,
  color: C.orange
});
slide.addText(
  "40% of enterprise apps getting agents by end of 2026\nMarket need for governance infrastructure is acute and urgent\nCategory crystallizing as essential infrastructure",
  {
    x: 0.7,
    y: 3.5,
    w: 8.6,
    h: 0.7,
    fontSize: 11,
    color: C.white,
    align: "center"
  }
);
addSlideNumber(slide, 15);

// Save the presentation
console.log("\nGenerating PowerPoint file...");
prs
  .writeFile("output/helm-deck.pptx")
  .then(() => {
    console.log("\n✅ Presentation generated successfully!");
    console.log(
      "📊 Output: /Users/wkarp/devlocal/prod-miner-pm/output/helm-deck.pptx"
    );
    console.log("📝 Total slides: 15");
    console.log("\nPresentation includes:");
    console.log("  • Executive summary and market opportunity");
    console.log("  • AI deployment crisis and timing");
    console.log("  • Helm's unique approach and differentiators");
    console.log("  • Monetization strategy and financial projections");
    console.log("  • Unit economics and market expansion phases");
    console.log("  • Product roadmap and traction validation");
    console.log("  • Investor ask and call to action");
  })
  .catch((error) => {
    console.error("❌ Error generating presentation:", error.message);
    process.exit(1);
  });
