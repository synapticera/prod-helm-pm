#!/usr/bin/env node

/**
 * McKinsey Helm Validation Slide Generator (v2)
 * Creates PowerPoint with professional spacing and grid-based layout
 *
 * Usage: node generate-mckinsey-v2.js
 * Output: mckinsey-helm-validation-v2.pptx
 */

const fs = require("fs");
const path = require("path");

try {
  const PptxGenJS = require("pptxgenjs");

  // Create presentation
  const prs = new PptxGenJS();

  // Add slide (16:9 widescreen)
  const slide = prs.addSlide();

  // Set background
  slide.background = { color: "07253D" };

  // Add subtle gradient background with shapes
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    fill: { type: "solid", color: "0d3a52", transparency: 0 },
    line: { type: "none" }
  });

  // Add radial glow accent (top right)
  slide.addShape(prs.ShapeType.ellipse, {
    x: 8.5,
    y: -1.5,
    w: 4,
    h: 4,
    fill: { type: "solid", color: "01A9DB", transparency: 94 },
    line: { type: "none" }
  });

  console.log("[1/6] Added background and accents");

  // HEADER SECTION
  // Source label
  slide.addText("McKinsey State of AI 2025", {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  // Title
  slide.addText("The Workflow Redesign Imperative", {
    x: 0.5,
    y: 0.75,
    w: 9,
    h: 0.6,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  // Subtitle
  slide.addText("Why 88% Deployment ≠ Enterprise ROI", {
    x: 0.5,
    y: 1.35,
    w: 9,
    h: 0.35,
    fontSize: 20,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  console.log("[2/6] Added header section");

  // LEFT SECTION: Statistics (equal spacing, top to bottom)
  const leftX = 0.5;
  const statBoxWidth = 4;
  const stat1Y = 1.9;
  const stat2Y = 3.4;
  const stat3Y = 4.9;

  // Stat Box 1: 88%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: stat1Y,
    w: statBoxWidth,
    h: 1.3,
    fill: { type: "solid", color: "01A9DB", transparency: 92 },
    line: { color: "01A9DB", pt: 3, transparency: 25 }
  });

  slide.addText("88%", {
    x: leftX + 0.3,
    y: stat1Y + 0.15,
    w: statBoxWidth - 0.6,
    h: 0.4,
    fontSize: 56,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("Organizations Using AI", {
    x: leftX + 0.3,
    y: stat1Y + 0.6,
    w: statBoxWidth - 0.6,
    h: 0.25,
    fontSize: 15,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText(
    "Regular AI use in at least one business function (↑10pp from 2024)",
    {
      x: leftX + 0.3,
      y: stat1Y + 0.9,
      w: statBoxWidth - 0.6,
      h: 0.35,
      fontSize: 11,
      color: "A8BECF",
      align: "left",
      fontFace: "Poppins"
    }
  );

  // Stat Box 2: 23%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: stat2Y,
    w: statBoxWidth,
    h: 1.3,
    fill: { type: "solid", color: "01A9DB", transparency: 92 },
    line: { color: "01A9DB", pt: 3, transparency: 25 }
  });

  slide.addText("23%", {
    x: leftX + 0.3,
    y: stat2Y + 0.15,
    w: statBoxWidth - 0.6,
    h: 0.4,
    fontSize: 56,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("Scaling Agentic Systems", {
    x: leftX + 0.3,
    y: stat2Y + 0.6,
    w: statBoxWidth - 0.6,
    h: 0.25,
    fontSize: 15,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("Production deployment across functions", {
    x: leftX + 0.3,
    y: stat2Y + 0.9,
    w: statBoxWidth - 0.6,
    h: 0.35,
    fontSize: 11,
    color: "A8BECF",
    align: "left",
    fontFace: "Poppins"
  });

  // Stat Box 3: 39%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: stat3Y,
    w: statBoxWidth,
    h: 1.3,
    fill: { type: "solid", color: "01A9DB", transparency: 92 },
    line: { color: "01A9DB", pt: 3, transparency: 25 }
  });

  slide.addText("39%", {
    x: leftX + 0.3,
    y: stat3Y + 0.15,
    w: statBoxWidth - 0.6,
    h: 0.4,
    fontSize: 56,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("Seeing EBIT Impact", {
    x: leftX + 0.3,
    y: stat3Y + 0.6,
    w: statBoxWidth - 0.6,
    h: 0.25,
    fontSize: 15,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("Enterprise-level financial results from AI", {
    x: leftX + 0.3,
    y: stat3Y + 0.9,
    w: statBoxWidth - 0.6,
    h: 0.35,
    fontSize: 11,
    color: "A8BECF",
    align: "left",
    fontFace: "Poppins"
  });

  console.log("[3/6] Added left section (statistics)");

  // RIGHT SECTION: Insights (compact spacing with 24px gaps)
  const rightX = 4.8;
  const rightBoxWidth = 4.7;
  const gapBoxY = 1.9;
  const quoteBoxY = 3.65;
  const helmBoxY = 5.1;

  // Gap Box (orange emphasis)
  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: gapBoxY,
    w: rightBoxWidth,
    h: 1.6,
    fill: { type: "solid", color: "FB4100", transparency: 88 },
    line: { color: "FB4100", pt: 3, transparency: 35 }
  });

  slide.addText("THE CRITICAL GAP", {
    x: rightX + 0.25,
    y: gapBoxY + 0.15,
    w: rightBoxWidth - 0.5,
    h: 0.2,
    fontSize: 11,
    bold: true,
    color: "FB4100",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("88%", {
    x: rightX + 0.25,
    y: gapBoxY + 0.45,
    w: 1.2,
    h: 0.35,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText("→", {
    x: rightX + 1.6,
    y: gapBoxY + 0.45,
    w: 0.6,
    h: 0.35,
    fontSize: 28,
    color: "FB4100",
    bold: true,
    align: "center",
    fontFace: "Poppins"
  });

  slide.addText("39%", {
    x: rightX + 2.5,
    y: gapBoxY + 0.45,
    w: 1.7,
    h: 0.35,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText(
    "49-point gap: Deployment rate vs. Enterprise ROI — representing billions in unrealized value",
    {
      x: rightX + 0.25,
      y: gapBoxY + 1.0,
      w: rightBoxWidth - 0.5,
      h: 0.5,
      fontSize: 10,
      color: "A8BECF",
      align: "left",
      fontFace: "Poppins"
    }
  );

  // Quote Box (McKinsey finding)
  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: quoteBoxY,
    w: rightBoxWidth,
    h: 1.3,
    fill: { type: "solid", color: "44546A", transparency: 60 },
    line: { type: "none" }
  });

  slide.addText("McKinsey's Critical Finding", {
    x: rightX + 0.2,
    y: quoteBoxY + 0.12,
    w: rightBoxWidth - 0.4,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText(
    '"Workflow redesign has the biggest effect on an organization\'s ability to see EBIT impact from gen AI"',
    {
      x: rightX + 0.2,
      y: quoteBoxY + 0.35,
      w: rightBoxWidth - 0.4,
      h: 0.8,
      fontSize: 11,
      color: "FFFFFF",
      italic: true,
      align: "left",
      fontFace: "Poppins"
    }
  );

  // Helm Box (solution)
  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: helmBoxY,
    w: rightBoxWidth,
    h: 1.3,
    fill: { type: "solid", color: "01A9DB", transparency: 88 },
    line: { color: "01A9DB", pt: 3, transparency: 25 }
  });

  slide.addText("Helm's Solution", {
    x: rightX + 0.2,
    y: helmBoxY + 0.12,
    w: rightBoxWidth - 0.4,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Poppins"
  });

  slide.addText(
    "Mine/Design/Manage framework closes this gap through systematic workflow redesign + governance infrastructure",
    {
      x: rightX + 0.2,
      y: helmBoxY + 0.35,
      w: rightBoxWidth - 0.4,
      h: 0.8,
      fontSize: 11,
      color: "FFFFFF",
      bold: false,
      align: "left",
      fontFace: "Poppins"
    }
  );

  console.log("[4/6] Added right section (insights)");

  // FOOTER
  slide.addText(
    "High performers 3x more likely to scale agents through executive alignment + organizational commitment",
    {
      x: 0.5,
      y: 6.85,
      w: 5.5,
      h: 0.35,
      fontSize: 10,
      color: "7A8FA3",
      align: "left",
      fontFace: "Poppins"
    }
  );

  slide.addText("McKinsey November 2025\nHelm Strategic Positioning", {
    x: 5.5,
    y: 6.85,
    w: 4,
    h: 0.35,
    fontSize: 10,
    bold: true,
    color: "01A9DB",
    align: "right",
    fontFace: "Poppins"
  });

  console.log("[5/6] Added footer");

  // Save presentation
  const outputPath = path.join(__dirname, "mckinsey-helm-validation-v2.pptx");
  prs.writeFile({ fileName: outputPath });

  console.log(`[6/6] ✅ Saved to: ${outputPath}`);
  console.log("\n🎉 Presentation generated successfully!");
  console.log(
    "📊 One-slide graphic capturing McKinsey's workflow redesign imperative"
  );
  console.log("💡 Key stat: 88% deployment → 39% EBIT impact (49-point gap)");
  console.log("🎯 Validates Helm's Mine/Design/Manage framework positioning");
  console.log("✨ Features professional spacing with grid-based layout");
  console.log(`\nReady to use in investor pitches and sales presentations!\n`);
} catch (error) {
  console.error("Error generating PowerPoint:", error.message);
  console.error("\nMake sure pptxgenjs is installed:");
  console.error("  npm install pptxgenjs\n");
  process.exit(1);
}
