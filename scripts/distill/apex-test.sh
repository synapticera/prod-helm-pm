#!/bin/bash
# scripts/distill/apex-test.sh
# Distills verbose Apex test output to essentials
#
# Usage: ./apex-test.sh [class-name]
# If no class provided, runs all tests

set -euo pipefail

TARGET_ORG=${TARGET_ORG:-$(sf config get target-org --json | jq -r '.result[0].value')}
TEST_CLASS=${1:-""}

if [ -z "$TARGET_ORG" ]; then
    echo "❌ No target org configured"
    exit 1
fi

echo "🧪 Running Apex tests on $TARGET_ORG..."

if [ -n "$TEST_CLASS" ]; then
    echo "   Class: $TEST_CLASS"
    cmd="sf apex run test --class-names $TEST_CLASS --target-org $TARGET_ORG --code-coverage --result-format human --wait 10"
else
    echo "   All tests"
    cmd="sf apex run test --target-org $TARGET_ORG --code-coverage --result-format human --wait 10"
fi

if output=$($cmd 2>&1); then
    # Extract summary
    passed=$(echo "$output" | grep -oP '\d+(?= Passed)' || echo "0")
    failed=$(echo "$output" | grep -oP '\d+(?= Failed)' || echo "0")
    coverage=$(echo "$output" | grep -oP '\d+(?=%)' | head -1 || echo "0")

    if [ "$failed" -eq 0 ]; then
        echo "✅ All tests passed: $passed passed, ${coverage}% coverage"

        if [ "$coverage" -lt 75 ]; then
            echo "⚠️  Warning: Coverage below 75% threshold"
        fi
        exit 0
    else
        echo "❌ Tests failed: $passed passed, $failed failed"
        echo ""
        echo "Failures:"
        echo "$output" | grep -A 3 "FAIL" | head -20
        exit 1
    fi
else
    echo "❌ Test execution failed:"
    echo "$output" | head -20
    exit 1
fi
