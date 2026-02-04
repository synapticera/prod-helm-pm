#!/usr/bin/env python3
"""
TalkPPT Inventory - Extract all text from presentation as JSON.

Usage:
    python inventory.py <unpacked_dir> [output.json]

Examples:
    python inventory.py ./working
    python inventory.py ./working inventory.json
"""

import sys
import os
import json
import xml.etree.ElementTree as ET
from pathlib import Path

# OOXML Namespaces
NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

# EMU conversion
EMU_PER_INCH = 914400

def emu_to_inches(emu):
    """Convert EMUs to inches."""
    return round(emu / EMU_PER_INCH, 2)

def extract_text_from_paragraph(p_elem):
    """Extract text and formatting from a paragraph element."""
    text_parts = []
    for r in p_elem.findall('.//a:r', NS):
        t = r.find('a:t', NS)
        if t is not None and t.text:
            text_parts.append(t.text)

    if not text_parts:
        return None

    result = {'text': ''.join(text_parts)}

    # Extract paragraph properties
    pPr = p_elem.find('a:pPr', NS)
    if pPr is not None:
        algn = pPr.get('algn')
        if algn and algn != 'l':
            result['alignment'] = {'ctr': 'CENTER', 'r': 'RIGHT', 'l': 'LEFT'}.get(algn, algn)

    # Extract run properties from first run
    first_r = p_elem.find('.//a:r', NS)
    if first_r is not None:
        rPr = first_r.find('a:rPr', NS)
        if rPr is not None:
            sz = rPr.get('sz')
            if sz:
                result['font_size'] = int(sz) / 100

            if rPr.get('b') == '1':
                result['bold'] = True
            if rPr.get('i') == '1':
                result['italic'] = True

            # Font name
            latin = rPr.find('a:latin', NS)
            if latin is not None:
                result['font_name'] = latin.get('typeface')

            # Color
            solidFill = rPr.find('a:solidFill', NS)
            if solidFill is not None:
                srgbClr = solidFill.find('a:srgbClr', NS)
                if srgbClr is not None:
                    result['color'] = srgbClr.get('val')

    return result

def extract_shape_text(sp_elem):
    """Extract text from a shape element."""
    txBody = sp_elem.find('.//p:txBody', NS)
    if txBody is None:
        return None

    paragraphs = []
    for p in txBody.findall('a:p', NS):
        para = extract_text_from_paragraph(p)
        if para:
            paragraphs.append(para)

    return paragraphs if paragraphs else None

def extract_shape_info(sp_elem):
    """Extract position, size, and other info from shape."""
    info = {}

    # Get shape ID and name
    cNvPr = sp_elem.find('.//p:cNvPr', NS)
    if cNvPr is not None:
        info['id'] = cNvPr.get('id')
        info['name'] = cNvPr.get('name')

    # Get position and size
    xfrm = sp_elem.find('.//p:spPr/a:xfrm', NS)
    if xfrm is not None:
        off = xfrm.find('a:off', NS)
        ext = xfrm.find('a:ext', NS)

        if off is not None:
            info['left'] = emu_to_inches(int(off.get('x', 0)))
            info['top'] = emu_to_inches(int(off.get('y', 0)))

        if ext is not None:
            info['width'] = emu_to_inches(int(ext.get('cx', 0)))
            info['height'] = emu_to_inches(int(ext.get('cy', 0)))

    # Get placeholder type
    nvSpPr = sp_elem.find('p:nvSpPr', NS)
    if nvSpPr is not None:
        ph = nvSpPr.find('.//p:ph', NS)
        if ph is not None:
            info['placeholder_type'] = ph.get('type', 'BODY')

    return info

def process_slide(slide_path):
    """Process a single slide and extract all text."""
    tree = ET.parse(slide_path)
    root = tree.getroot()

    shapes = {}
    shape_idx = 0

    # Find all shapes with text
    for sp in root.findall('.//p:sp', NS):
        paragraphs = extract_shape_text(sp)
        if paragraphs:
            info = extract_shape_info(sp)
            info['paragraphs'] = paragraphs
            shapes[f'shape-{shape_idx}'] = info
            shape_idx += 1

    return shapes

def inventory_presentation(unpacked_dir):
    """Extract text inventory from all slides."""
    slides_dir = os.path.join(unpacked_dir, 'ppt', 'slides')

    if not os.path.exists(slides_dir):
        raise ValueError(f"Slides directory not found: {slides_dir}")

    inventory = {}

    # Find all slide files
    slide_files = sorted(
        [f for f in os.listdir(slides_dir) if f.startswith('slide') and f.endswith('.xml')],
        key=lambda x: int(x.replace('slide', '').replace('.xml', ''))
    )

    for i, slide_file in enumerate(slide_files):
        slide_path = os.path.join(slides_dir, slide_file)
        shapes = process_slide(slide_path)
        if shapes:
            inventory[f'slide-{i}'] = shapes

    return inventory

def main():
    if len(sys.argv) < 2:
        print("Usage: python inventory.py <unpacked_dir> [output.json]")
        sys.exit(1)

    unpacked_dir = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        inventory = inventory_presentation(unpacked_dir)

        # Count totals
        slide_count = len(inventory)
        shape_count = sum(len(shapes) for shapes in inventory.values())

        if output_file:
            with open(output_file, 'w') as f:
                json.dump(inventory, f, indent=2)
            print(f"Inventory saved: {output_file}")
        else:
            print(json.dumps(inventory, indent=2))

        print(f"\nFound text in {slide_count} slides with {shape_count} text elements", file=sys.stderr)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
