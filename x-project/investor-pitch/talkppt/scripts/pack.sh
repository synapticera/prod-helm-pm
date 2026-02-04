#!/bin/bash
# TalkPPT Pack - Bundle directory to PPTX
# Usage: ./pack.sh <input_dir> <output.pptx>

set -e

if [ $# -lt 2 ]; then
    echo "Usage: $0 <input_dir> <output.pptx>"
    exit 1
fi

INPUT="$1"
OUTPUT="$2"

if [ ! -d "$INPUT" ]; then
    echo "Error: Directory not found: $INPUT"
    exit 1
fi

# Check for required files
if [ ! -f "$INPUT/[Content_Types].xml" ]; then
    echo "Error: Not a valid OOXML structure (missing [Content_Types].xml)"
    exit 1
fi

# Remove existing output if exists
rm -f "$OUTPUT"

# Create PPTX (ZIP with specific structure)
cd "$INPUT"

# [Content_Types].xml should be first, but most readers don't care
zip -r -q "$OLDPWD/$OUTPUT" . -x "*.DS_Store" -x "__MACOSX/*"

cd "$OLDPWD"

# Get file size
SIZE=$(ls -lh "$OUTPUT" | awk '{print $5}')

echo "Packed: $OUTPUT ($SIZE)"
