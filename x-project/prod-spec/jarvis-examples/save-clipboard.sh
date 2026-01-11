#!/bin/bash
# Save clipboard image to this folder with auto-incrementing name
# Usage: ./save-clipboard.sh [optional-name]

DIR="$(cd "$(dirname "$0")" && pwd)"
NAME="${1:-jarvis}"

# Find next available number
NUM=1
while [ -f "$DIR/${NAME}-${NUM}.png" ]; do
    ((NUM++))
done

OUTPUT="$DIR/${NAME}-${NUM}.png"

if pngpaste "$OUTPUT" 2>/dev/null; then
    echo "✅ Saved: $OUTPUT"
else
    echo "❌ No image in clipboard"
    exit 1
fi
