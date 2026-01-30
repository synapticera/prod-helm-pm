#!/bin/bash

# Dispatch ROI App Startup Script
# This script ensures a clean start by killing any existing process on port 4111

PORT=4111
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting Dispatch ROI App on port $PORT..."
echo "📂 App directory: $APP_DIR"

# Kill any process using port 4111
echo "🔍 Checking for existing process on port $PORT..."
PID=$(lsof -ti:$PORT)
if [ ! -z "$PID" ]; then
    echo "⚠️  Found process $PID running on port $PORT, killing it..."
    kill -9 $PID 2>/dev/null || true
    sleep 1
    echo "✅ Process killed"
else
    echo "✅ Port $PORT is available"
fi

# Navigate to app directory
cd "$APP_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the dev server on port 4111
echo "🌐 Starting Next.js dev server on http://localhost:$PORT"
echo ""
PORT=$PORT npm run dev
