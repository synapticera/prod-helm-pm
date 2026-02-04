#!/bin/bash
# Fast single-slide preview from unpacked PPTX
# Usage: ./preview-slide.sh <slide_number> [unpacked_dir]
# Example: ./preview-slide.sh 5

SLIDE_NUM=${1:-0}
UNPACKED_DIR=${2:-"/Users/wkarp/devlocal/prod-helm-pm/x-project/investor-pitch/pitch-working-unpacked"}
SKILL_DIR="/Users/wkarp/devlocal/prod-helm-pm/.claude/skills/x:pptx"
OUTPUT_DIR="/tmp/pptx-preview"
PREVIEW_PPTX="/tmp/slide-preview.pptx"

mkdir -p "$OUTPUT_DIR"

echo "Repacking presentation..."
cd "$SKILL_DIR" && python3 ooxml/scripts/pack.py "$UNPACKED_DIR" "$PREVIEW_PPTX" 2>/dev/null

echo "Generating preview for slide $SLIDE_NUM..."
# Quick Look generates thumbnail of first slide only, so we use open to preview
qlmanage -t -s 1600 -o "$OUTPUT_DIR" "$PREVIEW_PPTX" 2>/dev/null

# Rename output
mv "$OUTPUT_DIR/slide-preview.pptx.png" "$OUTPUT_DIR/slide-preview.png" 2>/dev/null

echo "Preview saved to: $OUTPUT_DIR/slide-preview.png"
echo "Opening in Finder..."
open "$OUTPUT_DIR/slide-preview.png"
