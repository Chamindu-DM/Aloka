#!/bin/bash

echo "🚀 Setting up Aloka Frontend..."

# Navigate to frontend directory
cd "$(dirname "$0")"

# Step 1: Remove old files
echo ""
echo "📁 Cleaning up old files..."
if [ -f "src/App.tsx" ]; then
    rm src/App.tsx
    echo "✅ Removed old src/App.tsx"
fi

if [ -f "src/App.css" ]; then
    rm src/App.css
    echo "✅ Removed old src/App.css"
fi

# Step 2: Create .env file if it doesn't exist
echo ""
echo "🔧 Setting up environment variables..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo "⚠️  Please update the values in .env as needed"
else
    echo "ℹ️  .env file already exists"
fi

# Step 3: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "📦 Installing additional required packages..."
npm install react-router-dom @tanstack/react-query axios

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start the development server with: npm run dev"
echo ""
