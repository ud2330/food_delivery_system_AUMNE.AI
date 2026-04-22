@echo off
echo ============================================================
echo  Food Delivery System - Starting Application
echo ============================================================
echo.

REM Check if virtual environment exists
if not exist "env\Scripts\activate" (
    echo ERROR: Virtual environment not found.
    echo Please run setupdev.bat first.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "frontend\node_modules" (
    echo ERROR: Frontend dependencies not found.
    echo Please run setupdev.bat first.
    pause
    exit /b 1
)

echo [1/2] Starting FastAPI backend on http://localhost:8000 ...
start "Food Delivery - Backend" cmd /k "call env\Scripts\activate && python main.py"

REM Wait briefly for the backend to initialize
timeout /t 3 /nobreak > nul

echo [2/2] Starting React frontend on http://localhost:5173 ...
start "Food Delivery - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ============================================================
echo  Application is starting up:
echo    Backend  : http://localhost:8000
echo    API Docs : http://localhost:8000/docs
echo    Frontend : http://localhost:5173
echo ============================================================
echo.
echo Both windows have been launched. Close them to stop the app.
pause
