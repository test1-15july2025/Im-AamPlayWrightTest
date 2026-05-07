@echo off
call npx playwright test tests/homepageUI.spec.ts
echo Now about to end...
echo HTML report is generated at ....\target\surefire-reports\emailable-report.html
pause