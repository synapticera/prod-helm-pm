#!/bin/bash

# Dispatch ROI Video - Remotion Studio
# This script launches the Remotion video editor/preview
# Remotion will automatically select an available port

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🎬 Starting Remotion Studio for Dispatch ROI Video..."
echo "📂 App directory: $APP_DIR"
echo ""
echo "ℹ️  Remotion will automatically choose an available port"
echo "ℹ️  Your browser will open automatically"
echo "ℹ️  Press Ctrl+C to stop the preview"
echo ""

cd "$APP_DIR"
npm run video:preview
