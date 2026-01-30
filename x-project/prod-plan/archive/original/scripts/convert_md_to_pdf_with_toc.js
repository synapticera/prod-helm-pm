const { mdToPdf } = require("md-to-pdf");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs").promises;
const path = require("path");

async function extractHeadings(markdownPath) {
  const content = await fs.readFile(markdownPath, "utf-8");
  const headings = [];
  const lines = content.split("\n");

  let pageEstimate = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match markdown headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();

      headings.push({
        level,
        title,
        page: Math.floor(pageEstimate)
      });
    }

    // Rough page estimation (very approximate)
    if (line.length > 0) {
      pageEstimate += 0.015; // Rough estimate: ~66 lines per page
    }
    if (line.match(/^[-*]\s/)) {
      // Bullet points
      pageEstimate += 0.015;
    }
  }

  return headings;
}

async function generatePdfWithOutline() {
  const inputFile = path.join(
    __dirname,
    "../outputdocs/Healthcare-Sales-Reference.md"
  );
  const tempPdfFile = path.join(
    __dirname,
    "../outputdocs/Healthcare-Sales-Reference-temp.pdf"
  );
  const outputFile = path.join(
    __dirname,
    "../outputdocs/Healthcare-Sales-Reference.pdf"
  );

  try {
    console.log("Step 1: Extracting headings from markdown...");
    const headings = await extractHeadings(inputFile);
    console.log(`Found ${headings.length} headings`);

    console.log("Step 2: Generating base PDF...");
    const pdf = await mdToPdf(
      { path: inputFile },
      {
        dest: tempPdfFile,
        pdf_options: {
          format: "Letter",
          margin: {
            top: "20mm",
            right: "20mm",
            bottom: "20mm",
            left: "20mm"
          },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: "<div></div>",
          footerTemplate:
            '<div style="font-size: 9px; text-align: center; width: 100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        },
        style: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
          }
          h1 {
            color: #203864;
            border-bottom: 3px solid #203864;
            padding-bottom: 10px;
            margin-top: 30px;
            page-break-before: always;
          }
          h1:first-of-type {
            page-break-before: avoid;
          }
          h2 {
            color: #4472C4;
            border-bottom: 2px solid #4472C4;
            padding-bottom: 5px;
            margin-top: 25px;
          }
          h3 {
            color: #70AD47;
            margin-top: 20px;
          }
          h4 {
            color: #FFC000;
            margin-top: 15px;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }
          pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
          }
          blockquote {
            border-left: 4px solid #4472C4;
            padding-left: 15px;
            margin-left: 0;
            color: #666;
            font-style: italic;
          }
          ul, ol {
            padding-left: 25px;
          }
          li {
            margin-bottom: 5px;
          }
          hr {
            border: none;
            border-top: 2px solid #ddd;
            margin: 30px 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #203864;
            color: white;
          }
          strong {
            color: #203864;
          }
        `
      }
    );

    console.log("Step 3: Loading PDF for outline modification...");
    const pdfBytes = await fs.readFile(tempPdfFile);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Note: pdf-lib doesn't fully support PDF outlines yet, but we can add metadata
    // that helps with navigation. For full outline support, we'd need a different approach.

    pdfDoc.setTitle("Healthcare Sales Reference Guide");
    pdfDoc.setSubject(
      "Process Mining, Task Mining, and Salesforce Org Analysis for Healthcare"
    );
    pdfDoc.setKeywords([
      "Healthcare",
      "Sales",
      "Process Mining",
      "Task Mining",
      "Salesforce",
      "Digital Transformation"
    ]);
    pdfDoc.setAuthor("Synaptic Advisory / EVOLVE Platform");
    pdfDoc.setProducer("EVOLVE Document Generator");
    pdfDoc.setCreator("Claude Code via md-to-pdf");

    console.log("Step 4: Saving final PDF...");
    const finalPdfBytes = await pdfDoc.save();
    await fs.writeFile(outputFile, finalPdfBytes);

    // Clean up temp file
    await fs.unlink(tempPdfFile);

    console.log(
      "✓ PDF generated successfully with metadata: Healthcare-Sales-Reference.pdf"
    );
    console.log(`  - ${pdfDoc.getPageCount()} pages`);
    console.log(`  - ${headings.length} headings indexed`);
    console.log("");
    console.log(
      "Note: For full Table of Contents support in Mac Preview, consider using:"
    );
    console.log(
      "  pandoc outputdocs/Healthcare-Sales-Reference.md -o outputdocs/Healthcare-Sales-Reference.pdf --toc --pdf-engine=wkhtmltopdf"
    );
    console.log(
      "  (requires wkhtmltopdf installation: brew install wkhtmltopdf)"
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
    process.exit(1);
  }
}

generatePdfWithOutline();
