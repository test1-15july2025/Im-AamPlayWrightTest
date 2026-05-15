@echo off
@REM call npx playwright test tests/homepageUI.spec.ts
call npx playwright test tests
echo Now about to end...
echo HTML report is generated at ....\playwright-report\index.html
pause