#!/bin/bash
# scripts/distill/lint.sh
# Distills verbose lint output to essentials

set -euo pipefail

echo "🔍 Running linter..."

if output=$(npm run lint 2>&1); then
    echo "✅ Lint clean"
    exit 0
else
    errors=$(echo "$output" | grep -c "error" || echo "0")
    warnings=$(echo "$output" | grep -c "warning" || echo "0")

    echo "❌ Lint failed: $errors errors, $warnings warnings"
    echo ""
    echo "First 10 issues:"
    echo "$output" | grep -E "(error|warning)" | head -10
    echo ""
    echo "Run 'npm run lint' for full output"
    exit 1
fi
