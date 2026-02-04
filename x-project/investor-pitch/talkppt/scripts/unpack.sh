#!/bin/bash
# TalkPPT Unpack - Extract PPTX to directory
# Usage: ./unpack.sh <input.pptx> <output_dir>

set -e

if [ $# -lt 2 ]; then
    echo "Usage: $0 <input.pptx> <output_dir>"
    exit 1
fi

INPUT="$1"
OUTPUT="$2"

if [ ! -f "$INPUT" ]; then
    echo "Error: File not found: $INPUT"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT"

# Unzip PPTX (which is a ZIP file)
unzip -q -o "$INPUT" -d "$OUTPUT"

# Count slides
SLIDE_COUNT=$(ls -1 "$OUTPUT/ppt/slides/"slide*.xml 2>/dev/null | wc -l | tr -d ' ')

echo "Unpacked: $INPUT"
echo "Output: $OUTPUT"
echo "Slides: $SLIDE_COUNT"
echo ""
echo "Structure:"
echo "  $OUTPUT/ppt/slides/slide{1-$SLIDE_COUNT}.xml  # Slide content"
echo "  $OUTPUT/ppt/media/                            # Images"
echo "  $OUTPUT/ppt/theme/                            # Colors/fonts"
