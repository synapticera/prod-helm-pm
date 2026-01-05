const { mdToPdf } = require('md-to-pdf');
const path = require('path');

async function convertToPdf() {
  const inputFile = path.join(__dirname, '../outputdocs/Healthcare-Sales-Reference.md');
  const outputFile = path.join(__dirname, '../outputdocs/Healthcare-Sales-Reference.pdf');

  try {
    console.log('Converting markdown to PDF...');

    const pdf = await mdToPdf(
      { path: inputFile },
      {
        dest: outputFile,
        pdf_options: {
          format: 'Letter',
          margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
          },
          printBackground: true
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

    console.log('✓ PDF generated successfully: Healthcare-Sales-Reference.pdf');
  } catch (error) {
    console.error('Error converting to PDF:', error);
    process.exit(1);
  }
}

convertToPdf();
