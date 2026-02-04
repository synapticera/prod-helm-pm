# TalkPPT Technical Specification

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         TalkPPT Module                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  Unpack  │   │  Edit    │   │ Preview  │   │  Repack  │    │
│  │  Layer   │   │  Layer   │   │  Layer   │   │  Layer   │    │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘    │
│       │              │              │              │            │
│       ▼              ▼              ▼              ▼            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    OOXML Engine                          │   │
│  │  - ZIP extraction/compression                            │   │
│  │  - XML parsing/serialization                             │   │
│  │  - Relationship management                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                       External Integrations                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                    │
│  │ Quick    │   │  HTTP    │   │  macOS   │                    │
│  │ Look     │   │  Server  │   │  open    │                    │
│  └──────────┘   └──────────┘   └──────────┘                    │
└────────────────────────────────────────────────────────────────┘
```

## Components

### 1. Unpack Layer (`scripts/unpack.sh`, `scripts/unpack.py`)

**Purpose**: Extract .pptx file to editable directory structure.

**Input**:
- `input.pptx` - PowerPoint file

**Output**:
- Directory with OOXML structure

**Process**:
1. Validate input is valid ZIP/PPTX
2. Extract to target directory
3. Preserve file permissions and timestamps
4. Return success/failure status

**Implementation**:
```bash
# Shell wrapper
unzip -q "$INPUT" -d "$OUTPUT"
```

```python
# Python implementation
import zipfile
with zipfile.ZipFile(input_path, 'r') as z:
    z.extractall(output_path)
```

### 2. Preview Layer (`scripts/preview.py`)

**Purpose**: Generate PNG preview of any slide with minimal latency.

**Input**:
- `slide_number` - 0-indexed slide to preview
- `unpacked_dir` - Path to unpacked presentation
- `output_dir` - Where to save PNG (default: `/tmp/pptx-preview`)

**Output**:
- PNG file at `{output_dir}/slide-{N}.png`

**Process**:
1. Temporarily reorder slides (target slide first)
2. Repack to temporary .pptx
3. Use Quick Look to generate thumbnail
4. Restore original slide order
5. Return path to PNG

**Key Algorithm - Slide Reordering**:
```python
def reorder_slides(pres_xml_path, target_idx):
    """Move target slide to first position temporarily"""
    tree = ET.parse(pres_xml_path)
    sld_id_lst = tree.find('.//p:sldIdLst', NS)

    children = list(sld_id_lst)
    target = children[target_idx]

    # Move to front
    sld_id_lst.remove(target)
    sld_id_lst.insert(0, target)

    tree.write(pres_xml_path)
    return children  # For restoration
```

**Performance Target**: < 3 seconds total

### 3. Edit Layer (Manual + Helper Scripts)

**Purpose**: Provide tools for common XML editing operations.

#### Text Inventory (`scripts/inventory.py`)

Extracts all text from presentation as JSON:

```json
{
  "slide-0": {
    "shape-0": {
      "placeholder_type": "TITLE",
      "left": 1.5,
      "top": 0.5,
      "width": 8.0,
      "height": 1.0,
      "paragraphs": [
        {"text": "Slide Title", "font_size": 32.0, "bold": true}
      ]
    }
  }
}
```

#### Text Replacement (`scripts/edit-text.py`)

Batch replace text using JSON mapping:

```json
{
  "slide-0": {
    "shape-0": {
      "paragraphs": [
        {"text": "New Title"}
      ]
    }
  }
}
```

### 4. Repack Layer (`scripts/pack.sh`, `scripts/pack.py`)

**Purpose**: Bundle edited directory back to valid .pptx.

**Input**:
- `input_dir` - Unpacked presentation directory
- `output.pptx` - Target file path

**Process**:
1. Validate directory structure
2. Create ZIP with proper compression
3. Ensure `[Content_Types].xml` is first entry
4. Validate output (optional, requires LibreOffice)

**Implementation**:
```python
import zipfile
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as z:
    # Content_Types must be first
    z.write('[Content_Types].xml')
    # Then all other files
    for file in files:
        z.write(file)
```

## File Formats

### Configuration (`config.json`)

```json
{
  "preview_dir": "/tmp/pptx-preview",
  "thumbnail_size": 1600,
  "server": {
    "enabled": true,
    "port": 3333,
    "action": "browser"
  },
  "ooxml": {
    "external_path": null,
    "validate_on_pack": false
  },
  "backup": {
    "enabled": true,
    "suffix": ".backup"
  }
}
```

### Slide Index Mapping

| Preview Index | File Name | Notes |
|---------------|-----------|-------|
| 0 | slide1.xml | First slide |
| 1 | slide2.xml | Second slide |
| N | slide{N+1}.xml | 0-indexed preview, 1-indexed files |

## API Reference

### Python API

```python
from talkppt import TalkPPT

