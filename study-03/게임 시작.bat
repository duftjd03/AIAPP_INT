@echo off
chcp 65001 >nul
cls

echo.
echo ================================================
echo.
echo   상식 퀴즈 게임 서버가 실행 중입니다
echo.
echo   웹 브라우저에서 다음 주소로 접속하세요:
echo   http://localhost:5173
echo.
echo   서버를 종료하려면 이 창을 닫으세요
echo.
echo ================================================
echo.

npm run dev
