@echo off
echo ============================================================
echo  Food Delivery System - Development Setup
echo ============================================================
echo.

REM --- Backend Setup ---
echo [1/4] Creating Python virtual environment...
python -m venv env
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment. Is Python installed?
    pause
    exit /b 1
)

echo [2/4] Installing Python dependencies...
call env\Scripts\activate
pip install -r requirements.txt --quiet
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies.
    pause
    exit /b 1
)

echo [3/4] Running Alembic database migrations...
alembic upgrade head
if %errorlevel% neq 0 (
    echo ERROR: Alembic migrations failed.
    pause
    exit /b 1
)

echo [4/4] Seeding initial data...
python backend\seed_db.py
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed the database.
    pause
    exit /b 1
)

REM --- Frontend Setup ---
echo.
echo [5/5] Installing frontend dependencies...
cd frontend
npm install --silent
if %errorlevel% neq 0 (
    echo ERROR: npm install failed. Is Node.js installed?
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================================
echo  Setup complete! Run runapplication.bat to start the app.
echo ============================================================
pause
