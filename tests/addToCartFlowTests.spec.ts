import { test, expect, Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { appendFile } from 'fs/promises';
import { resolve } from 'path';
// import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
// import { WebActions } from '../lib/webActions';
// import { generateRandomEmail } from '../lib/dataHelper';
import { AUTfunctionLibrary } from '../lib/AUTfunctionLibrary';
import { CommonFunctionLibrary } from '../lib/CommonFunctionLibrary';
import { E2eFlowPageObjects } from '../page-objects/e2eFlowPage-objects';

test.describe.configure({ mode: 'serial', timeout: 180000 }); // Run tests in this block sequentially

let browser: Browser;
let context: BrowserContext;
let page: Page;
let auTfl: AUTfunctionLibrary;
let cfl: CommonFunctionLibrary;
let e2eFlowPageObjects: E2eFlowPageObjects;

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
  e2eFlowPageObjects = new E2eFlowPageObjects(page);
  await auTfl.configTestFlow();
  console.log('URL from Excel:', auTfl.url);
  await auTfl.navigateToBaseUrl();
});

test.afterAll(async () => {
  console.log('Teardown: Cleaning up environment...');
  await page?.close().catch(() => undefined);
  await context?.close().catch(() => undefined);
  await browser?.close().catch(() => undefined);
});

test('Verify add to cart functionality is working fine', async ({ }, testInfo) => {
  await e2eFlowPageObjects.verifyAddToCartFlow();

  if (testInfo.errors.length > 0) {
    console.error('Test failed with errors:', testInfo.errors);
  } else {
    console.log('Test passed without errors.');
  }  
});