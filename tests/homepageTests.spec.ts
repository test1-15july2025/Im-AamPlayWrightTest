import { test, expect, Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
// import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { AUTfunctionLibrary } from '../lib/AUTfunctionLibrary';
import { CommonFunctionLibrary } from '../lib/CommonFunctionLibrary';
import { HomePage } from '../page-objects/homePage-objects';

test.describe.configure({ mode: 'serial', timeout: 180000 }); // Run tests in this block sequentially

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;

let auTfl: AUTfunctionLibrary;
let cfl: CommonFunctionLibrary;


// export class HomePageUItest {
// constructor(page: Page) {
//   this.page = page;
// }

// Get browser type from environment or default to chromium
const browserType = process.env.BROWSER_TYPE === 'firefox' ? firefox : process.env.BROWSER_TYPE === 'webkit' ? webkit : chromium;

test.beforeAll('Launch browser', async () => {
  console.log('Setup: Preparing environment...');

  browser = await browserType.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  context = await browser.newContext({
    viewport: null,
    deviceScaleFactor: undefined,
    isMobile: false,
  });
  page = await context.newPage();
  auTfl = new AUTfunctionLibrary(page);
  cfl = new CommonFunctionLibrary(page);
  homePage = new HomePage(page);
  await auTfl.configTestFlow();
  console.log('URL from Excel:', auTfl.url);
  await auTfl.navigateToBaseUrl();
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => undefined);
});

test.afterAll(async () => {
  console.log('Teardown: Cleaning up environment...');
  await page?.close().catch(() => undefined);
  await context?.close().catch(() => undefined);
  await browser?.close().catch(() => undefined);
});

test('Verify that home page has the correct title', async () => {
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => undefined);
  await expect(page).toHaveTitle('Automation Exercise', { timeout: 10000 });
});

test('Home page has expected UI elements', async ({ }, testInfo) => {
  // Check for the presence of key UI elements.
  await homePage.verifyUiElements();

  if (testInfo.errors.length > 0) {
    console.error('Test failed with errors:', testInfo.errors);
  } else {
    console.log('Test passed without errors.');
  }
});

test('Navigation to different links should work correctly', async ({ }, testInfo) => {
  // Verify that navigation to different links works correctly.
  await homePage.verifyNavigateToDifferentLinks();

  if (testInfo.errors.length > 0) {
    console.error('Test failed with errors:', testInfo.errors);
  } else {
    console.log('Test passed without errors.');
  }
});


// }