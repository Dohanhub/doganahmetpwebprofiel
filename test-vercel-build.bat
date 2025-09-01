@echo off
echo 🧪 Testing Vercel Build Process...

REM Clean previous builds
echo 📦 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\.cache rmdir /s /q node_modules\.cache

REM Install dependencies
echo 📥 Installing dependencies...
npm install

REM Run TypeScript check
echo 🔍 Running TypeScript check...
npm run check

REM Build client
echo 🏗️ Building client...
npm run build:client

REM Build server
echo 🏗️ Building server...
npm run build:server

REM Check if build outputs exist
echo ✅ Checking build outputs...
if exist dist\public (
    echo ✅ Client build successful - dist/public exists
    dir dist\public
) else (
    echo ❌ Client build failed - dist/public not found
    exit /b 1
)

if exist dist\index.js (
    echo ✅ Server build successful - dist/index.js exists
) else (
    echo ❌ Server build failed - dist/index.js not found
    exit /b 1
)

echo 🎉 All builds successful! Ready for Vercel deployment.
echo.
echo 📋 Next steps:
echo 1. Commit and push your changes to GitHub
echo 2. Connect your repository to Vercel
echo 3. Set environment variables in Vercel dashboard
echo 4. Deploy!
pause
