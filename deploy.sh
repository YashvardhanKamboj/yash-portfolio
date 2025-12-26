#!/bin/bash

# Quick Deployment Script
# This script helps you deploy your portfolio

echo "🚀 Portfolio Deployment Helper"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env.example template..."
    echo ""
    echo "Please create a .env file with:"
    echo "  MONGODB_URI=your-mongodb-connection-string"
    echo "  NODE_ENV=production"
    echo "  FRONTEND_URL=https://your-domain.com"
    echo ""
    read -p "Press enter to continue..."
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js 18+ required. Current: $(node -v)"
    echo "Please update Node.js"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check MongoDB connection string
if grep -q "mongodb://localhost" .env 2>/dev/null || grep -q "mongodb://localhost" .env.example 2>/dev/null; then
    echo "⚠️  WARNING: Using local MongoDB connection string"
    echo "For production, use MongoDB Atlas:"
    echo "  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio"
    echo ""
fi

echo "Choose deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Railway"
echo "3) Render"
echo "4) Heroku"
echo "5) Test locally first"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        vercel
        echo ""
        echo "✅ Don't forget to set environment variables in Vercel dashboard!"
        ;;
    2)
        echo ""
        echo "🚀 Deploying to Railway..."
        echo "1. Go to https://railway.app"
        echo "2. New Project → Deploy from GitHub"
        echo "3. Select this repository"
        echo "4. Add MongoDB service"
        echo "5. Set environment variables"
        ;;
    3)
        echo ""
        echo "🚀 Deploying to Render..."
        echo "1. Go to https://render.com"
        echo "2. New → Web Service"
        echo "3. Connect GitHub repository"
        echo "4. Set build: npm install"
        echo "5. Set start: node server.js"
        echo "6. Add MongoDB and environment variables"
        ;;
    4)
        echo ""
        echo "🚀 Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            echo "Installing Heroku CLI..."
            echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
        else
            echo "Creating Heroku app..."
            heroku create
            echo "Adding MongoDB..."
            heroku addons:create mongolab:sandbox
            echo "Setting environment variables..."
            heroku config:set NODE_ENV=production
            echo "Deploying..."
            git push heroku main
        fi
        ;;
    5)
        echo ""
        echo "🧪 Testing locally..."
        echo "Starting development server..."
        npm run dev
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed instructions, see:"
echo "  - GO_LIVE_CHECKLIST.md"
echo "  - DEPLOYMENT.md"
echo ""

