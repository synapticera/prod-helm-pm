#!/usr/bin/env node

/**
 * McKinsey Helm Validation Slide Generator
 * Converts HTML slide to PowerPoint format using html2pptx
 *
 * Usage: node generate-mckinsey-slide.js
 * Output: mckinsey-helm-validation.pptx
 */

const fs = require("fs");
const path = require("path");

// Read the HTML file (use v2 for improved design)
const htmlFile = path.join(__dirname, "mckinsey-helm-validation-v2.html");
const htmlContent = fs.readFileSync(htmlFile, "utf8");

// Extract just the slide content for conversion
const slideHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #07253D 0%, #0a3a5c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }

        .slide {
            width: 1280px;
            height: 720px;
            background: linear-gradient(135deg, #07253D 0%, #0a3a5c 100%);
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            position: relative;
            overflow: hidden;
        }

        .slide::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(1, 169, 219, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        .source {
            font-size: 14px;
            color: #01A9DB;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }

        .title {
            font-size: 48px;
            color: #FFFFFF;
            font-weight: bold;
            line-height: 1.2;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 18px;
            color: #01A9DB;
            font-weight: normal;
        }

        .content {
            display: flex;
            gap: 40px;
            align-items: flex-start;
            position: relative;
            z-index: 1;
            margin-bottom: 30px;
        }

        .left-section {
            flex: 1;
        }

        .right-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .stat-block {
            background: rgba(1, 169, 219, 0.15);
            border-left: 4px solid #01A9DB;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        .stat-number {
            font-size: 42px;
            color: #01A9DB;
            font-weight: bold;
            line-height: 1;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 14px;
            color: #FFFFFF;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-description {
            font-size: 12px;
            color: #B0C4DE;
            line-height: 1.4;
        }

        .gap-visualization {
            background: rgba(251, 65, 0, 0.15);
            border-left: 4px solid #FB4100;
            padding: 25px;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        .gap-label {
            font-size: 12px;
            color: #FB4100;
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .gap-numbers {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 12px;
        }

        .gap-number {
            font-size: 36px;
            color: #FFFFFF;
            font-weight: bold;
        }

        .gap-arrow {
            font-size: 24px;
            color: #FB4100;
        }

        .gap-description {
            font-size: 12px;
            color: #B0C4DE;
            line-height: 1.4;
        }

        .helm-callout {
            background: linear-gradient(135deg, rgba(1, 169, 219, 0.2) 0%, rgba(251, 65, 0, 0.1) 100%);
            border-left: 4px solid #01A9DB;
            padding: 18px;
            border-radius: 4px;
            margin-top: 20px;
        }

        .helm-label {
            font-size: 11px;
            color: #01A9DB;
            font-weight: bold;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }

        .helm-text {
            font-size: 13px;
            color: #FFFFFF;
            font-weight: bold;
            line-height: 1.4;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            border-top: 1px solid rgba(1, 169, 219, 0.3);
            position: relative;
            z-index: 1;
        }

        .footer-left {
            font-size: 12px;
            color: #B0C4DE;
        }

        .footer-right {
            font-size: 12px;
            color: #01A9DB;
            font-weight: bold;
        }

        .key-insight {
            background: rgba(68, 84, 106, 0.6);
            padding: 16px;
            border-radius: 4px;
            margin-top: 10px;
        }

        .key-insight-label {
            font-size: 11px;
            color: #01A9DB;
            font-weight: bold;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }

        .key-insight-text {
            font-size: 12px;
            color: #FFFFFF;
            line-height: 1.4;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <div class="source">MCKINSEY STATE OF AI 2025</div>
            <div class="title">The Workflow Redesign Imperative</div>
            <div class="subtitle">Why 88% Deployment ≠ Enterprise ROI</div>
        </div>

        <div class="content">
            <div class="left-section">
                <div class="stat-block">
                    <div class="stat-number">88%</div>
                    <div class="stat-label">Organizations Using AI</div>
                    <div class="stat-description">Regular AI use in at least one business function (↑10pp from 2024)</div>
                </div>

                <div class="stat-block">
                    <div class="stat-number">23%</div>
                    <div class="stat-label">Scaling Agentic Systems</div>
                    <div class="stat-description">Production-level deployment across functions</div>
                </div>

                <div class="stat-block">
                    <div class="stat-number">39%</div>
                    <div class="stat-label">Experimenting with Agents</div>
                    <div class="stat-description">Pilot phase (most organizations are here)</div>
                </div>
            </div>

            <div class="right-section">
                <div class="gap-visualization">
                    <div class="gap-label">THE BUSINESS IMPACT GAP</div>
                    <div class="gap-numbers">
                        <div class="gap-number">88%</div>
                        <div class="gap-arrow">→</div>
                        <div class="gap-number">39%</div>
                    </div>
                    <div class="gap-description">Deployment Rate vs. Enterprise EBIT Impact Rate — A 49-point gap representing billions in unrealized ROI</div>
                </div>

                <div class="key-insight">
                    <div class="key-insight-label">MCKINSEY'S CRITICAL FINDING</div>
                    <div class="key-insight-text">"Workflow redesign has the biggest effect on an organization's ability to see EBIT impact from gen AI"</div>
                </div>

                <div class="helm-callout">
                    <div class="helm-label">HELM VALIDATION</div>
                    <div class="helm-text">Helm's Mine/Design/Manage framework is built to close this gap: Understand operations → Redesign workflows → Execute with governance → Prove ROI</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footer-left">High performers 3x more likely to scale agents (requires executive alignment + organizational commitment)</div>
            <div class="footer-right">McKinsey November 2025 | Helm Strategic Positioning</div>
        </div>
    </div>
</body>
</html>`;

// Save temporary HTML
const tempHtmlPath = path.join(__dirname, "temp-mckinsey.html");
fs.writeFileSync(tempHtmlPath, slideHTML);
console.log("[1/3] Created temporary HTML file");

// Try to use pptxgenjs if available
try {
  const PptxGenJS = require("pptxgenjs");

  // Create presentation
  const prs = new PptxGenJS();

  // Set slide dimensions (standard 16:9)
  prs.defineLayout({ name: "LAYOUT1", width: 10, height: 5.625 });
  prs.defineLayout({ name: "LAYOUT2", width: 13.333, height: 7.5 });

  // Add blank slide with HTML rendering
  const slide = prs.addSlide();
  slide.background = { color: "07253D" };

  // Add background gradient effect with shapes
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    fill: { type: "solid", color: "0a3a5c", transparency: 0 },
    line: { type: "none" }
  });

  // Add radial gradient accent
  slide.addShape(prs.ShapeType.ellipse, {
    x: 8,
    y: -1,
    w: 4,
    h: 4,
    fill: { type: "solid", color: "01A9DB", transparency: 90 },
    line: { type: "none" }
  });

  // Title
  slide.addText("The Workflow Redesign Imperative", {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.8,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fontFace: "Arial"
  });

  slide.addText("Why 88% Deployment ≠ Enterprise ROI", {
    x: 0.5,
    y: 1.15,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: "01A9DB",
    align: "center",
    fontFace: "Arial"
  });

  slide.addText("MCKINSEY STATE OF AI 2025", {
    x: 0.5,
    y: 0.1,
    w: 9,
    h: 0.25,
    fontSize: 14,
    bold: true,
    color: "01A9DB",
    align: "center",
    fontFace: "Arial"
  });

  // Left section stats
  const leftX = 0.5;
  const statWidth = 4;
  const statHeight = 1.2;

  // Stat 1: 88%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: 1.8,
    w: statWidth,
    h: statHeight,
    fill: { type: "solid", color: "01A9DB", transparency: 85 },
    line: { color: "01A9DB", pt: 2 }
  });

  slide.addText("88%", {
    x: leftX + 0.2,
    y: 1.95,
    w: statWidth - 0.4,
    h: 0.5,
    fontSize: 42,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("Organizations Using AI", {
    x: leftX + 0.2,
    y: 2.5,
    w: statWidth - 0.4,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("Regular AI use in at least one business function", {
    x: leftX + 0.2,
    y: 2.8,
    w: statWidth - 0.4,
    h: 0.3,
    fontSize: 10,
    color: "B0C4DE",
    align: "left",
    fontFace: "Arial"
  });

  // Stat 2: 23%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: 3.15,
    w: statWidth,
    h: statHeight,
    fill: { type: "solid", color: "01A9DB", transparency: 85 },
    line: { color: "01A9DB", pt: 2 }
  });

  slide.addText("23%", {
    x: leftX + 0.2,
    y: 3.3,
    w: statWidth - 0.4,
    h: 0.5,
    fontSize: 42,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("Scaling Agentic Systems", {
    x: leftX + 0.2,
    y: 3.85,
    w: statWidth - 0.4,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Arial"
  });

  // Stat 3: 39%
  slide.addShape(prs.ShapeType.rect, {
    x: leftX,
    y: 4.5,
    w: statWidth,
    h: statHeight,
    fill: { type: "solid", color: "01A9DB", transparency: 85 },
    line: { color: "01A9DB", pt: 2 }
  });

  slide.addText("39%", {
    x: leftX + 0.2,
    y: 4.65,
    w: statWidth - 0.4,
    h: 0.5,
    fontSize: 42,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("Experimenting with Agents", {
    x: leftX + 0.2,
    y: 5.2,
    w: statWidth - 0.4,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Arial"
  });

  // Right section: The Gap
  const rightX = 5.2;
  const rightWidth = 4.3;

  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: 1.8,
    w: rightWidth,
    h: 1.5,
    fill: { type: "solid", color: "FB4100", transparency: 85 },
    line: { color: "FB4100", pt: 2 }
  });

  slide.addText("THE BUSINESS IMPACT GAP", {
    x: rightX + 0.2,
    y: 1.9,
    w: rightWidth - 0.4,
    h: 0.2,
    fontSize: 11,
    bold: true,
    color: "FB4100",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("88% → 39%", {
    x: rightX + 0.2,
    y: 2.15,
    w: rightWidth - 0.4,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: "FFFFFF",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText("Deployment Rate vs. Enterprise EBIT Impact — A 49-point gap", {
    x: rightX + 0.2,
    y: 2.85,
    w: rightWidth - 0.4,
    h: 0.4,
    fontSize: 10,
    color: "B0C4DE",
    align: "left",
    fontFace: "Arial"
  });

  // Key Insight
  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: 3.45,
    w: rightWidth,
    h: 0.85,
    fill: { type: "solid", color: "445A6A", transparency: 40 },
    line: { type: "none" }
  });

  slide.addText("MCKINSEY'S CRITICAL FINDING", {
    x: rightX + 0.15,
    y: 3.5,
    w: rightWidth - 0.3,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText(
    '"Workflow redesign has the biggest effect on EBIT impact from gen AI"',
    {
      x: rightX + 0.15,
      y: 3.72,
      w: rightWidth - 0.3,
      h: 0.5,
      fontSize: 11,
      color: "FFFFFF",
      italic: true,
      align: "left",
      fontFace: "Arial"
    }
  );

  // Helm Callout
  slide.addShape(prs.ShapeType.rect, {
    x: rightX,
    y: 4.4,
    w: rightWidth,
    h: 1.0,
    fill: { type: "solid", color: "01A9DB", transparency: 80 },
    line: { color: "01A9DB", pt: 2 }
  });

  slide.addText("HELM VALIDATION", {
    x: rightX + 0.15,
    y: 4.45,
    w: rightWidth - 0.3,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: "01A9DB",
    align: "left",
    fontFace: "Arial"
  });

  slide.addText(
    "Helm closes this gap: Understand → Redesign → Execute → Prove ROI",
    {
      x: rightX + 0.15,
      y: 4.68,
      w: rightWidth - 0.3,
      h: 0.65,
      fontSize: 11,
      bold: true,
      color: "FFFFFF",
      align: "left",
      fontFace: "Arial"
    }
  );

  // Footer
  slide.addText(
    "High performers 3x more likely to scale agents | McKinsey November 2025",
    {
      x: 0.5,
      y: 5.35,
      w: 9,
      h: 0.2,
      fontSize: 10,
      color: "B0C4DE",
      align: "center",
      fontFace: "Arial"
    }
  );

  // Save presentation
  const outputPath = path.join(__dirname, "mckinsey-helm-validation.pptx");
  if (typeof prs.writeFile === "function") {
    prs.writeFile(outputPath);
  } else if (typeof prs.save === "function") {
    prs.save({ outputPath });
  } else {
    // Try alternative method
    const stream = fs.createWriteStream(outputPath);
    prs.stream(stream);
  }

  console.log("[2/3] Generated PowerPoint slide");
  console.log(`[3/3] ✅ Saved to: ${outputPath}`);
  console.log("\nSlide created successfully!");
  console.log(
    "📊 One-slide graphic capturing McKinsey's workflow redesign imperative"
  );
  console.log("💡 Key stat: 88% deployment → 39% EBIT impact (49-point gap)");
  console.log("🎯 Validates Helm's Mine/Design/Manage framework positioning\n");
} catch (error) {
  console.error("Error generating PowerPoint:", error.message);
  console.log("\nFallback: HTML version saved at:", tempHtmlPath);
  console.log("You can manually convert this HTML to PowerPoint using:");
  console.log("  - Open in browser and save as PDF");
  console.log("  - Use html2pptx online converter");
  console.log('  - Or use "Save as Slide" from browser print dialog\n');
}

// Clean up temp file
setTimeout(() => {
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}, 1000);
