@echo off
REM Pre-deployment Testing Script for Windows
REM This script runs all tests and checks before building and deploying

echo 🚀 Starting pre-deployment testing...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Please run this script from the project root.
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo ✅ Installing dependencies...
    call npm ci
) else (
    echo ✅ Dependencies already installed
)

REM Run type checking
echo ✅ Running TypeScript type checking...
call npm run type-check
if errorlevel 1 (
    echo ❌ Type checking failed
    exit /b 1
)
echo ✅ Type checking passed

REM Run linting
echo ✅ Running ESLint...
call npm run lint
if errorlevel 1 (
    echo ⚠️  Linting issues found. Attempting to fix...
    call npm run lint:fix
    if errorlevel 1 (
        echo ❌ Linting issues could not be auto-fixed
        exit /b 1
    )
    echo ✅ Linting issues auto-fixed
) else (
    echo ✅ Linting passed
)

REM Run API tests
echo ✅ Running API tests...
call npm run test:api
if errorlevel 1 (
    echo ❌ API tests failed
    exit /b 1
)
echo ✅ API tests passed

REM Run client tests
echo ✅ Running client tests...
call npm run test:client
if errorlevel 1 (
    echo ❌ Client tests failed
    exit /b 1
)
echo ✅ Client tests passed

REM Run all tests with coverage
echo ✅ Running full test suite with coverage...
call npm run test:coverage
if errorlevel 1 (
    echo ❌ Tests failed
    exit /b 1
)
echo ✅ All tests passed with coverage

REM Verify build
echo ✅ Verifying build process...
call npm run build
if errorlevel 1 (
    echo ❌ Build verification failed
    exit /b 1
)
echo ✅ Build verification passed

REM Check build output
if exist "dist" if exist "dist\server\index.js" (
    echo ✅ Build output verified
) else (
    echo ❌ Build output not found or incomplete
    exit /b 1
)

echo.
echo 🎉 All pre-deployment checks passed!
echo ✅ Type checking: PASSED
echo ✅ Linting: PASSED
echo ✅ API tests: PASSED
echo ✅ Client tests: PASSED
echo ✅ Full test suite: PASSED
echo ✅ Build verification: PASSED
echo.
echo 🚀 Ready for deployment!

REM Optional: Show test coverage summary
echo.
echo 📊 Test Coverage Summary:
call npx vitest run --coverage --reporter=text | findstr /R "Statements Branches Functions Lines"

pause
