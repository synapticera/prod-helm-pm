#!/usr/bin/env python3
"""
Preview any slide from an unpacked PPTX by temporarily making it the first slide.
Usage: python preview-any-slide.py <slide_number> [unpacked_dir]
"""

import sys
import os
import shutil
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path

SKILL_DIR = "/Users/wkarp/devlocal/prod-helm-pm/.claude/skills/x:pptx"
OUTPUT_DIR = "/tmp/pptx-preview"
PREVIEW_PPTX = "/tmp/slide-preview.pptx"

def get_slide_order(pres_xml_path):
    """Extract current slide order from presentation.xml"""
    tree = ET.parse(pres_xml_path)
    root = tree.getroot()
    ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
          'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}

    sld_id_lst = root.find('.//p:sldIdLst', ns)
    if sld_id_lst is None:
        return []

    slides = []
    for sld_id in sld_id_lst.findall('p:sldId', ns):
        rid = sld_id.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        slides.append((sld_id.get('id'), rid))
    return slides

def reorder_slides(pres_xml_path, target_slide_idx):
    """Temporarily reorder slides so target is first"""
    tree = ET.parse(pres_xml_path)
    root = tree.getroot()
    ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
          'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}

    # Register namespaces to preserve them
    for prefix, uri in ns.items():
        ET.register_namespace(prefix, uri)
    ET.register_namespace('', 'http://schemas.openxmlformats.org/presentationml/2006/main')

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
    """Restore original slide order"""
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

def main():
    slide_num = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    unpacked_dir = sys.argv[2] if len(sys.argv) > 2 else "/Users/wkarp/devlocal/prod-helm-pm/x-project/investor-pitch/pitch-working-unpacked"

    pres_xml = os.path.join(unpacked_dir, "ppt", "presentation.xml")

    print(f"Previewing slide {slide_num}...")

    # Backup and reorder
    original_order = reorder_slides(pres_xml, slide_num)
    if original_order is None:
        return 1

    try:
        # Repack
        print("Repacking...")
        subprocess.run([
            sys.executable,
            os.path.join(SKILL_DIR, "ooxml/scripts/pack.py"),
            unpacked_dir,
            PREVIEW_PPTX
        ], capture_output=True)

        # Generate thumbnail
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        print("Generating thumbnail...")
        subprocess.run([
            "qlmanage", "-t", "-s", "1600", "-o", OUTPUT_DIR, PREVIEW_PPTX
        ], capture_output=True)

        # Rename output
        src = os.path.join(OUTPUT_DIR, "slide-preview.pptx.png")
        dst = os.path.join(OUTPUT_DIR, f"slide-{slide_num}.png")
        if os.path.exists(src):
            shutil.move(src, dst)
            print(f"Preview saved: {dst}")

    finally:
        # Always restore original order
        print("Restoring slide order...")
        restore_slides(pres_xml, original_order)

    return 0

if __name__ == "__main__":
    sys.exit(main())
