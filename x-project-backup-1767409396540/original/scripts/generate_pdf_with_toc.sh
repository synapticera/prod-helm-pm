#!/bin/bash

# Healthcare Sales Reference PDF Generator with Table of Contents
# Generates a PDF with proper bookmarks that appear in Mac Preview's sidebar

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
MD_FILE="$PROJECT_ROOT/outputdocs/Healthcare-Sales-Reference.md"
PDF_FILE="$PROJECT_ROOT/outputdocs/Healthcare-Sales-Reference.pdf"
PANDOC="/opt/homebrew/bin/pandoc"
PDFLATEX="/Library/TeX/texbin/pdflatex"

echo "Healthcare Sales Reference PDF Generator"
echo "========================================"
echo ""

# Check if markdown file exists
if [ ! -f "$MD_FILE" ]; then
  echo "Error: Markdown file not found at $MD_FILE"
  exit 1
fi

# Check if pandoc exists
if [ ! -f "$PANDOC" ]; then
  echo "Error: pandoc not found at $PANDOC"
  echo "Install with: brew install pandoc"
  exit 1
fi

# Check if pdflatex exists
if [ ! -f "$PDFLATEX" ]; then
  echo "Error: pdflatex not found at $PDFLATEX"
  echo "Install with: brew install --cask basictex"
  exit 1
fi

echo "Input:  $MD_FILE"
echo "Output: $PDF_FILE"
echo ""
echo "Generating PDF with Table of Contents..."

$PANDOC "$MD_FILE" \
  -o "$PDF_FILE" \
  --pdf-engine="$PDFLATEX" \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article \
  -V colorlinks=true \
  -V linkcolor=blue \
  -V urlcolor=blue \
  -V toccolor=black

if [ $? -eq 0 ]; then
  SIZE=$(du -h "$PDF_FILE" | cut -f1)
  echo ""
  echo "✓ PDF generated successfully!"
  echo "  File: $PDF_FILE"
  echo "  Size: $SIZE"
  echo ""
  echo "To view the Table of Contents in Mac Preview:"
  echo "  1. Open the PDF in Preview"
  echo "  2. Click View > Table of Contents (or press ⌘⌥3)"
  echo "  3. The sidebar will show all sections and subsections"
else
  echo ""
  echo "✗ Error generating PDF"
  exit 1
fi
