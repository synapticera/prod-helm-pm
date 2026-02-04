# TalkPPT Examples

## Quick Start

### 1. Unpack a Presentation

```bash
./talkppt/scripts/unpack.sh presentation.pptx ./working
```

Output:
```
Unpacked: presentation.pptx
Output: ./working
Slides: 72

Structure:
  ./working/ppt/slides/slide{1-72}.xml  # Slide content
  ./working/ppt/media/                   # Images
  ./working/ppt/theme/                   # Colors/fonts
```

### 2. Preview a Slide

```bash
./talkppt/pv 5 ./working
```

Output:
```
Previewing slide 5...
Repacking...
Generating thumbnail...
Preview saved: /tmp/pptx-preview/slide-5.png
Restoring slide order...
Slide 5 → /tmp/pptx-preview/slide-5.png
```

### 3. Edit and Preview Cycle

```bash
# Edit slide 5
vim ./working/ppt/slides/slide6.xml  # Note: slide index 5 = file slide6.xml

# Preview changes
./talkppt/pv 5 ./working

# Repeat until satisfied
```

### 4. Pack Final Presentation

```bash
./talkppt/scripts/pack.sh ./working output.pptx
```

---

## Common Editing Tasks

### Change Text Content

Find the text you want to change:
```bash
grep -o '<a:t>[^<]*</a:t>' ./working/ppt/slides/slide2.xml | head -20
```

Replace it:
```bash
sed -i '' 's/<a:t>Old Title<\/a:t>/<a:t>New Title<\/a:t>/g' ./working/ppt/slides/slide2.xml
```

### Remove a Shape

Find the shape ID:
```bash
grep -n 'cNvPr id=' ./working/ppt/slides/slide2.xml | head -20
```

Remove it with Python:
```python
import re

with open('./working/ppt/slides/slide2.xml', 'r') as f:
    content = f.read()

# Remove shape with id="123"
pattern = r'<p:sp>.*?id="123".*?</p:sp>'
content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('./working/ppt/slides/slide2.xml', 'w') as f:
    f.write(content)
```

### Move an Element

Find current position:
```bash
grep -B5 "Your Text" ./working/ppt/slides/slide2.xml | grep "off x="
```

Change position (move right by 0.5 inch = 457200 EMUs):
```bash
# Before: x="5000000"
# After:  x="5457200"
sed -i '' 's/x="5000000"/x="5457200"/g' ./working/ppt/slides/slide2.xml
```

### Change Colors

Find color definitions:
```bash
grep -o 'srgbClr val="[^"]*"' ./working/ppt/slides/slide2.xml | sort | uniq
```

Replace a color:
```bash
# Change blue (#0066CC) to green (#00CC66)
sed -i '' 's/srgbClr val="0066CC"/srgbClr val="00CC66"/g' ./working/ppt/slides/slide2.xml
```

---

## Advanced Examples

### Batch Text Replacement

Create a JSON mapping file:
```json
{
  "Old Company Name": "New Company Name",
  "2024": "2025",
  "Draft": "Final"
}
```

Apply with Python:
```python
import json
import os

# Load mappings
with open('replacements.json') as f:
    replacements = json.load(f)

# Process all slides
slides_dir = './working/ppt/slides'
for slide_file in os.listdir(slides_dir):
    if slide_file.startswith('slide') and slide_file.endswith('.xml'):
        path = os.path.join(slides_dir, slide_file)
        with open(path, 'r') as f:
            content = f.read()

        for old, new in replacements.items():
            content = content.replace(f'<a:t>{old}</a:t>', f'<a:t>{new}</a:t>')

        with open(path, 'w') as f:
            f.write(content)

print("Replacements complete")
```

### Extract All Images

```bash
mkdir -p extracted_images
cp ./working/ppt/media/*.png extracted_images/
cp ./working/ppt/media/*.jpg extracted_images/
cp ./working/ppt/media/*.jpeg extracted_images/
ls -la extracted_images/
```

### Get Slide Inventory

```bash
python3 ./talkppt/scripts/inventory.py ./working > inventory.json
```

Sample output:
```json
{
  "slide-0": {
    "shape-0": {
      "id": "2",
      "name": "Title",
      "left": 0.76,
      "top": 0.22,
      "width": 10.42,
      "height": 1.09,
      "placeholder_type": "TITLE",
      "paragraphs": [
        {"text": "Slide Title", "font_size": 32.0, "bold": true}
      ]
    }
  }
}
```

### Delete Multiple Slides

Remove slides 10-15 from presentation.xml:
```python
import xml.etree.ElementTree as ET

NS = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'}

tree = ET.parse('./working/ppt/presentation.xml')
root = tree.getroot()

sld_id_lst = root.find('.//p:sldIdLst', NS)
children = list(sld_id_lst)

# Remove slides 10-15 (0-indexed)
for i in range(15, 9, -1):  # Reverse order to avoid index shifting
    sld_id_lst.remove(children[i])

tree.write('./working/ppt/presentation.xml', xml_declaration=True, encoding='UTF-8')
```

### Clone a Slide

```bash
# Copy slide 5 to slide 20
cp ./working/ppt/slides/slide5.xml ./working/ppt/slides/slide20.xml
cp ./working/ppt/slides/_rels/slide5.xml.rels ./working/ppt/slides/_rels/slide20.xml.rels

# Update presentation.xml to include new slide (manual XML edit required)
```

---

## Unit Conversions

```python
# EMUs (English Metric Units)
EMU_PER_INCH = 914400
EMU_PER_POINT = 12700
EMU_PER_CM = 360000

# Examples
def inches_to_emu(inches): return int(inches * 914400)
def emu_to_inches(emu): return emu / 914400
def points_to_emu(points): return int(points * 12700)

# Common positions (in EMUs)
# 1 inch = 914400
# 0.5 inch = 457200
# 1 cm = 360000
```

---

## Troubleshooting

### "Slide index out of range"

Check slide count:
```bash
ls -1 ./working/ppt/slides/slide*.xml | wc -l
```

### "XML parsing error"

Validate XML syntax:
```bash
xmllint --noout ./working/ppt/slides/slide2.xml
```

### Preview shows old content

Clear preview cache:
```bash
rm -f /tmp/pptx-preview/slide-*.png
./talkppt/pv 5 ./working
```

### Corrupted output file

Restore from backup:
```bash
cp ./working/ppt/slides/slide2.xml.backup ./working/ppt/slides/slide2.xml
```

Or re-unpack:
```bash
./talkppt/scripts/unpack.sh original.pptx ./working
```
