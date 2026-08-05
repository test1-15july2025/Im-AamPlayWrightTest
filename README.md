# Automation-Exercises

This repository contains a Playwright-based automation framework for verifying the Automation Exercise website.

## Prerequisites

- Node.js 18+ installed
- npm available in your PATH
- Windows/macOS/Linux operating system
- Internet access to the AUT (`https://automationexercise.com`)
- Optional: a terminal that supports environment variables for `BROWSER_TYPE`

## Setup Instructions

1. Open the repository root in VS Code.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers if they are not already installed:

   ```bash
   npx playwright install
   ```

4. Confirm the test data file exists:

   - `test-data/testData.xlsx`
   - The file should include a worksheet named `testFlow`
   - The first row should contain a header column `Environment URL`
   - The second row should contain the URL for the AUT

## Steps to Execute the Test Suite

Run the default Playwright suite from the repository root:

```bash
npm test
```

This executes `playwright test` as configured in `package.json`.

### Run a specific browser

The suite supports switching browser types with the `BROWSER_TYPE` environment variable.

- Chromium (default):
  ```bash
  npm test
  ```
- Firefox:
  ```bash
  set BROWSER_TYPE=firefox && npm test
  ```
- WebKit:
  ```bash
  set BROWSER_TYPE=webkit && npm test
  ```

### Notes

- Tests are currently configured to run in headed mode (`headless: false`).
- Test reports are generated in `playwright-report/`.

## Framework Structure

- `package.json` - npm scripts and dependencies.
- `playwright.config.ts` - Playwright test configuration, browser projects, reporters, and timeouts.
- `tsconfig.json` - TypeScript compiler configuration.
- `tests/` - Playwright test spec files:
  - `addToCartFlowTests.spec.ts`
  - `homepageTests.spec.ts`
- `page-objects/` - Page object model classes used by tests:
  - `homePage-objects.ts`
  - `e2eFlowPage-objects.ts`
- `lib/` - reusable helper libraries and utilities:
  - `AUTfunctionLibrary.ts`
  - `CommonFunctionLibrary.ts`
  - `dataHelper.ts`
  - `webActions.ts`
- `test-data/` - test data sources such as Excel files.
- `playwright-report/` - generated HTML report output folder.
- `test-results/` - location for additional test artifacts or results.

## Assumptions

- The AUT is reachable at the URL stored in `test-data/testData.xlsx`.
- The `testFlow` worksheet exists and contains a header column named `Environment URL`.
- The test account used in `E2eFlowPageObjects.verifyAddToCartFlow()` exists and is valid:
  - Email: `test1_1@yopmail.com`
  - Password: `Test@123`
- The tests depend on visible page elements and standard navigation flows from `automationexercise.com`.
- Tests are written to handle some unexpected popups, but the website must still be stable enough for automation.
- `npm install` and `npx playwright install` are available and execute without permission issues.

## Troubleshooting

- If the browser does not launch, verify Playwright browsers are installed with `npx playwright install`.
- If the test data file is missing or invalid, add `test-data/testData.xlsx` with the expected worksheet and header.
- If login fails, verify the credentials in the test code or create a matching account on the AUT.

---

Enjoy using the Automation-Exercises framework! If you want, I can also add a sample `test-data/testData.xlsx` template or a `CONTRIBUTING.md` file.