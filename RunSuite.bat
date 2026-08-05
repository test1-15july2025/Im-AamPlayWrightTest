@echo off
@REM call npx playwright test tests/addToCartFlowTests.spec.ts
call npx playwright test tests --workers=1
@REM call npx playwright test tests --workers=1
echo Now about to end...
echo HTML report is generated at ....\playwright-report\index.html
pause