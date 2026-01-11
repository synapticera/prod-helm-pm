# Workspace Styles

Select a styling for this VS Code workspace. Claude will generate a complete `.vscode/settings.json` file with your chosen styling.

## Instructions for Claude

**IMPORTANT:** When the user references this file or asks to change the workspace styling, you MUST follow this workflow:

### Phase 1: Interactive Selection (REQUIRED)

Always use `AskUserQuestion` tool to present the following menu tree structure.

**IMPORTANT:** After completing any action in Phase 2, return to Phase 1 and ask the user if they want to configure anything else. Continue looping until the user indicates they're done.

Style Options: 1. Colors 2. Zoom Level 3. Fonts 4. File Visibility 5. Default File Viewers

    Colors:
      1. Dark Blue - Professional and calming
      2. Dark Green - Natural and focused (current)
      3. Dark Grey - Neutral and professional
      4. More...
        1. Black - Pure minimal
        2. Dark Orange - Warm and energetic
        3. Dark Brown - Earthy and warm
        4. Dark Red - Bold and energetic
        5. Custom - Provide your own hex colors
            1. Primary color (hex)
            2. Background color (hex)
            3. Accent color (hex)
    Zoom Level:
       1. window.zoomLevel: 1
       2. window.zoomLevel: 1.4
       3. window.zoomLevel: 1.7
       3. window.zoomLevel: 2.0
       4. Custom:

    Fonts:
       1. Nothing here yet

    File Visibility:
       1. Hide x-system files
       2. Show all files

    Default File Viewers:
       1. Set HTML to Live Preview
       2. Set HTML to Code Editor (default)
       3. Set Markdown to Preview Editor
       4. Set Markdown to Code Editor

### Phase 2: Apply the Selection

Colors Action:

Once selection is confirmed:

1. Read the color values from this file (or use custom values)
2. Generate complete `.vscode/settings.json` with all customizations
3. Apply colors to ALL UI elements listed in "What Gets Customized"
4. Update "Current Theme" section in this file
5. Confirm completion to user
6. Return to Phase 1 main menu (ask if user wants to configure anything else)

| Theme       | Primary   | Background | Accent    |
| ----------- | --------- | ---------- | --------- |
| Dark Blue   | `#1e3a8a` | `#0a1929`  | `#2563eb` |
| Dark Green  | `#0d4d2d` | `#0a1f14`  | `#165c3a` |
| Black       | `#000000` | `#0a0a0a`  | `#1a1a1a` |
| Dark Grey   | `#374151` | `#111827`  | `#4b5563` |
| Dark Orange | `#7c2d12` | `#1a0f0a`  | `#9a3412` |
| Dark Brown  | `#44403c` | `#1c1917`  | `#57534e` |
| Dark Purple | `#4c1d95` | `#1e1b4b`  | `#5b21b6` |
| Dark Red    | `#7f1d1d` | `#1a0a0a`  | `#991b1b` |

When you select a theme, Claude will configure:

✅ Title bar (top of window)
✅ Activity bar (left sidebar with icons)
✅ Status bar (bottom)
✅ Editor background
✅ Editor line numbers and gutter
✅ Tabs and tab groups
✅ Sidebar and panels
✅ Terminal
✅ Input fields and dropdowns
✅ Buttons and badges
✅ Scrollbars
✅ Menus and widgets
✅ Lists and selections
✅ Borders and accents

Notes

- Colors only affect **this workspace**
- Other VS Code windows remain unchanged
- Settings saved to `.vscode/settings.json`
- Can switch themes anytime
- Preserves other workspace settings (like XML preferences)

Zoom Level Action:
Once selection is confirmed:

1. Read the zoom level value from this file (or use custom value)
2. Generate complete `.vscode/settings.json` with all customizations
3. Apply zoom level to the entire workspace
4. Confirm completion to user
5. Return to Phase 1 main menu (ask if user wants to configure anything else)

File Visibility Action:
Once selection is confirmed:

**If "Hide x-system files" selected:**

1. Read current `.vscode/settings.json`
2. Add or update `files.exclude` section with these patterns:
   ```json
   "files.exclude": {
     ".*": true,
     "backlog": true,
     "eslint*": true,
     "jest*": true,
     "node_modules": true,
     "package*": true,
     "requirements.txt": true,
     "scripts": true,
     "sfdx*": true
   }
   ```
3. Preserve all other settings (colors, zoom, etc.)
4. Write updated settings.json
5. Confirm completion to user
6. Return to Phase 1 main menu (ask if user wants to configure anything else)

**If "Show all files" selected:**

1. Read current `.vscode/settings.json`
2. Remove the `files.exclude` section entirely OR set to empty object `{}`
3. Preserve all other settings (colors, zoom, etc.)
4. Write updated settings.json
5. Confirm completion to user
6. Return to Phase 1 main menu (ask if user wants to configure anything else)

Default File Viewers Action:
Once selection is confirmed:

**If "Set HTML to Live Preview" selected:**

1. Read current `.vscode/settings.json`
2. Add or update `workbench.editorAssociations` section:
   ```json
   "workbench.editorAssociations": {
     "*.html": "livePreview.previewEditor"
   }
   ```
3. Preserve all other settings (colors, zoom, files.exclude, etc.)
4. Write updated settings.json
5. Confirm completion to user
6. Note: Requires "Live Preview" extension by Microsoft to be installed
7. Return to Phase 1 main menu (ask if user wants to configure anything else)

**If "Set HTML to Code Editor" selected:**

1. Read current `.vscode/settings.json`
2. Remove `"*.html": "livePreview.previewEditor"` from `workbench.editorAssociations`
3. If `workbench.editorAssociations` becomes empty, remove the entire section
4. Preserve all other settings (colors, zoom, files.exclude, etc.)
5. Write updated settings.json
6. Confirm completion to user
7. Return to Phase 1 main menu (ask if user wants to configure anything else)

Markdown File Viewers Action:

**If "Set Markdown to Preview Editor" selected:**

1. Read current `.vscode/settings.json`
2. Add or update `workbench.editorAssociations` section:
   ```json
   "workbench.editorAssociations": {
     "*.md": "vscode.markdown.preview.editor"
   }
   ```
3. Preserve all other settings (colors, zoom, files.exclude, HTML associations, etc.)
4. Write updated settings.json
5. Confirm completion to user
6. Return to Phase 1 main menu (ask if user wants to configure anything else)

**If "Set Markdown to Code Editor" selected:**

1. Read current `.vscode/settings.json`
2. Remove `"*.md": "vscode.markdown.preview.editor"` from `workbench.editorAssociations`
3. Preserve all other settings (colors, zoom, files.exclude, HTML associations, etc.)
4. Write updated settings.json
5. Confirm completion to user
6. Return to Phase 1 main menu (ask if user wants to configure anything else)
