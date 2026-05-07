import { test, expect, Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Get browser type from environment or default to chromium
const browserType = process.env.BROWSER_TYPE === 'firefox' ? firefox : process.env.BROWSER_TYPE === 'webkit' ? webkit : chromium;

test.beforeAll('Launch browser', async () => {
  console.log('Setup: Preparing environment...');

  browser = await browserType.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  context = await browser.newContext({
    // viewport: null,
    httpCredentials: {
      username: 'test',
      password: 'test',
    },
  });
  page = await context.newPage();
  await page.goto('https://staging.im-aam.com/');
  // Perform any necessary setup actions here, such as logging in or preparing test data.
  // await browser.close();  
});

test.afterAll(async () => {
  console.log('Teardown: Cleaning up environment...');
  await page.close();
  await context.close();
  await browser.close();
});

test('has title', async () => {
// test('has title', async ({ page }) => {
  // await page.goto('https://staging.im-aam.com/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Im-Aam/);
  await expect(page).toHaveTitle(/AI Picks/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://staging.im-aam.com/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
