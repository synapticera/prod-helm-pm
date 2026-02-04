# TalkPPT - Native PowerPoint Editing Module

Fast, native PowerPoint editing with instant preview capabilities. Edit OOXML directly, preview any slide in ~3 seconds.

## Overview

TalkPPT provides a workflow for editing PowerPoint files at the native OOXML level while maintaining quick visual feedback through instant previews.

### Key Capabilities

| Feature | Description |
|---------|-------------|
| **Unpack** | Extract .pptx to editable OOXML structure |
| **Edit** | Modify slide XML directly (text, positions, shapes) |
| **Preview** | Generate PNG preview of any slide (~3s) |
| **Repack** | Bundle back to valid .pptx file |

### Workflow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Unpack    │ --> │  Edit XML   │ --> │   Preview   │ --> │   Repack    │
│   .pptx     │     │  (slides)   │     │   (PNG)     │     │   .pptx     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                          ↑                    │
                          └────────────────────┘
                             iterate quickly
```

## Installation

### Prerequisites

- Python 3.8+
- macOS (for Quick Look thumbnail generation)
- Node.js (optional, for server integration)

### Setup

```bash
# Clone/copy talkppt to your workspace
cp -r talkppt /path/to/your/workspace/

# Make scripts executable
chmod +x talkppt/scripts/*.sh
chmod +x talkppt/pv

# Set your OOXML tools path (if using external pack/unpack)
export TALKPPT_OOXML_PATH="/path/to/ooxml/scripts"
```

## Quick Start

```bash
# 1. Unpack a presentation
./talkppt/scripts/unpack.sh presentation.pptx ./working

# 2. Preview a slide (0-indexed)
./talkppt/pv 5 ./working

# 3. Edit the slide XML
# working/ppt/slides/slide6.xml

# 4. Preview again to see changes
./talkppt/pv 5 ./working

# 5. When done, repack
./talkppt/scripts/pack.sh ./working output.pptx
```

## Directory Structure

```
talkppt/
├── README.md              # This file
├── pv                     # Quick preview command
├── config.json            # Configuration
├── scripts/
│   ├── unpack.sh          # Unpack .pptx to directory
│   ├── pack.sh            # Pack directory to .pptx
│   ├── preview.py         # Generate slide preview PNG
│   ├── inventory.py       # Extract text inventory as JSON
│   └── edit-text.py       # Batch text replacement
└── docs/
    ├── SPEC.md            # Technical specification
    ├── XML-REFERENCE.md   # OOXML slide structure reference
    └── EXAMPLES.md        # Common editing examples
```

## Commands

### `pv` - Quick Preview

```bash
# Preview slide N from unpacked directory
./talkppt/pv <slide_number> [unpacked_dir]

# Examples
./talkppt/pv 0                    # Preview first slide (default dir)
./talkppt/pv 5 ./my-presentation  # Preview slide 5 from specific dir
```

### `unpack.sh` - Extract Presentation

```bash
./talkppt/scripts/unpack.sh <input.pptx> <output_dir>
```

### `pack.sh` - Bundle Presentation

```bash
./talkppt/scripts/pack.sh <input_dir> <output.pptx>
```

### `inventory.py` - Extract Text

```bash
python3 talkppt/scripts/inventory.py <input.pptx> <output.json>
```

## Configuration

Edit `config.json`:

```json
{
  "preview_dir": "/tmp/pptx-preview",
  "thumbnail_size": 1600,
  "server_port": 3333,
  "server_action": "browser",
  "ooxml_path": null
}
```

| Option | Description | Default |
|--------|-------------|---------|
| `preview_dir` | Where to save preview PNGs | `/tmp/pptx-preview` |
| `thumbnail_size` | Preview resolution in pixels | `1600` |
| `server_port` | Dev server port for actions | `3333` |
| `server_action` | Action type for preview open | `browser` |
| `ooxml_path` | Path to external OOXML tools | `null` (use built-in) |

## Integration

### With Synaptic MAX Server

TalkPPT can trigger preview opens via HTTP action:

```bash
curl -X POST http://localhost:3333/action \
  -H "Content-Type: application/json" \
  -d '{"action": "browser", "url": "file:///tmp/pptx-preview/slide-5.png"}'
```

### With AnyView

Configure `server_action` in config.json to match your viewer's action type.

### Standalone (macOS)

Without a server, previews open in Preview.app:

```bash
open /tmp/pptx-preview/slide-5.png
```

## OOXML Reference

### Slide Files

```
ppt/
├── slides/
│   ├── slide1.xml    # Slide content (1-indexed files)
│   ├── slide2.xml
│   └── ...
├── media/            # Images and assets
├── slideLayouts/     # Layout templates
├── slideMasters/     # Master templates
└── theme/            # Colors and fonts
```

### Common XML Elements

| Element | Description |
|---------|-------------|
| `<a:t>text</a:t>` | Text content |
| `<a:off x="" y=""/>` | Position (EMUs) |
| `<a:ext cx="" cy=""/>` | Size (EMUs) |
| `<p:sp>` | Shape element |
| `<p:pic>` | Picture element |
| `<p:grpSp>` | Group of shapes |

### Units

- **EMUs** (English Metric Units): 914400 EMUs = 1 inch
- Quick conversion: `pixels × 9525 = EMUs` (at 96 DPI)

## Examples

### Change Text

```bash
# Find text in slide
grep -o '<a:t>[^<]*</a:t>' working/ppt/slides/slide2.xml

# Replace text
sed -i '' 's/<a:t>Old Text<\/a:t>/<a:t>New Text<\/a:t>/g' working/ppt/slides/slide2.xml
```

### Move Element

```bash
# Change x position (move right by ~0.5 inch)
sed -i '' 's/x="5000000"/x="5457200"/g' working/ppt/slides/slide2.xml
```

### Remove Shape

```python
# Remove shape by ID
import re
with open('slide.xml', 'r') as f:
    content = f.read()
pattern = r'<p:sp>.*?id="123".*?</p:sp>'
content = re.sub(pattern, '', content, flags=re.DOTALL)
```

## Troubleshooting

### Preview not updating

The preview PNG is cached. Force refresh:
```bash
rm /tmp/pptx-preview/slide-*.png
./talkppt/pv 5
```

### XML validation errors

After editing, validate before repacking:
```bash
python3 talkppt/scripts/validate.py ./working
```

### Corrupted output

Restore from backup:
```bash
cp working/ppt/slides/slide2.xml.backup working/ppt/slides/slide2.xml
```

## License

MIT
