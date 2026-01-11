# Helm Investor Presentation Deck

**Generated:** January 5, 2026
**Status:** ✅ First Draft Complete - Ready for Review & Content Fill-In
**Format:** HTML5 (Synaptic Branded)
**Slides:** 15 main slides

---

## Files in This Folder

### 🎯 Main Presentation Files

**1. `helm-deck.html`** (Interactive Web Version)

- Open in any web browser
- Interactive, fully formatted with Synaptic branding
- Perfect for reviewing layout and content
- Use this for digital presentations
- Best for: Review, editing, online sharing

**2. `helm-deck-print.html`** (Print-Ready Version)

- Optimized for printing and PDF export
- Same content as helm-deck.html with print-friendly styling
- Print to PDF from browser (Cmd+P / Ctrl+P → Save as PDF)
- Best for: PDF exports, printing, offline sharing

**3. `generate-helm-deck.js`** (Generator Script)

- Node.js script that creates the HTML decks
- Fully documented and customizable
- Can be edited and re-run to update content
- Includes all Synaptic branding constants

### 📋 Metadata & Documentation

**4. `deck-metadata.json`**

- Machine-readable metadata about the presentation
- Branding specifications (colors, fonts)
- File structure and references
- Slide count and section breakdown

**5. `README.md`** (This File)

- Guide to deck files and usage
- Content fill-in checklist
- Integration instructions

---

## Slide Breakdown

| Slide | Title                        | Type        | Status           |
| ----- | ---------------------------- | ----------- | ---------------- |
| 1     | Opening & Vision             | Title       | ✅ Complete      |
| 2     | The AI Agent Explosion       | Content     | ✅ Complete      |
| 3     | The AI Deployment Crisis     | Content     | ✅ Complete      |
| 4     | Market Evolution & Category  | Content     | ✅ Complete      |
| 5     | Helm's Unique Approach       | Content     | ✅ Complete      |
| 6     | Four-Module Monetization     | Table       | ✅ Complete      |
| 7     | The Unfair Advantage         | Content     | ✅ Complete      |
| 8     | 5-Year Financial Trajectory  | Chart/Table | ✅ Complete      |
| 9     | Unit Economics               | Chart/Table | ✅ Complete      |
| 10    | Three-Phase Market Expansion | Content     | ✅ Complete      |
| 11    | Expansion & Retention        | Content     | ✅ Complete      |
| 12    | Traction & Early Validation  | Content     | ⏳ Needs Fill-In |
| 13    | Product Roadmap              | Content     | ⏳ Needs Fill-In |
| 14    | The Ask                      | Content     | ⏳ Needs Fill-In |
| 15    | Vision & Closing             | Title       | ✅ Complete      |

---

## Content Fill-In Checklist

**REQUIRED (Must Fill In Before Final Presentation):**

### Slide 12: Traction & Early Validation

- [ ] MVP status and current capabilities
- [ ] Beta users or pilot customers
- [ ] User signups / waitlist size
- [ ] Early revenue or LOIs
- [ ] Customer testimonials or quotes
- [ ] Case studies or pilot results
- [ ] Product usage metrics

### Slide 13: Product Roadmap

- [ ] Q1 2026 current release details
- [ ] Q2-Q3 2026 near-term features
- [ ] Q4 2026 - Q2 2027 mid-term capabilities
- [ ] 2027+ long-term vision items

### Slide 14: The Ask

- [ ] Funding amount sought
- [ ] Round structure (SAFE, equity, other)
- [ ] Use of funds breakdown:
  - Engineering/Product %
  - Sales & Marketing %
  - Operations %
- [ ] Key milestones and targets
- [ ] Runway duration
- [ ] Series A timing and size estimate

### Slide 15 (Additional Content - Not in Current Deck)

- [ ] Founding team names and credentials
- [ ] Previous exits or relevant experience
- [ ] Domain expertise summary
- [ ] Contact information
- [ ] Call to action

---

## Branding Specifications

**Colors (Synaptic):**

- Dark Navy: `#07253D` (backgrounds, headers)
- Cyan: `#01A9DB` (accents, highlights)
- Orange: `#FB4100` (secondary accents)
- White: `#FFFFFF` (primary text)
- Gray: `#44546A` (secondary text)

**Fonts:**

- Primary: Arial
- Title: 48px
- Subtitle: 28px
- Headers: 24px
- Body: 14px

**Logo:**

- "Helm by Synaptic" on every slide
- Footer on all slides

---

## How to Use the Deck

### For Review & Editing

1. **Open in Browser:**

   ```bash
   open /Users/wkarp/devlocal/prod-miner-pm/x-project/bplan/deck/helm-deck.html
   # or
   open helm-deck-print.html
   ```

