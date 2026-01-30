---
name: synaptic-brand-guidelines
description: "Applies Synaptic Era's official brand colors, typography, and logo to any artifact. Use when: creating branded content, applying brand colors/style guidelines, visual formatting, company design standards, Synaptic branding, presentations, documents, web pages, or any content requiring Synaptic brand identity. Includes complete color palette (Blue #01A9DB, Orange #FB4100, Navy #07253D), Poppins typography, logo variations, and component patterns."
license: Complete terms in LICENSE.txt
---

# Synaptic Era Brand Guidelines

## Overview

This skill provides Synaptic Era, Inc.'s official brand identity and style resources for consistent application across all generated content including presentations, documents, web pages, and marketing materials.

**Company**: Synaptic Era, Inc.
**Website**: https://www.synaptic.build
**Tagline**: "AI-powered automation for Salesforce"

**Keywords**: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, Synaptic brand, visual formatting, visual design, Synaptic Era

---

## Brand Assets

### Logo Files

**Logo/Mark Variations** (from official brand guide):

1. **Blue text + Orange star** - Primary logo for light backgrounds
   - "synaptic" in Synaptic Blue (#01A9DB)
   - Orange star accent (#FB4100)

2. **Navy text + Orange star** - Alternate for light backgrounds
   - "synaptic" in Dark Navy (#07253D)
   - Orange star accent (#FB4100)

3. **Black text + Orange star** - High contrast for light backgrounds
   - "synaptic" in black
   - Orange star accent (#FB4100)

4. **Dark Navy background variations**:
   - Blue text (#01A9DB) + Orange star on Navy (#07253D) background
   - White text (#FFFFFF) + Orange star on Navy (#07253D) background

**Logo Usage Guidelines**:
- Minimum clear space: Logo height × 0.25 on all sides
- Minimum size: 120px wide (web), 1 inch wide (print)
- Never distort, rotate, or change logo colors
- Always maintain aspect ratio
- The orange star is a critical brand element - never remove or recolor it

**Logo Asset Paths** (when available):
- Web SVG logos: `x-project/local-modules/x-skills/Synaptic Logo 2025/Files for Web and Screen/`
- Print EPS logos: `x-project/local-modules/x-skills/Synaptic Logo 2025/EPS Files for Print Materials/`

### Logo Placement

**PowerPoint**:
- Title slides: Top-left or bottom-right
- Content slides: Small logo mark in header area
- Section dividers: Centered or top-left

**Documents**:
- Header: Left-aligned, 0.75-1 inch height
- Cover page: Centered, 2-3 inch width

**Web**:
- Navigation: Top-left, 120-200px width
- Footer: Centered or left-aligned, 100-150px width

---

## Brand Colors

### Primary Colors

```
Synaptic Blue:    #01A9DB  (RGB: 1, 169, 219)   - Primary brand, buttons, links
Synaptic Orange:  #FB4100  (RGB: 251, 65, 0)    - Accent, CTAs, highlights, logo "S"
Dark Navy:        #07253D  (RGB: 7, 37, 61)     - Headings, primary text
Dark Gray-Blue:   #44546A  (RGB: 68, 84, 106)   - Body text, secondary content
White:            #FFFFFF  (RGB: 255, 255, 255) - Backgrounds, light text
```

### Secondary Colors

```
Light Gray:       #E7E6E6  - Cards, subtle backgrounds, dividers
Border Gray:      #BABBBF  - Borders, disabled states, medium gray
```

### Situational/Tertiary Colors (Industry-Specific)

Use these colors for industry-specific or contextual applications:

```
Purple:           #3F3A93  - AI & Agent Force (technology, AI products)
Green (Dark):     #009E5F  - Success states, positive metrics
Teal:             #58DBC8  - Health & Medical industry applications
Tan/Beige:        #B39D89  - Government sector applications
```

**Usage Guidelines:**
- Primary colors (Blue, Orange, Navy, Gray) for all general content
- Tertiary colors only when context-appropriate (e.g., Purple for AI/Agentforce content)
- Maintain 70% primary colors, 20% secondary, 10% tertiary ratio
- Never use tertiary colors for primary branding elements (logos, main CTAs)

### Web Color Variants

The website uses slightly different hex codes for gradients and effects:
- Blue variant: `#01A5DB`, `#0288B8` (gradient component)
- Orange variant: `#FF8100` (softer for web)
- Navy variant: `#44548A` (for taglines)

**Use primary colors** for all generated content unless specifically targeting web gradients.

### Color Usage Guidelines

**Backgrounds:**
- Primary: White (#FFFFFF)
- Sections: Light Gray (#E7E6E6)
- Dark mode: Dark Navy (#07253D) with white text

**Text:**
- Headings: Dark Navy (#07253D)
- Body: Dark Gray-Blue (#44546A)
- Links: Synaptic Blue (#01A9DB)
- Emphasis: Synaptic Orange (#FB4100)

**CTAs/Buttons:**
- Primary: Synaptic Blue background, white text
- Secondary: Synaptic Orange background, white text
- Tertiary: White background, Synaptic Blue text, Synaptic Blue border

**Data Visualization:**
- Primary: Synaptic Blue
- Secondary: Synaptic Orange
- Tertiary: Purple, Green
- Neutral: Gray tones

---

## Typography

### Font Family

**Primary Font**: **Poppins** (all content)

**Font Weights:**
- Light (300) - Large display headings, hero text
- Regular (400) - Body text, paragraphs
- Medium (500) - Emphasis, subheadings
- Semibold (600) - Main headings, section titles
- Bold (700) - Strong emphasis (use sparingly)

**Fallback Stack**: `'Poppins', Arial, sans-serif`

### Font Sizes

**Web/HTML:**
- H1: 2.5rem (40px) - Page titles
- H2: 1.75rem (28px) - Section headers
- H3: 1.1rem (17.6px) - Subsection headers
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Captions, metadata
- Line height: 1.6 (body), 1.2 (headings)

**PowerPoint Presentations:**
- Title Slide: 44pt Semibold
- Section Headers: 32pt Semibold
- Slide Titles: 28pt Semibold
- Body Text: 18pt Regular
- Bullet Points: 16pt Regular
- Captions/Footnotes: 14pt Regular

**Documents (Word/PDF):**
- Document Title: 24pt Semibold
- H1: 18pt Semibold
- H2: 14pt Medium
- H3: 12pt Medium
- Body: 11pt Regular
- Captions: 9pt Italic
- Line spacing: 1.6 (body), 1.2 (headings)

---

## Components & Patterns

### Buttons

**Primary Button:**
```css
background: #01A9DB (Synaptic Blue)
color: #FFFFFF (White)
padding: 12px 24px
border-radius: 4px
font: 500 16px Poppins
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)

hover: transform: translateY(-3px)
       box-shadow: 0 4px 12px rgba(1, 169, 219, 0.3)
```

**Secondary/Accent Button:**
```css
background: #FB4100 (Synaptic Orange)
color: #FFFFFF (White)
padding: 12px 24px
border-radius: 4px
font: 500 16px Poppins
transition: transform 0.3s

hover: transform: translateY(-3px)
       box-shadow: 0 4px 12px rgba(251, 65, 0, 0.3)
```

**Tertiary/Ghost Button:**
```css
background: transparent
color: #01A9DB
border: 2px solid #01A9DB
padding: 10px 22px
border-radius: 4px

hover: background: rgba(1, 169, 219, 0.1)
```

### Cards

```css
background: #FFFFFF
border-radius: 12px
padding: 24px
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
border: 1px solid #E7E6E6 (optional)
```

**Card with gradient overlay:**
```css
background: linear-gradient(135deg, rgba(1, 169, 219, 0.05), rgba(251, 65, 0, 0.05))
backdrop-filter: blur(10px)
```

### Spacing System

Use 8px base grid:
- **xs**: 4px - Tight spacing
- **sm**: 8px - Standard gap
- **md**: 16px - Section spacing
- **lg**: 24px - Component spacing
- **xl**: 32px - Major sections
- **xxl**: 48px - Page sections

### Visual Effects

**Elevation:**
- Level 1: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` - Cards
- Level 2: `box-shadow: 0 4px 8px rgba(0,0,0,0.15)` - Elevated cards
- Level 3: `box-shadow: 0 8px 16px rgba(0,0,0,0.2)` - Modals, overlays

**Hover Effects:**
- Buttons: `translateY(-3px)` + shadow
- Cards: `translateY(-2px)` + shadow increase
- Links: Underline + color darken 10%

**Gradients:**
- Background: `linear-gradient(135deg, #01A9DB, #0288B8)` - Blue gradient
- Accent: `linear-gradient(135deg, #FB4100, #FF8100)` - Orange gradient
- Subtle: `linear-gradient(135deg, rgba(1,169,219,0.05), rgba(251,65,0,0.05))` - Card overlays

---

## PowerPoint Presentations

### Creating Presentations

**Method 1: Using pptxgen** (Recommended for code generation)

```javascript
const pptxgen = require("pptxgenjs");

// Synaptic color palette (hex codes without # prefix for pptxgen)
const C = {
  darkNavy: "07253D",   // Main backgrounds, dark mode
  white: "FFFFFF",      // Primary text on dark
  gray: "44546A",       // Secondary text, body
  lightGray: "E7E6E6",  // Light backgrounds, cards
  cyan: "01A9DB",       // Synaptic Blue - primary brand
  orange: "FB4100",     // Synaptic Orange - accent
  purple: "3F3A93",     // Data viz accent
  green: "009E5F",      // Success/positive
  medGray: "BABBBF"     // Borders, disabled
};

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Synaptic Era, Inc.";

// Add slides with Synaptic styling
let slide = pptx.addSlide();
slide.background = { fill: C.darkNavy };
slide.addText("Title Here", {
  x: 1, y: 2, w: 8, h: 1,
  fontSize: 44, bold: true,
  color: C.white, fontFace: "Poppins"
});

pptx.writeFile({ fileName: "output.pptx" });
```

**Method 2: Using python-pptx with Synaptic template** (Recommended - includes Poppins font)

**Official Template**: `/Users/wkarp/devlocal/x-user/x-project/local-modules/x-skills/Synaptic-Powerpoint-Template-2025.pptx`

```python
from pptx import Presentation

# Load Synaptic 2025 template
prs = Presentation('/Users/wkarp/devlocal/x-user/x-project/local-modules/x-skills/Synaptic-Powerpoint-Template-2025.pptx')

# Use layout 0 (Section Header) for title slide
slide = prs.slides.add_slide(prs.slide_layouts[0])
title = slide.shapes.title
title.text = "Presentation Title"

# Use layout 1 (Title and Content) for content slides
slide = prs.slides.add_slide(prs.slide_layouts[1])
title = slide.shapes.title
title.text = "Slide Title"
content = slide.placeholders[1]
content.text = "Bullet 1\nBullet 2"

prs.save('output.pptx')
```

See x-pptx skill for complete layout details (14 layouts available)

### Slide Layout Standards

**Title Slide (Dark Background):**
```
Background: Dark Navy (#07253D)
Title: 44pt Poppins Semibold, White
Subtitle: 28pt Poppins Regular, Synaptic Blue
Author/Date: 18pt Poppins Regular, Light Gray
Logo: Synaptic white+orange logo, bottom-left or top-left
```

**Section Header (Branded):**
```
Background: Synaptic Blue (#01A9DB) or gradient
Title: 32pt Poppins Semibold, White
Subtitle: 20pt Poppins Regular, White
Accent: Orange horizontal bar (optional)
```

**Content Slide (Light Background):**
```
Background: White or Light Gray
Title: 28pt Poppins Semibold, Dark Navy
Body: 18pt Poppins Regular, Dark Gray-Blue
Bullets: 16pt Poppins Regular, Synaptic Blue bullets
Logo: Small Synaptic blue+orange logo, top-right
```

**Metrics/Dashboard Slide:**
```
Background: White
Header: 24pt Poppins Semibold, Dark Navy
Large Numbers: 48-60pt Poppins Bold, Synaptic Blue/Orange
Labels: 14pt Poppins Regular, Gray
```

**Two-Column Layout:**
```
Title: 28pt Poppins Semibold, Dark Navy
Column Headers: 20pt Poppins Medium, Synaptic Blue
Content: 16pt Poppins Regular, Gray
```

---

## HTML/Web Application

### CSS Variables

```css
:root {
  /* Colors */
  --synaptic-blue: #01A9DB;
  --synaptic-orange: #FB4100;
  --dark-navy: #07253D;
  --dark-gray-blue: #44546A;
  --light-gray: #E7E6E6;
  --white: #FFFFFF;

  /* Gradients */
  --gradient-blue: linear-gradient(135deg, #01A9DB, #0288B8);
  --gradient-orange: linear-gradient(135deg, #FB4100, #FF8100);

  /* Typography */
  --font-family: 'Poppins', Arial, sans-serif;
  --line-height-body: 1.6;
  --line-height-heading: 1.2;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
}
```

### Typography Styles

```css
body {
  font-family: var(--font-family);
  color: var(--dark-gray-blue);
  line-height: var(--line-height-body);
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family);
  color: var(--dark-navy);
  line-height: var(--line-height-heading);
  font-weight: 600;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 1.75rem; }
h3 { font-size: 1.1rem; }
```

### Component Examples

**Primary Button:**
```html
<button class="btn-primary">Call to Action</button>

<style>
.btn-primary {
  background: var(--synaptic-blue);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font: 500 16px Poppins, Arial, sans-serif;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(1, 169, 219, 0.3);
}
</style>
```

**Card Component:**
```html
<div class="synaptic-card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>

<style>
.synaptic-card {
  background: white;
  border-radius: 12px;
  padding: var(--space-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--light-gray);
}
</style>
```

---

## Python Color Values (python-pptx, python-docx)

```python
from pptx.dml.color import RGBColor

# Synaptic Brand Colors
SYNAPTIC_BLUE = RGBColor(1, 169, 219)
SYNAPTIC_ORANGE = RGBColor(251, 65, 0)
DARK_NAVY = RGBColor(7, 37, 61)
DARK_GRAY_BLUE = RGBColor(68, 84, 106)
WHITE = RGBColor(255, 255, 255)
LIGHT_GRAY = RGBColor(231, 230, 230)
PURPLE = RGBColor(63, 58, 147)
GREEN = RGBColor(0, 158, 95)
```

---

## Document Standards

### PowerPoint

**⚠️ ALWAYS use the master template**: Load from template path and use existing layouts
**Footer**: "Private and Confidential. Property of Synaptic Era, Inc ©2025"

**Title Slide:**
- Logo: Synaptic Blue/Orange logo, top-left
- Title: 44pt Poppins Semibold, Dark Navy
- Subtitle: 24pt Poppins Regular, Dark Gray-Blue

**Content Slides:**
- Header: Synaptic logo mark (small)
- Title: 28pt Poppins Semibold, Dark Navy
- Body: 18pt Poppins Regular, Dark Gray-Blue
- Accent elements: Synaptic Blue or Orange

### Word Documents

**Header:**
- Synaptic logo, left-aligned
- Horizontal line in Synaptic Blue (1pt)

**Footer:**
- Left: "Synaptic Era, Inc."
- Right: Page number
- Center: Document title (optional)

**Styles:**
- Title: 24pt Poppins Semibold, Dark Navy
- Heading 1: 18pt Poppins Semibold, Dark Navy
- Heading 2: 14pt Poppins Medium, Dark Gray-Blue
- Body: 11pt Poppins Regular, Dark Gray-Blue
- Caption: 9pt Poppins Italic, Gray

### PDF Documents

Same styling as Word documents. Prefer generating from Word/PowerPoint for consistency.

---

## Accessibility

All color combinations meet WCAG AA standards (4.5:1 minimum):

**Contrast Ratios:**
- Dark Navy (#07253D) on White: 14.7:1 ✓✓ (AAA)
- Dark Gray-Blue (#44546A) on White: 7.8:1 ✓✓ (AAA)
- White on Synaptic Blue (#01A9DB): 4.6:1 ✓ (AA)
- White on Synaptic Orange (#FB4100): 4.2:1 ✓ (AA)

**Design Requirements:**
- Minimum touch targets: 44×44px
- Focus states: Visible 2px outline in Synaptic Blue
- Alt text: Required for all logo images
- Color not sole indicator: Use icons + color for status

---

## Usage Examples

### Apply Synaptic branding to PowerPoint

```python
from pptx import Presentation
from pptx.util import Pt
from pptx.dml.color import RGBColor

# Load Synaptic template
prs = Presentation('/Users/wkarp/devlocal/x-library/modules/pm-core/Synaptic-PPT-Template.pptx')

# Use layout 0 (Title Slide)
slide = prs.slides.add_slide(prs.slide_layouts[0])
title = slide.shapes.title
title.text = "Presentation Title"

# Apply Synaptic colors (already in template, but manual override if needed)
DARK_NAVY = RGBColor(7, 37, 61)
title.text_frame.paragraphs[0].font.color.rgb = DARK_NAVY
title.text_frame.paragraphs[0].font.name = 'Poppins'
title.text_frame.paragraphs[0].font.size = Pt(44)
title.text_frame.paragraphs[0].font.bold = True

prs.save('output.pptx')
```

### Apply Synaptic branding to HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --synaptic-blue: #01A9DB;
      --synaptic-orange: #FB4100;
      --dark-navy: #07253D;
      --dark-gray-blue: #44546A;
    }

    body {
      font-family: 'Poppins', Arial, sans-serif;
      color: var(--dark-gray-blue);
      line-height: 1.6;
    }

    h1, h2, h3 {
      font-family: 'Poppins', Arial, sans-serif;
      color: var(--dark-navy);
      font-weight: 600;
    }

    .btn-primary {
      background: var(--synaptic-blue);
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      border: none;
      font: 500 16px Poppins, Arial, sans-serif;
      cursor: pointer;
      transition: transform 0.3s;
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(1, 169, 219, 0.3);
    }
  </style>
</head>
<body>
  <img src="/path/to/Synaptic_logo_blueNorange.svg" alt="Synaptic Era" width="200">
  <h1>Welcome to Synaptic</h1>
  <p>AI-powered automation for Salesforce.</p>
  <button class="btn-primary">Get Started</button>
</body>
</html>
```

---

## Brand Voice & Messaging

### Key Messages

- **What we do**: AI-powered automation for Salesforce
- **How we're different**: Value-first methodology, enterprise trust
- **Partnerships**: Salesforce Agentforce designated implementation partner

### Tone

- Professional yet approachable
- Technical but accessible
- Confident without arrogance
- Solution-focused

### Taglines

- Primary: "AI-powered automation for Salesforce"
- Enterprise: "Trusted enterprise-grade AI solutions"
- Value: "Measurable results, quickly and responsibly"

---

## Quick Reference

| Element | Color | Font | Size |
|---------|-------|------|------|
| Main Heading | Dark Navy | Poppins Semibold | 28-44pt |
| Body Text | Dark Gray-Blue | Poppins Regular | 16-18pt |
| Primary CTA | Synaptic Blue bg | Poppins Medium | 16pt |
| Accent CTA | Synaptic Orange bg | Poppins Medium | 16pt |
| Links | Synaptic Blue | Poppins Regular | inherit |
| Logo | Blue+Orange or White+Orange | - | 120px+ width |

---

## Complete pptxgen Color Palette

For use in pptxgen (Node.js PowerPoint generation):

```javascript
// Synaptic 2024 color palette - hex codes WITHOUT # prefix
const SYNAPTIC_COLORS = {
  darkNavy: "07253D",   // dk1 - Main backgrounds, headers
  white: "FFFFFF",      // lt1 - Primary text on dark
  gray: "44546A",       // dk2 - Secondary text, body
  lightGray: "E7E6E6",  // lt2 - Light backgrounds, cards
  cyan: "01A9DB",       // accent1 - Synaptic Blue primary
  orange: "FB4100",     // accent2 - Synaptic Orange accent
  lightBG: "E9E9E9",    // accent3 - Alternate light bg
  purple: "3F3A93",     // accent4 - Data visualization
  green: "009E5F",      // accent5 - Success/positive
  medGray: "BABBBF"     // accent6 - Borders, disabled
};
```

---

## Website Reference

Company website: https://www.synaptic.build

---

*Last Updated: 2026-01-23*
*Synaptic Era, Inc. © 2025*