# Initialize
ppt = TalkPPT("./working")

# Preview
ppt.preview(slide=5)  # Returns PNG path

# Edit text
ppt.set_text(slide=5, shape="shape-0", text="New Title")

# Get text
text = ppt.get_text(slide=5, shape="shape-0")

# Move shape
ppt.move_shape(slide=5, shape="shape-0", x=100, y=50)  # Points

# Remove shape
ppt.remove_shape(slide=5, shape_id="807")

# Pack
ppt.pack("output.pptx")
```

### CLI API

```bash
# Unpack
talkppt unpack input.pptx ./working

# Preview
talkppt preview 5 ./working

# Pack
talkppt pack ./working output.pptx

# Inventory
talkppt inventory ./working > inventory.json

# Edit
talkppt edit ./working replacements.json
```

## Server Integration

### HTTP Action Endpoint

**Request**:
```http
POST /action HTTP/1.1
Host: localhost:3333
Content-Type: application/json

{
  "action": "browser",
  "url": "file:///tmp/pptx-preview/slide-5.png"
}
```

**Response**:
```json
{
  "success": true,
  "action": "browser",
  "uri": "vscode://...",
  "message": "Action triggered"
}
```

### Supported Actions

| Action | Description | Parameters |
|--------|-------------|------------|
| `browser` | Open URL in browser | `url` |
| `open-webview` | Open in VS Code webview | `mod-name`, `mod-action`, `parameters` |
| `edit-file` | Open file in editor | `file` |

## OOXML Reference

### Namespaces

```python
NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}
```

### Key XML Paths

| Path | Description |
|------|-------------|
| `ppt/presentation.xml` | Slide order, metadata |
| `ppt/slides/slide{N}.xml` | Slide content |
| `ppt/slideLayouts/*.xml` | Layout templates |
| `ppt/slideMasters/*.xml` | Master templates |
| `ppt/theme/theme1.xml` | Colors, fonts |
| `ppt/media/*` | Images, videos |

### Element Reference

#### Shape (`<p:sp>`)
```xml
<p:sp>
  <p:nvSpPr>
    <p:cNvPr id="123" name="Shape Name"/>
  </p:nvSpPr>
  <p:spPr>
    <a:xfrm>
      <a:off x="914400" y="914400"/>  <!-- Position in EMUs -->
      <a:ext cx="1828800" cy="914400"/> <!-- Size in EMUs -->
    </a:xfrm>
  </p:spPr>
  <p:txBody>
    <a:p>
      <a:r>
        <a:t>Text content</a:t>
      </a:r>
    </a:p>
  </p:txBody>
</p:sp>
```

#### Text Run (`<a:r>`)
```xml
<a:r>
  <a:rPr lang="en-US" sz="1800" b="1"/>  <!-- Font properties -->
  <a:t>Bold 18pt text</a:t>
</a:r>
```

### Unit Conversions

```python
# EMUs (English Metric Units)
EMU_PER_INCH = 914400
EMU_PER_POINT = 12700
EMU_PER_PIXEL = 9525  # at 96 DPI

def inches_to_emu(inches): return int(inches * 914400)
def points_to_emu(points): return int(points * 12700)
def emu_to_inches(emu): return emu / 914400
```

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| `E001` | Invalid PPTX file |
| `E002` | Slide index out of range |
| `E003` | Shape not found |
| `E004` | XML parsing error |
| `E005` | Pack validation failed |
| `E006` | Preview generation failed |

### Recovery

- All edits create `.backup` files by default
- Use `talkppt restore <slide>` to revert changes
- Unpacked directories can be re-packed at any time

## Performance

### Benchmarks

| Operation | Time | Notes |
|-----------|------|-------|
| Unpack (100 slides) | ~1s | Depends on media |
| Preview (single slide) | ~3s | Including repack |
| Pack (100 slides) | ~2s | Without validation |
| Text replacement | <100ms | Single slide |

### Optimization Tips

1. Keep media files unchanged when possible
2. Use targeted XML edits vs full file rewrites
3. Disable validation during rapid iteration
4. Use SSD for temp directory
