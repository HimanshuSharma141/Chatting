@echo off
echo Starting Chatty Development Environment...
taskkill /F /IM node.exe >nul 2>&1
echo Cleaned up existing node processes.

start "Chatty Backend" cmd /k "cd backend && npm run dev"
timeout /t 5 >nul
start "Chatty Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:5173 (or 5174)
echo.
pause
