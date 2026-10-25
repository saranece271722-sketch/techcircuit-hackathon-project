@echo off
title Office Info Controller - Enterprise Server
echo ============================================================
echo   STARTING OFFICE INFO CONTROLLER ENTERPRISE SERVER...
echo ============================================================
echo   Directory: %~dp0
echo   Launching application in browser...
echo ============================================================
cd /d "%~dp0"
start http://localhost:8080/index.html
if exist "C:\Users\HAI\AppData\Local\Programs\Thonny\python.exe" (
    "C:\Users\HAI\AppData\Local\Programs\Thonny\python.exe" serve.py
) else (
    python serve.py
)
pause
