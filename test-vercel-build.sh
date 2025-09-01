#!/bin/bash

echo "🧪 Testing Vercel Build Process..."

# Clean previous builds
echo "📦 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Run TypeScript check
echo "🔍 Running TypeScript check..."
npm run check

# Build client
echo "🏗️ Building client..."
npm run build:client

# Build server
echo "🏗️ Building server..."
npm run build:server

# Check if build outputs exist
echo "✅ Checking build outputs..."
if [ -d "dist/public" ]; then
    echo "✅ Client build successful - dist/public exists"
    ls -la dist/public/
else
    echo "❌ Client build failed - dist/public not found"
    exit 1
fi

if [ -f "dist/index.js" ]; then
    echo "✅ Server build successful - dist/index.js exists"
else
    echo "❌ Server build failed - dist/index.js not found"
    exit 1
fi

echo "🎉 All builds successful! Ready for Vercel deployment."
echo ""
echo "📋 Next steps:"
echo "1. Commit and push your changes to GitHub"
echo "2. Connect your repository to Vercel"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Deploy!"
