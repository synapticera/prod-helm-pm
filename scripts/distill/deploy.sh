#!/bin/bash
# scripts/distill/deploy.sh
# Distills verbose deployment output to essentials
#
# Usage: ./deploy.sh [validate-only] [test-level]
# Examples:
#   ./deploy.sh                    # Deploy to target org
#   ./deploy.sh validate           # Validate only (no deploy)
#   ./deploy.sh deploy RunLocalTests  # Deploy with local tests

set -euo pipefail

VALIDATE_ONLY=${1:-"deploy"}
TEST_LEVEL=${2:-"NoTestRun"}
TARGET_ORG=${TARGET_ORG:-$(sf config get target-org --json | jq -r '.result[0].value')}

if [ -z "$TARGET_ORG" ]; then
    echo "❌ No target org configured"
    exit 1
fi

echo "📦 Deploying to $TARGET_ORG..."
echo "   Mode: $VALIDATE_ONLY"
echo "   Test Level: $TEST_LEVEL"

cmd="sf project deploy start --target-org $TARGET_ORG --test-level $TEST_LEVEL"

if [ "$VALIDATE_ONLY" == "validate" ]; then
    cmd="$cmd --dry-run"
fi

if output=$($cmd 2>&1); then
    job_id=$(echo "$output" | grep -oP 'Job ID: \K\w+' || echo "unknown")

    echo "✅ Deployment successful"
    echo "   Job ID: $job_id"

    # Extract component counts
    deployed=$(echo "$output" | grep -oP '\d+(?= components deployed)' || echo "0")
    echo "   Components: $deployed deployed"

    exit 0
else
    echo "❌ Deployment failed:"
    # Show only errors
    echo "$output" | grep -E "(error|Error|FAILURE)" | head -20
    echo ""
    echo "Run 'sf project deploy start' for full output"
    exit 1
fi
