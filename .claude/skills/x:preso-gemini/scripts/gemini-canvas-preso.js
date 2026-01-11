#!/usr/bin/env node
/**
 * Gemini Canvas Presentation Generator
 *
 * NOTE: This script is provided as a backup/alternative to Claude for Chrome automation.
 * The primary workflow uses Claude for Chrome browser automation (see SKILL.md).
 *
 * This script uses Playwright for standalone execution when Claude for Chrome isn't available.
 *
 * Usage: node gemini-canvas-preso.js <input-file> [presentation-name]
 *
 * Prerequisites:
 * - npm install playwright
 * - Logged into Google account in Chrome profile
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

// Configuration
const GEMINI_URL = "https://gemini.google.com/app";
const GENERATION_TIMEOUT = 120000; // 2 minutes
const POLL_INTERVAL = 5000; // 5 seconds

// Synaptic Brand Colors
const SYNAPTIC_BRAND = {
  primaryBlue: "#01A9DB", // Accent elements, divider lines, icons
  orange: "#FB4100", // Highlights, key metrics, CTAs
  darkNavy: "#07253D", // Headings, titles
  darkGrayBlue: "#44546A", // Body text
  white: "#FFFFFF", // Backgrounds
  font: "Poppins" // Primary font (Arial fallback)
};

// Selectors (may need updates as Gemini UI changes)
const SELECTORS = {
  toolsButton:
    '[aria-label="Tools"], button:has-text("Tools"), [data-testid="tools-button"]',
  canvasOption: 'text="Canvas", [data-testid="canvas-option"]',
  attachmentButton:
    '[aria-label="Add file"], [aria-label="Attach"], button[aria-label*="file"]',
  fileInput: 'input[type="file"]',
  promptInput:
    '.ql-editor, [contenteditable="true"], textarea[aria-label*="prompt"]',
  sendButton:
    '[aria-label="Send"], button[type="submit"], button:has-text("Send")',
  slidesContainer:
    '[data-testid="canvas-slides"], .slides-preview, .canvas-output',
  exportButton: 'button:has-text("Export to Slides"), [aria-label*="Export"]',
  openSlidesLink: 'text="Open Slides", a[href*="docs.google.com/presentation"]',
  slideCount: "text=/Slide \\d+ of \\d+/"
};

async function generatePresentation(inputFile, presentationName) {
  // Validate input file
  const absolutePath = path.resolve(inputFile);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const ext = path.extname(inputFile).toLowerCase();
  if (![".pdf", ".md", ".txt", ".docx"].includes(ext)) {
    throw new Error(
      `Unsupported file type: ${ext}. Supported: pdf, md, txt, docx`
    );
  }

  const name = presentationName || path.basename(inputFile, ext);
  console.log(`Generating presentation: "${name}" from ${inputFile}`);
  console.log(
    `Applying Synaptic branding: ${SYNAPTIC_BRAND.primaryBlue}, ${SYNAPTIC_BRAND.orange}`
  );

  // Launch browser with persistent context (to use existing login)
  const userDataDir = path.join(
    process.env.HOME,
    ".config/chromium-gemini-profile"
  );
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Must be visible for Canvas interaction
    viewport: { width: 1400, height: 900 },
    args: ["--disable-blink-features=AutomationControlled"]
  });

  const page = browser.pages()[0] || (await browser.newPage());

  try {
    // Navigate to Gemini
    console.log("Navigating to Gemini...");
    await page.goto(GEMINI_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    // Check if logged in
    const isLoggedIn = (await page.locator('text="Sign in"').count()) === 0;
    if (!isLoggedIn) {
      console.log("Please log in to your Google account...");
      await page.waitForURL("**/app**", { timeout: 300000 }); // Wait up to 5 min for login
    }

    // CRITICAL: Select Canvas tool BEFORE entering prompt
    console.log("Selecting Canvas tool...");
    try {
      await page.click(SELECTORS.toolsButton);
      await page.waitForTimeout(1000);
      await page.click(SELECTORS.canvasOption);
      await page.waitForTimeout(2000);
      console.log("Canvas tool selected");
    } catch (e) {
      console.log("Could not find Tools menu, trying direct Canvas button...");
      await page.click('[aria-label="Canvas"], button:has-text("Canvas")');
      await page.waitForTimeout(2000);
    }

    // Read document content if markdown
    let documentContent = "";
    if (ext === ".md" || ext === ".txt") {
      documentContent = fs.readFileSync(absolutePath, "utf-8");
      // Truncate to ~3000 chars for prompt
      if (documentContent.length > 3000) {
        documentContent =
          documentContent.substring(0, 3000) + "\n\n[Content truncated...]";
      }
    }

    // Build prompt with Synaptic branding
    const prompt = buildBrandedPrompt(name, ext, documentContent);
    console.log("Entering branded prompt...");

    // Use JavaScript to set content in Quill editor
    await page.evaluate((promptText) => {
      const editor = document.querySelector(".ql-editor");
      if (editor) {
        editor.focus();
        editor.innerText = promptText;
        editor.classList.remove("ql-blank");
        editor.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, prompt);
    await page.waitForTimeout(1000);

    // If we have a file to upload (PDF, DOCX), handle that
    if (ext === ".pdf" || ext === ".docx") {
      console.log(`Uploading file: ${absolutePath}`);
      try {
        await page.click(SELECTORS.attachmentButton);
        await page.waitForTimeout(1000);
        const fileInput = await page.locator(SELECTORS.fileInput);
        await fileInput.setInputFiles(absolutePath);
        await page.waitForTimeout(3000);
      } catch (e) {
        console.log(
          "File upload not available, proceeding with text prompt only"
        );
      }
    }

    // Submit
    console.log("Generating presentation...");
    await page.keyboard.press("Enter");
    // Or try clicking send button
    // await page.click(SELECTORS.sendButton);

    // Wait for generation to complete
    console.log("Waiting for Canvas generation (up to 2 minutes)...");
    let generated = false;
    const startTime = Date.now();

    while (!generated && Date.now() - startTime < GENERATION_TIMEOUT) {
      await page.waitForTimeout(POLL_INTERVAL);

      // Check for slide count indicator
      const slideCount = await page.locator(SELECTORS.slideCount).count();
      const exportButton = await page.locator(SELECTORS.exportButton).count();

      if (slideCount > 0 || exportButton > 0) {
        generated = true;
        console.log("Slides generated!");
      } else {
        console.log(
          `  Still generating... (${Math.round((Date.now() - startTime) / 1000)}s)`
        );
      }
    }

    if (!generated) {
      throw new Error("Generation timed out after 2 minutes");
    }

    // Export to Google Slides
    console.log("Exporting to Google Slides...");
    await page.click(SELECTORS.exportButton);
    await page.waitForTimeout(3000);

    // Try to get the Google Slides URL
    let slidesUrl = null;
    try {
      await page.click(SELECTORS.openSlidesLink);
      await page.waitForTimeout(2000);

      // Get URL from new tab/page
      const pages = browser.pages();
      for (const p of pages) {
        const url = p.url();
        if (url.includes("docs.google.com/presentation")) {
          slidesUrl = url;
          break;
        }
      }
    } catch (e) {
      console.log("Could not auto-open Slides link");
    }

    console.log("\n✅ Presentation generated successfully!");
    console.log(`🎨 Branding: Synaptic colors applied`);
    if (slidesUrl) {
      console.log(`📊 Google Slides URL: ${slidesUrl}`);
    } else {
      console.log("📊 Check browser for Google Slides link");
    }

    // Keep browser open for user to review
    console.log(
      "\nBrowser will remain open for review. Close manually when done."
    );

    return {
      success: true,
      name: name,
      slidesUrl: slidesUrl,
      sourceFile: absolutePath,
      branding: "Synaptic"
    };
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.log("\nTroubleshooting:");
    console.log("1. Ensure you are logged into Google");
    console.log("2. Check if Canvas tool is selected (Tools menu)");
    console.log("3. Try a smaller file if upload fails");
    console.log("4. Consider using Claude for Chrome automation instead");

    return {
      success: false,
      error: error.message
    };
  }
}

