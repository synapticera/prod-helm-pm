#!/bin/bash

# Dispatch ROI App Startup Script
# Kills existing instances on port 3000, then starts the dev server

PORT=3479

echo "Checking for existing processes on port $PORT..."

# Kill any process running on port 3479
PID=$(lsof -ti :$PORT 2>/dev/null)
if [ -n "$PID" ]; then
    echo "Killing existing process (PID: $PID)..."
    kill -9 $PID 2>/dev/null
    sleep 1
fi

echo "Installing dependencies..."
npm install

echo "Starting dev server on http://localhost:$PORT"
npm run dev -- -p $PORT
