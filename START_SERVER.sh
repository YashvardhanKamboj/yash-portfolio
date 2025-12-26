#!/bin/bash

# Start Local Development Server
# This script will install dependencies and start the server

echo "🚀 Starting Portfolio Server..."
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  Option 1: Download from https://nodejs.org/"
    echo "  Option 2: Install via Homebrew: brew install node"
    echo ""
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating one..."
    cat > .env << EOF
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:3000
CONTACT_EMAIL=contact@yashkamboj.com
EOF
    echo "✅ Created .env file with default settings"
    echo "   Note: MongoDB connection may fail if MongoDB is not running locally"
    echo "   This is okay - the server will still start!"
    echo ""
fi

# Start the server
echo "🚀 Starting server on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""
npm run dev

