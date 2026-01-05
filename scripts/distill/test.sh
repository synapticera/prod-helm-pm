#!/bin/bash
# scripts/distill/test.sh
# Distills verbose test output to essentials

set -euo pipefail

echo "🧪 Running tests..."

if output=$(npm run test:unit 2>&1); then
    # Extract test counts
    passed=$(echo "$output" | grep -oP '\d+(?= passed)' | head -1 || echo "0")
    total=$(echo "$output" | grep -oP '\d+(?= total)' | head -1 || echo "0")

    echo "✅ All tests passed ($passed/$total)"
    exit 0
else
    echo "❌ Tests failed:"
    # Show only failures
    echo "$output" | grep -A 5 "FAIL" | head -20
    echo ""
    echo "Run 'npm run test:unit' for full output"
    exit 1
fi
