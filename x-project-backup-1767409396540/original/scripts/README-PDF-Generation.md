# PDF Generation with Table of Contents

## Overview
The Healthcare Sales Reference Guide PDF is now generated with a proper **Table of Contents** that appears in Mac Preview's sidebar.

## Generated PDF Features
- ✅ **Clickable Table of Contents** with 3 levels of depth
- ✅ **Bookmarks/Outline** visible in Mac Preview sidebar
- ✅ **Professional formatting** with proper margins and fonts
- ✅ **Hyperlinked sections** for easy navigation
- ✅ **Compact file size** (~169KB vs 754KB from previous method)

## Viewing the Table of Contents in Mac Preview

1. Open `Healthcare-Sales-Reference.pdf` in **Preview**
2. Enable the sidebar:
   - **Menu**: View → Table of Contents
   - **Keyboard**: `⌘⌥3` (Command + Option + 3)
3. The sidebar will display all **8 sections** with clickable subsections

## Regenerating the PDF

### Option 1: Use the Shell Script (Recommended)
```bash
./scripts/generate_pdf_with_toc.sh
```

### Option 2: Use Pandoc Directly
```bash
/opt/homebrew/bin/pandoc \
  outputdocs/Healthcare-Sales-Reference.md \
  -o outputdocs/Healthcare-Sales-Reference.pdf \
  --pdf-engine=/Library/TeX/texbin/pdflatex \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article
```

### Option 3: Use Node.js Script (Legacy - No TOC)
```bash
node scripts/convert_md_to_pdf.js
```
**Note**: This method generates a styled PDF but does NOT include Table of Contents bookmarks.

## Requirements

### Installed Software
- **Pandoc**: `/opt/homebrew/bin/pandoc`
  - Install: `brew install pandoc`
- **BasicTeX** (for pdflatex): `/Library/TeX/texbin/pdflatex`
  - Install: `brew install --cask basictex`

### Node.js Dependencies (for legacy method)
- `md-to-pdf`
- `pdf-lib`

Install with: `npm install`

## Document Structure

The PDF includes these major sections:
1. **Executive Summary** - Market opportunity and ROI metrics
2. **Market Primer: Process Mining** - Technology overview and players
3. **Market Primer: Task Mining** - Desktop monitoring and automation
4. **Market Primer: Salesforce Org Analysis** - Configuration optimization
5. **Healthcare-Specific Considerations** - Payer, Provider, MedTech, Pharma, Life Sciences
6. **Synaptic Differentiation** - EVOLVE unique value propositions
7. **Probing Prospect Questions** - Sales conversation starters
8. **Top Industry Challenges & Issues (2025)** - Digital transformation, AI adoption, Salesforce issues

### Section 8 Details (105 Specific Issues)
- **A. Digital Transformation** - 7 segments × 5 issues each
- **B. AI Agent Adoption** - 7 segments × 5 issues each
- **C. Salesforce in HLS** - 7 segments × 5 issues each

## File Locations

| File | Purpose |
|------|---------|
| `outputdocs/Healthcare-Sales-Reference.md` | Source markdown document |
| `outputdocs/Healthcare-Sales-Reference.pdf` | **Current PDF with TOC** |
| `outputdocs/Healthcare-Sales-Reference-Outline.md` | Document structure outline |
| `scripts/generate_pdf_with_toc.sh` | Shell script for PDF generation |
| `scripts/convert_md_to_pdf.js` | Node.js legacy generator (no TOC) |

## Archives

Previous versions are stored in `outputdocs/archive/`:
- `Healthcare-Sales-Reference_v1.md` / `.pdf` - Original version
- `Healthcare-Sales-Reference_v2.pdf` - Enhanced with market data
- `Healthcare-Sales-Reference_v3_no-toc.pdf` - Before TOC implementation

## Troubleshooting

### "pdflatex not found"
BasicTeX may not be in your PATH. Use the full path:
```bash
export PATH="/Library/TeX/texbin:$PATH"
```

### "pandoc not found"
Install pandoc via Homebrew:
```bash
brew install pandoc
```

### TOC not showing in Preview
1. Ensure you're using the pandoc-generated PDF (169KB)
2. Try: View → Table of Contents (⌘⌥3)
3. If still not visible, the PDF may need regeneration

### PDF looks different
The pandoc version uses LaTeX formatting which differs from the HTML-based md-to-pdf rendering:
- **Pandoc/LaTeX**: More academic, compact, proper bookmarks
- **md-to-pdf**: More styled, larger file, no bookmarks

## Technical Notes

**Why Two Methods?**
- **Pandoc + LaTeX**: Required for PDF bookmarks/outlines that Mac Preview recognizes
- **md-to-pdf**: Provides more styling control but lacks bookmark support

**PDF Bookmark Standards**
Mac Preview reads PDF outline/bookmark structures following the PDF specification. LaTeX-generated PDFs (via pandoc) automatically include proper outline structures based on document hierarchy (`\section`, `\subsection`, etc.).

**Future Improvements**
Consider using:
- `pdf-lib` post-processing to add custom bookmarks
- Alternative engines like WeasyPrint (Python-based)
- Native PDF generation with outline support libraries

---

**Last Updated**: November 2025
**Generated With**: Pandoc 3.8.1 + BasicTeX (pdflatex)
