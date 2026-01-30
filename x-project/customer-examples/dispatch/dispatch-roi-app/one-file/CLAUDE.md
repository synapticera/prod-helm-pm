# Standalone HTML Version

This folder contains a single-file version of the Dispatch ROI Analysis app.

## File

- **`dispatch-roi.html`** (~450 KB) - Complete standalone version with all assets embedded

## What's Included

- All 4 tabs with working JavaScript tab switching
- Tab 1 & Tab 2 charts captured as 2x resolution PNG images (for retina)
- All CSS styles embedded inline
- Dispatch logo embedded as base64
- System font fallbacks (Inter, SF Pro, Segoe UI)

## Regenerating

See the main `CLAUDE.md` in the project root for the complete capture script and instructions.

Quick version:

1. Start dev server: `npm run dev`
2. Install Playwright if needed: `npx playwright install chromium`
3. Run: `node one-file/capture.js`

## Limitations

- Charts are static images (no hover tooltips)
- Data updates require regenerating the entire file
- Uses system fonts instead of custom Geist font
