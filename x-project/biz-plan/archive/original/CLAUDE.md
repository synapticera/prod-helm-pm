# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **business planning repository** for the Synaptic EVOLVE project. The primary purpose is to generate financial planning models and documents for the business plan.

Key directories:

- `./inputdocs/` - Source business plan documents (bplan-v3.md, pitch-deck.md, smb-research.md) THESE FILES ARE READ ONLY.
- `./examples/` - Example presentations for styling reference
- `./scripts/` - Document generation scripts (JS)
- `./outputdocs/` - Generated outputs (Excel models, PowerPoint presentations) THIS IS WHERE THE GENERATED DELIVERABLES GO
- `./synspec/` - Task management system (Python-based, for future development)
- Root directory - PowerPoint generation scripts (Python)

## PowerPoint Pitch Deck Generation

### Primary Script

**`create_pitchdeck.py`** - Generates the EVOLVE investor pitch deck from markdown source

To generate the pitch deck:

```bash
source .venv/bin/activate
python create_pitchdeck.py
```

This creates `EVOLVE-PitchDeck.pptx` with:

- 22 slides covering all pitch deck content
- Styling extracted from `examples/Synaptic-BODMeeting-2025-10-23-MgmtSession.pptx`
- Poppins font family (from example)
- Compact formatting: 28pt titles, 16pt/14pt/12pt body text (by level)
- Tight spacing: 2pt between bullets, 12pt before section headers
- Body text positioned 0.5" higher than default for more content space

### Dependencies

