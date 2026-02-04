#!/usr/bin/env python3
"""
TalkPPT Preview - Generate PNG preview of any slide from unpacked PPTX.

Usage:
    python preview.py <slide_number> [unpacked_dir] [--output-dir DIR] [--size SIZE]

Examples:
    python preview.py 5
    python preview.py 5 ./working
    python preview.py 5 ./working --output-dir /tmp/previews --size 1600
"""

import sys
import os
import shutil
import subprocess
import argparse
import json
import xml.etree.ElementTree as ET
from pathlib import Path

# Default configuration
DEFAULT_CONFIG = {
    "preview_dir": "/tmp/pptx-preview",
    "thumbnail_size": 1600,
    "server": {
        "enabled": True,
        "port": 3333,
        "action": "browser"
    }
}

def load_config(config_path=None):
    """Load configuration from file or use defaults."""
    if config_path and os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return {**DEFAULT_CONFIG, **json.load(f)}
    return DEFAULT_CONFIG

def get_slide_order(pres_xml_path):
    """Extract current slide order from presentation.xml."""
    tree = ET.parse(pres_xml_path)
    root = tree.getroot()
    ns = {
        'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }

    sld_id_lst = root.find('.//p:sldIdLst', ns)
    if sld_id_lst is None:
        return []

    slides = []
    for sld_id in sld_id_lst.findall('p:sldId', ns):
        rid = sld_id.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        slides.append((sld_id.get('id'), rid))
    return slides

def reorder_slides(pres_xml_path, target_slide_idx):
    """Temporarily reorder slides so target is first."""
    tree = ET.parse(pres_xml_path)
    root = tree.getroot()
    ns = {
        'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }

    # Register namespaces to preserve them
    ET.register_namespace('', 'http://schemas.openxmlformats.org/presentationml/2006/main')
    ET.register_namespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
    ET.register_namespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')

    sld_id_lst = root.find('.//p:sldIdLst', ns)
    if sld_id_lst is None:
        return None

    children = list(sld_id_lst)
    if target_slide_idx >= len(children):
        print(f"Error: Slide {target_slide_idx} doesn't exist (max: {len(children)-1})")
        return None

    # Move target slide to front
    target = children[target_slide_idx]
    sld_id_lst.remove(target)
    sld_id_lst.insert(0, target)

    # Save modified XML
    tree.write(pres_xml_path, xml_declaration=True, encoding='UTF-8')
    return children  # Return original order for restoration

def restore_slides(pres_xml_path, original_children):
    """Restore original slide order."""
    tree = ET.parse(pres_xml_path)
    root = tree.getroot()
    ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'}

    sld_id_lst = root.find('.//p:sldIdLst', ns)
    if sld_id_lst is None:
        return

    # Clear and restore
    for child in list(sld_id_lst):
        sld_id_lst.remove(child)
    for child in original_children:
        sld_id_lst.append(child)

    tree.write(pres_xml_path, xml_declaration=True, encoding='UTF-8')

def pack_presentation(input_dir, output_pptx):
    """Pack directory to PPTX file."""
    import zipfile

    with zipfile.ZipFile(output_pptx, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(input_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arc_name = os.path.relpath(file_path, input_dir)
                zf.write(file_path, arc_name)

def generate_thumbnail(pptx_path, output_dir, size=1600):
    """Generate thumbnail using macOS Quick Look."""
    os.makedirs(output_dir, exist_ok=True)

    result = subprocess.run(
        ["qlmanage", "-t", "-s", str(size), "-o", output_dir, pptx_path],
        capture_output=True
    )

    # Find generated file
    base_name = os.path.basename(pptx_path)
    expected_file = os.path.join(output_dir, f"{base_name}.png")

    return expected_file if os.path.exists(expected_file) else None

def preview_slide(slide_num, unpacked_dir, output_dir, size=1600):
    """Generate preview for a specific slide."""
    pres_xml = os.path.join(unpacked_dir, "ppt", "presentation.xml")
    temp_pptx = os.path.join(output_dir, "slide-preview.pptx")

    if not os.path.exists(pres_xml):
        print(f"Error: presentation.xml not found in {unpacked_dir}")
        return None

    print(f"Previewing slide {slide_num}...")

    # Reorder slides
    original_order = reorder_slides(pres_xml, slide_num)
    if original_order is None:
        return None

    try:
        # Pack to temp file
        print("Repacking...")
        pack_presentation(unpacked_dir, temp_pptx)

        # Generate thumbnail
        print("Generating thumbnail...")
        thumbnail = generate_thumbnail(temp_pptx, output_dir, size)

        if thumbnail:
            # Rename to slide-N.png
            final_path = os.path.join(output_dir, f"slide-{slide_num}.png")
            shutil.move(thumbnail, final_path)
            print(f"Preview saved: {final_path}")
            return final_path
        else:
            print("Error: Failed to generate thumbnail")
            return None

    finally:
        # Always restore original order
        print("Restoring slide order...")
        restore_slides(pres_xml, original_order)

        # Clean up temp file
        if os.path.exists(temp_pptx):
            os.remove(temp_pptx)

def main():
    parser = argparse.ArgumentParser(description='Generate PNG preview of a slide')
    parser.add_argument('slide', type=int, help='Slide number (0-indexed)')
    parser.add_argument('unpacked_dir', nargs='?', default='.', help='Unpacked presentation directory')
    parser.add_argument('--output-dir', '-o', default='/tmp/pptx-preview', help='Output directory for PNG')
    parser.add_argument('--size', '-s', type=int, default=1600, help='Thumbnail size in pixels')
    parser.add_argument('--config', '-c', help='Path to config.json')

    args = parser.parse_args()

    # Load config
    config = load_config(args.config)
    output_dir = args.output_dir or config.get('preview_dir', '/tmp/pptx-preview')
    size = args.size or config.get('thumbnail_size', 1600)

    # Generate preview
    result = preview_slide(args.slide, args.unpacked_dir, output_dir, size)

    return 0 if result else 1

if __name__ == "__main__":
    sys.exit(main())
