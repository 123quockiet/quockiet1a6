@echo off
cd /d "%~dp0"
title Hat Giong Tro Tan - Web Server
echo ======================================================================
echo    KHOI DONG GAME HAT GIONG TRO TAN - DAI SO VECTO LOP 10
echo ======================================================================
echo.
echo [1/2] Dang mo trinh duyet tai http://localhost:8080/ ...
start "" "http://localhost:8080/index.html"
echo.
echo [2/2] Dang khoi chay Local Web Server qua Python...
echo (Luu y: Giu cua so nay mo trong suot qua trinh choi game)
echo.
python -m http.server 8080
if %errorlevel% neq 0 (
    echo.
    echo Port 8080 ban, dang thu chuyen sang Port 8000...
    start "" "http://localhost:8000/index.html"
    python -m http.server 8000
)
pause
