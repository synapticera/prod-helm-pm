const pptxgen = require("pptxgenjs");
const html2pptx = require("/Users/wkarp/devlocal/prod-miner-pm/.claude/skills/x:pptx/scripts/html2pptx");
const path = require("path");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Strategic Analysis";
  pptx.title = "Strategic Path Analysis: Services + Product Decision Framework";
  pptx.subject = "Business Strategy";

  const slidesDir = path.join(__dirname, "slides");

  const slides = [
    "slide01-title.html",
    "slide02-exec-summary.html",
    "slide03-market-context.html",
    "slide04-path1-lean.html",
    "slide05-path2-liquidate.html",
    "slide06-path3-growth.html",
    "slide07-path4-strategic.html",
    "slide08-risk-analysis.html",
    "slide09-ev-comparison.html",
    "slide10-roadmap.html",
    "slide11-closing.html"
  ];

  for (const slideFile of slides) {
    const htmlPath = path.join(slidesDir, slideFile);
    console.log(`Processing: ${slideFile}`);
    await html2pptx(htmlPath, pptx);
  }

  const outputPath = path.join(__dirname, "strategy-path-analysis.pptx");
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Presentation created: ${outputPath}`);
}

createPresentation().catch(console.error);