function buildBrandedPrompt(name, fileExtension, documentContent = "") {
  const brandingSection = `## Branding Requirements (IMPORTANT)
Apply these exact brand colors throughout ALL slides:
- Primary accent color: ${SYNAPTIC_BRAND.primaryBlue} (cyan blue) - for divider lines, icons, accent shapes
- Highlight color: ${SYNAPTIC_BRAND.orange} (orange) - for key metrics, call-to-action elements, important numbers
- Heading text: ${SYNAPTIC_BRAND.darkNavy} (dark navy) - for all slide titles
- Body text: ${SYNAPTIC_BRAND.darkGrayBlue} (dark gray-blue) - for body content
- Background: White with clean, professional layout
- Use ${SYNAPTIC_BRAND.font} or Arial font throughout`;

  const basePrompt = `Create a professional board-ready presentation titled "${name}"

${brandingSection}

## Design Requirements
- Clean visual hierarchy with plenty of white space
- 10-15 slides maximum
- Start with a title slide
- Include an executive summary on slide 2
- Bullet points, not paragraphs
- Data visualizations where relevant
- Clear section dividers between major topics
- End with conclusions and next steps
- Use the brand colors consistently throughout`;

  // Add document content if available
  let contentSection = "";
  if (documentContent) {
    contentSection = `\n\n## Document Content\n${documentContent}`;
  }

  // Add file-type specific hints
  const hints = {
    ".pdf":
      "\n\nNote: Extract key sections from this PDF document and apply branding.",
    ".md": "\n\nNote: Use the markdown headers as slide sections.",
    ".txt": "\n\nNote: Organize this text content into logical slide sections.",
    ".docx": "\n\nNote: Preserve the document structure in the presentation."
  };

  return basePrompt + contentSection + (hints[fileExtension] || "");
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "Gemini Canvas Presentation Generator (with Synaptic Branding)"
    );
    console.log("");
    console.log(
      "Usage: node gemini-canvas-preso.js <input-file> [presentation-name]"
    );
    console.log("");
    console.log("Examples:");
    console.log("  node gemini-canvas-preso.js report.pdf");
    console.log('  node gemini-canvas-preso.js notes.md "Project Overview"');
    console.log("");
    console.log("Note: Primary workflow uses Claude for Chrome. See SKILL.md");
    process.exit(1);
  }

  const inputFile = args[0];
  const presentationName = args.slice(1).join(" ") || undefined;

  generatePresentation(inputFile, presentationName)
    .then((result) => {
      if (!result.success) {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("Fatal error:", err);
      process.exit(1);
    });
}

module.exports = { generatePresentation, buildBrandedPrompt, SYNAPTIC_BRAND };
