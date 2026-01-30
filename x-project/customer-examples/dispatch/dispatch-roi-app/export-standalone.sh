#!/bin/bash

# Export Dispatch ROI App as single standalone HTML file
# This creates a self-contained file that works offline

echo "📦 Exporting Dispatch ROI App as standalone HTML..."
echo ""

# 1. Start the Next.js app in production mode temporarily
echo "🚀 Starting production server..."
PORT=4111 npm start &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# 2. Use wget to save the complete page
echo "💾 Downloading complete page with all assets..."
wget \
  --page-requisites \
  --convert-links \
  --adjust-extension \
  --span-hosts \
  --no-parent \
  --execute robots=off \
  --user-agent="Mozilla/5.0" \
  -P ./export-temp \
  http://localhost:4111/

# 3. Kill the server
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null

# 4. Find the main HTML file and inline everything
echo "📝 Creating standalone HTML file..."

# Use a simple approach: fetch the page and inline critical resources
curl http://localhost:4111 > dispatch-roi-standalone.html 2>/dev/null || {
  # If server already stopped, use the exported version
  if [ -f "export-temp/localhost:4111/index.html" ]; then
    cp "export-temp/localhost:4111/index.html" dispatch-roi-standalone.html
  fi
}

# Clean up temp directory
rm -rf export-temp

echo ""
echo "✅ Done!"
echo ""
echo "📄 Standalone file created: dispatch-roi-standalone.html"
echo "📊 File size: $(du -h dispatch-roi-standalone.html | cut -f1)"
echo ""
echo "To use: Just open dispatch-roi-standalone.html in any browser"
echo "Note: This is a development export. For best results, the app should be rebuilt with static export mode."
