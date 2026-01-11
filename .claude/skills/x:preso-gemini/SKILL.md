---
name: x:preso-gemini
description: "Generate presentations using Gemini Canvas via Claude for Chrome browser automation. Automatically creates slides with Synaptic branding, exports to Google Slides, downloads PPTX, and creates project links. Syntax: /x:preso-gemini <input-file> [output-name]"
args: "<input-file> [output-name]"
---

# Gemini Canvas Presentation Generator

Automatically generates presentations from source documents using Gemini Canvas via **Claude for Chrome browser automation**. Includes Synaptic brand styling, exports to Google Slides, downloads PPTX, and creates project reference files.

## Key Features

- **Browser automation** - No manual copy/paste; Claude drives Chrome directly
- **Synaptic branding** - Colors and fonts applied from the start
- **Complete workflow** - From source doc to exported PPTX with project links
- **Canvas tool selection** - Ensures visual slides, not text output

## Prerequisites

- Claude for Chrome extension installed and connected
- Access to gemini.google.com
- Google account signed in

---

## Workflow (Claude executes automatically via browser)

### Step 1: Parse Arguments

Extract from `$ARGUMENTS`:

- `input-file`: Required - path to source document
- `output-name`: Optional - base name for outputs (defaults to document title)

### Step 2: Load Synaptic Brand Guidelines

**CRITICAL**: Include brand colors in every Gemini prompt:

| Element         | Color   | Hex       | Usage                         |
| --------------- | ------- | --------- | ----------------------------- |
| Primary Blue    | Cyan    | `#01A9DB` | Accents, dividers, icons      |
| Synaptic Orange | Orange  | `#FB4100` | Highlights, key metrics, CTAs |
| Dark Navy       | Navy    | `#07253D` | Headings, titles              |
| Dark Gray-Blue  | Gray    | `#44546A` | Body text                     |
| Background      | White   | `#FFFFFF` | Slide backgrounds             |
| Font            | Poppins | -         | All text (Arial fallback)     |

### Step 3: Read & Analyze Document

1. Verify file exists: `ls -la <input-file>`
2. Read content:
   - `.md`/`.txt`: Read tool directly
   - `.pdf`/`.docx`: `python -m markitdown <file>`
3. Identify document type:
   - Strategic Analysis
   - Research/Market Analysis
   - Business Plan/Pitch
   - General Report

### Step 4: Generate Branded Prompt

Build prompt with this structure:

```
Create a professional board-ready presentation with the following:

## Branding Requirements (IMPORTANT)
Apply these exact brand colors throughout ALL slides:
- Primary accent color: #01A9DB (cyan blue) - for divider lines, icons, accent shapes
- Highlight color: #FB4100 (orange) - for key metrics, call-to-action elements, important numbers
- Heading text: #07253D (dark navy) - for all slide titles
- Body text: #44546A (dark gray-blue) - for body content
- Background: White with clean, professional layout
- Use Poppins or Arial font throughout

## Content
[Document summary - 2000-3000 chars of key content]

## Slide Structure ([8-15] slides)
1. Title + Context
2. Executive Summary
[3-N. Based on document sections]
N+1. Recommendations / Next Steps

## Design Requirements
- Use brand colors consistently
- Clean visual hierarchy
- Bullet points, not paragraphs
- Data visualizations where relevant
- Professional consulting-style formatting
```

### Step 5: Browser - Open Gemini

```
1. mcp__claude-in-chrome__tabs_context_mcp (get context)
2. mcp__claude-in-chrome__tabs_create_mcp (new tab)
3. mcp__claude-in-chrome__navigate to "https://gemini.google.com/app"
4. Wait 3 seconds for page load
```

### Step 6: Browser - Select Canvas Tool

**CRITICAL**: Canvas must be selected BEFORE entering the prompt, or you get text instead of slides.

```
1. Find and click "Tools" button (sparkle/wand icon)
2. Click "Canvas" from dropdown
3. Wait 2 seconds
```

### Step 7: Browser - Enter Prompt via JavaScript

The Gemini input uses Quill editor. Use JavaScript execution:

```javascript
// via mcp__claude-in-chrome__javascript_tool
const promptArea = document.querySelector(".ql-editor");
if (promptArea) {
  promptArea.focus();
  promptArea.innerText = `[GENERATED PROMPT]`;
  promptArea.classList.remove("ql-blank");
  promptArea.dispatchEvent(new Event("input", { bubbles: true }));
}
```

### Step 8: Browser - Submit & Monitor

```
1. Press Enter or click submit button
2. Wait 10-20 seconds for Canvas generation
3. Look for "Creating slides..." indicator
4. Verify slide count appears (e.g., "Slide 1 of 15")
5. Screenshot to confirm success
```

### Step 9: Browser - Export to Google Slides

```
1. Click "Export to Slides" button (top-right of Canvas panel)
2. Wait 3-5 seconds
3. Click "Open Slides" notification link
4. Capture new tab URL for reference file
```

### Step 10: Browser - Download PPTX

```
1. In Google Slides: File → Download → Microsoft PowerPoint (.pptx)
2. Wait for download (check ~/Downloads/)
3. Verify file exists
```

### Step 11: Create Project Links

Output directory: document's `/deck/` folder or same directory

**1. Create .webloc file** (macOS shortcut):

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>URL</key>
    <string>[GOOGLE_SLIDES_URL]</string>
</dict>
</plist>
```

**2. Create markdown reference file**:

```markdown
# [Presentation Title]

**Generated:** [date]
**Source:** [input-file path]

## Google Slides Link

[URL]

## Slide Overview

1. [slide titles...]

## Branding

Synaptic colors applied (#01A9DB, #FB4100, #07253D)
```

**3. Move PPTX** from Downloads to project deck folder

### Step 12: Summary Output

```
✅ Gemini Canvas Presentation Complete

**Source:** [input-file]
**Title:** [title]
**Slides:** [count]

**Outputs:**
- Google Slides: [URL]
- Local PPTX: [path]
- Reference: [.md path]
- Shortcut: [.webloc path]

**Branding:** Synaptic colors applied
```

---

## Document Type Templates

### Strategic Analysis

- Board-ready format
- 12-15 slides
- Focus: Options, financial comparison, risk, recommendation
- Style: Data-driven, clear recommendation

### Research/Market Analysis

- 10-12 slides
- Focus: Findings, data, implications
- Style: Fact-based, heavy visualizations

### Investor Pitch

- 10-12 slides
- Focus: Problem, solution, market, traction, ask
- Style: Bold, minimal text, story arc

---

## Error Handling

| Issue                    | Solution                                        |
| ------------------------ | ----------------------------------------------- |
| Quill editor input fails | Click in input area first, or use type fallback |
| Canvas tool not found    | Look for "Tools" menu, screenshot for help      |
| Text instead of slides   | Canvas wasn't selected - reselect and retry     |
| Export fails             | Verify slides generated, retry export button    |
| Download missing         | Check ~/Downloads, retry File → Download        |

---

## Tips for Best Results

1. **Always include brand colors** in every prompt - Gemini doesn't remember
2. **Select Canvas BEFORE prompting** - Critical for visual slides
3. **Wait adequately** - 10-20 seconds for complex presentations
4. **Verify before export** - Scroll through slides to check content
5. **Keep prompts focused** - 2000-3000 chars of summary works best
6. **Include actual data** - Copy key tables/numbers into prompt