2. **Review Content:**
   - Read through all 15 slides
   - Identify [To fill in] placeholders
   - Check positioning language (Executive Agent)
   - Verify financial numbers match your assumptions

3. **Gather Fill-In Content:**
   - Work with team to get traction metrics
   - Finalize funding ask
   - Create product roadmap details
   - Prepare team bios and credentials

### For Editing Content

**Option A: Edit HTML Directly**

- Open `helm-deck.html` in a text editor
- Find the content you want to change
- Replace with your specific details
- Save and refresh browser

**Option B: Regenerate from Script**

1. Edit `generate-helm-deck.js` with new content
2. Replace placeholder strings with actual data
3. Run: `node generate-helm-deck.js`
4. New HTML files automatically generated

### For Converting to PDF

1. **Print to PDF:**
   - Open `helm-deck-print.html` in browser
   - Press Cmd+P (Mac) or Ctrl+P (Windows)
   - Select "Save as PDF"
   - Save to folder

2. **PowerPoint Conversion:**
   - Copy HTML from deck
   - Paste into PowerPoint (File → Open → Web Page)
   - Or use online converters

---

## Integration with Visual Assets

The deck can be enhanced with visual assets from the parent folder:

**Available Assets:**

- `../design-assets/helm-transformation-journey.html` - 4-module pipeline
- `../design-assets/helm-financial-projections.html` - Interactive financial dashboard
- `../design-assets/helm-competitive-positioning.html` - Competitive matrix

**How to Integrate:**

1. Open visual assets in separate tabs during presentation
2. Reference them as supporting materials
3. Link to them from appendix slides
4. Embed as iframes (advanced)

---

## Customization Guide

### Change Colors

Edit `generate-helm-deck.js` constants:

```javascript
const COLORS = {
  darkNavy: "#07253D", // Change here
  cyan: "#01A9DB" // Change here
  // ... etc
};
```

### Change Fonts

Edit fonts section:

```javascript
const FONTS = {
  primary: "Arial", // Change here
  sizes: {
    title: "48px" // Change here
    // ... etc
  }
};
```

### Add New Slides

1. Create new slide template in `generate-helm-deck.js`
2. Add to `allSlides` array
3. Update slide number in footer
4. Run script to regenerate

---

## Browser Compatibility

**Tested and Working:**

- ✅ Chrome/Chromium (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)

**Print to PDF:**

- ✅ All modern browsers support this natively
- Use browser's print dialog (Cmd+P / Ctrl+P)
- Select "Save as PDF"

---

## File Sizes

- `helm-deck.html`: ~45KB
- `helm-deck-print.html`: ~45KB
- `generate-helm-deck.js`: ~15KB
- **Total:** ~105KB (very lightweight)

---

## Next Steps

### Before Finalizing:

1. ✅ Review all 15 slides
2. ⏳ Fill in Slide 12 (Traction)
3. ⏳ Fill in Slide 13 (Roadmap)
4. ⏳ Fill in Slide 14 (The Ask)
5. ⏳ Add team bios and contact info

### For Presentation:

1. Open in browser (full screen: F11)
2. Use browser navigation or arrow keys
3. Print to PDF if needed
4. Have visual assets open in separate tabs
5. Prepare Q&A materials

### For Sharing:

1. Export to PDF (recommended)
2. Share HTML files directly
3. Include link to `/design-assets/` folder for context
4. Provide this README for recipients

---

## Support Materials

**Related Documents:**

- `../preso-outline.md` - Complete presentation outline with notes
- `../helm-positioning.md` - Strategic narrative
- `../DAN-POSITIONING-ANALYSIS.md` - Positioning analysis and options
- `../design-assets/README.md` - Visual assets guide

**Referenced Data:**

- Gartner 2026 Hype Cycle (Decision Intelligence #1)
- Forrester Agent Control Plane research
- 2026 AI Predictions compilation
- CustomerThink 2026 research

---

## Questions or Changes?

- Content questions: See `preso-outline.md` for full notes
- Design questions: See `design-assets/README.md`
- Positioning questions: See `DAN-POSITIONING-ANALYSIS.md`
- Financial model: See `helm-financial-projections.html` for details

---

**Status: ✅ First Draft Complete**
**Next: Fill in [To fill in] sections and finalize**
**Time to finalize: 2-3 hours (depending on complexity)**
**Ready for investor meetings: Yes (with fill-ins)**

---

_Generated by x-ppt-generator-agent | January 5, 2026_
_Part of Helm by Synaptic Investor Presentation Package_