PowerPoint generation requires Python virtual environment with python-pptx:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install python-pptx
```

### Content Source

The script reads content from `inputdocs/pitch-deck.md` and structures it into:

- **Title slides** - Cover and closing slides
- **Content slides** - Bullet point slides with hierarchical levels
- **Table slides** - Comparison tables (Tesla Parallel, Competitive Landscape, Unit Economics, etc.)

### Slide Structure (22 Slides)

1. Title (EVOLVE)
2. The Problem
3. The EVOLVE Solution
4. The Tesla Parallel (table)
5. Market Opportunity
6. Why We Win
7. Competitive Landscape (table)
8. Business Model
9. Unit Economics (table)
10. Go-to-Market Strategy
11. Product Roadmap
12. Traction & Milestones (table)
13. Financial Projections (table)
14. Why Network Effects Win
15. The Team
16. The Ask
17. Exit Potential
18. Why Now
19. Investment Thesis
20. The Vision
21. Contact & Next Steps
22. Thank You

### Formatting Details

The script applies these formatting rules to prevent text overflow:

**Font Sizes:**

- Titles: 28pt
- Level 0 bullets (section headers): 16pt
- Level 1 bullets (details): 14pt
- Level 2 bullets (sub-details): 12pt
- Table headers: 12pt
- Table cells: 11pt

**Spacing:**

- Space before level 0 bullets: 12pt (section separation)
- Space before/after other bullets: 2pt
- Line spacing: 1.0 (no extra leading)
- Body text area: Moved up 0.5" from default position

**Text Shortening:**
Content is abbreviated where needed (e.g., "Mo" for "Month", "150K" for "150,000") to prevent wrapping and keep text on single lines.

### Styling Extraction

The script uses the example presentation (`examples/Synaptic-BODMeeting-2025-10-23-MgmtSession.pptx`) as a template to:

- Use existing slide layouts (14 layouts available)
- Extract theme colors and fonts (Poppins font detected)
- Maintain visual consistency with existing Synaptic presentations

### Modifying Content

To update the pitch deck:

1. Edit `inputdocs/pitch-deck.md` (source content) OR
2. Edit the slide data in `create_pitchdeck.py` (around line 163, in `parse_markdown_content()` function)
3. Run `python create_pitchdeck.py` (with venv activated)
4. Output: `EVOLVE-PitchDeck.pptx` in root directory

**Important Technical Notes:**

- The script has a known quirk with python-pptx where modifying the `top` position of placeholders resets the `left` position. The code explicitly saves and restores `left`, `width`, and `height` after adjusting `top` to prevent the body text area from disappearing (see lines 80-90 in create_pitchdeck.py).
- The virtual environment (`.venv/`) is required because macOS systems have externally-managed Python environments that don't allow global pip installs.

## Expense Model Generation

### Primary Scripts

The repository contains several iterations of expense model generators. The **current/final version** is:

**`scripts/generate_final_model.js`** - Generates the comprehensive expense planning model

To generate the expense model:

```bash
node scripts/generate_final_model.js
```

This creates `outputdocs/EVOLVE_Expense_Model_FINAL.xlsx` with:

- 24-month planning horizon (Jan 2026 - Dec 2027)
- Formula-based calculations (all values update automatically)
- Assumption-driven model (Annual Salaries, Start Months, Growth Rates visible as columns)
- Quarterly and yearly totals
- Excel grouping/outlining on "All Detail" sheet

### Previous Iterations (Historical Context)

All expense model scripts are located in the `./scripts/` directory:

- `scripts/generate_expense_model.js` - Initial 18-month model (hard-coded values)
- `scripts/generate_expense_model_v2.js` - First formula-based version
- `scripts/generate_formula_model.js` - Intermediate version with formulas
- `scripts/generate_final_model_fixed.js` - Fixed version
- `scripts/generate_final_model.js` - **Current version** with assumptions as editable columns
- `scripts/generate_revenue_model.js` - Revenue model generator

### Key Dependencies

The model generation requires:

```bash
npm install exceljs
```

All generators use the `exceljs` library to create Excel workbooks programmatically with formulas, formatting, and grouping.

## Excel Model Architecture

### Data Structure

Each expense model generator defines data arrays at the top:

- `headcountData[]` - Roles with annual salaries and start months
- `infrastructureData[]` - Infrastructure expenses with base amounts, growth rates, and notes
- `goToMarketData[]` - Marketing/sales expenses with base amounts, growth rates, and notes
- `rdExpensesData[]` - R&D expenses with base amounts, growth rates, and notes

### Sheet Structure

Generated workbooks contain:

1. **Executive Summary** - High-level category rollup (pulls from detail sheets)
2. **All Detail** - Comprehensive view with Excel grouping (collapsible sections)
3. **Headcount Detail** - Salary assumptions → monthly calculations
4. **Infrastructure Detail** - Base amounts + growth rates → monthly escalation
5. **Go-to-Market Detail** - Marketing expenses with growth trajectories
6. **R&D Detail** - Research/development expenses with growth

### Formula Pattern

All detail sheets follow this pattern:

- **Assumption columns** (A-D): Editable inputs (red text indicates editable)
- **Monthly columns** (E-AB): Formulas referencing assumptions
- **Quarterly columns**: SUM formulas over 3-month periods
- **Yearly columns**: SUM of quarterly totals
- **Grand Total**: Sum of both years

Example formulas:

- Headcount monthly: `=IF(month>=C2,B2/12,0)` (if hired, show monthly salary)
- Expenses monthly: `=B4*POWER(1+C4,month-1)` (base × growth^month)
- Benefits: `=E29*0.35` (35% of base salaries)

### Modifying Assumptions

To change planning assumptions:

1. Open `scripts/generate_final_model.js`
2. Edit data arrays at top of file (salaries, growth rates, base amounts)
3. Run `node scripts/generate_final_model.js`
4. Open generated `outputdocs/EVOLVE_Expense_Model_FINAL.xlsx`

Alternatively, edit the Excel file directly in `outputdocs/` - all formulas reference assumption columns, so changes propagate automatically.

## SynSpec Task Management System

The `./synspec/` directory contains a Python-based task management system (currently not in active use for this planning work). It includes:

- `MASTER_SPEC.md` - Architecture documentation for the EVOLVE product
- `task_queue.json` / `task_archive.json` - Task tracking
- `scripts/*.py` - Task management CLI tools

This appears to be related to the actual EVOLVE product development, not the business planning.

## Input Documents

Business plan source materials in `./inputdocs/` (READ ONLY):

- `bplan-v3.md` - Complete business plan (market sizing, strategy, financials)
- `pitch-deck.md` - Investor pitch content (source for PowerPoint generation)
- `smb-research.md` - SMB market research

These documents inform the assumptions used in expense models and provide source content for presentations.

## Quick Reference: Document Generation Workflow

### Generate PowerPoint Pitch Deck

```bash
# One-time setup
python3 -m venv .venv
source .venv/bin/activate
pip install python-pptx

# Generate presentation
source .venv/bin/activate
python create_pitchdeck.py

# Output: EVOLVE-PitchDeck.pptx (22 slides)
```

### Generate Expense Model

```bash
# One-time setup
npm install exceljs

# Generate model
node scripts/generate_final_model.js

# Output: outputdocs/EVOLVE_Expense_Model_FINAL.xlsx
```

### File Organization

- **Inputs:** `inputdocs/*.md` (read-only source content)
- **Examples:** `examples/*.pptx` (styling templates)
- **Scripts:** `scripts/*.js` (Excel generators), `create_pitchdeck.py` (PowerPoint generator)
- **Outputs:** `outputdocs/*.xlsx` (Excel models), `EVOLVE-PitchDeck.pptx` (presentations)
- **Virtual env:** `.venv/` (Python dependencies, git-ignored)
