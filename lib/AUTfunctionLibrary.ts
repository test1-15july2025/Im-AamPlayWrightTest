import { Page } from "@playwright/test";
// import ExcelJS from 'exceljs';
import * as ExcelJS from 'exceljs';


export class AUTfunctionLibrary {
  // private page: Page;
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  // public url: string;
  url: string = '';
  filePath: string = 'test-data/testData.xlsx';

  async configTestFlow() {
    // const workbook = new ExcelJS.Workbook();
    // await workbook.xlsx.readFile(this.filePath);
    // const worksheet = workbook.getWorksheet('testFlow');
    // if (!worksheet) {
    //     throw new Error("Worksheet 'testFlow' not found in test-data/testData.xlsx");
    // }

    // // const urlCell = worksheet.getCell('A1').value;
    // const urlCell = worksheet.getCell('A1').value;
    // this.url = typeof urlCell === 'string' ? urlCell : String(urlCell || '');
    // if (!this.url) {
    //     throw new Error("Cell A1 in worksheet 'testFlow' does not contain a valid URL.");
    // }

    this.url = await this.getFirstRowValueByHeader('testFlow', 'Environment URL');


    // console.log('URL from Excel:', this.url);
    // await this.page.goto(this.url);

    // await this.page.click('text=Accept All Cookies');
    // await this.page.click('text=Get Started');
  }


  async getFirstRowValueByHeader(sheetName: string, columnName: string): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.filePath);

    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
      throw new Error(`Worksheet with name "${sheetName}" not found.`);
    }

    // Row 1 is typically the Header row
    const headerRow = worksheet.getRow(1);
    let targetColumnIndex = -1;

    // Find the column index that matches your column name
    headerRow.eachCell((cell, colNumber) => {
      if (cell.text.trim() === columnName.trim()) {
        targetColumnIndex = colNumber;
      }
    });

    if (targetColumnIndex === -1) {
      throw new Error(`Column "${columnName}" not found in sheet "${sheetName}".`);
    }

    // Row 2 is the first row of actual data
    const firstDataRow = worksheet.getRow(2);
    const cellValue = firstDataRow.getCell(targetColumnIndex).text;

    return cellValue || '';
  }


  async logIn(userName: string, password: string) {
    // await this.page.goto(this.url);
    await this.navigateToBaseUrl();
    await this.page.waitForLoadState('load');
    await this.page.getByText('Login').waitFor({ state: 'visible' });
    await this.page.getByText('Login').click();
    await this.page.getByPlaceholder('Enter your username or email').fill(userName);
    await this.page.getByPlaceholder('Enter Password').fill(password);
    await this.page.locator("button:has-text('Login')").click();
    await this.page.waitForLoadState('load');
  }

  async handleUnexpectedPopup() {
    const popupSelectors = [
      // "button:has-text('Close')",
      "div:has-text('Close')",
      // "button:has-text('No thanks')",
      // "button:has-text('Skip')",
      // "button:has-text('Accept')",
      // "button:has-text('OK')",
      // "[aria-label*='close' i]",
      // "[aria-label*='Close' i]",
      // ".close",
      // ".modal-close",
      // "div[role='dialog'] button",
    ];

    for (const selector of popupSelectors) {
      try {
        await this.page.locator(selector).first().click({ timeout: 1000 });
        return true;
      } catch {
        // Ignore if the selector is not present or not clickable.
      }
    }

    try {
      // await this.page.keyboard.press('Escape');
      await this.page.locator('#dismiss-button').click({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  async safeWaitForTimeout(milliseconds: number) {
    if (this.page.isClosed()) {
      return false;
    }

    try {
      await this.page.waitForTimeout(milliseconds);
      return true;
    } catch {
      return false;
    }
  }

  async navigateToBaseUrl() {
    for (let i = 0; i < 4; i++) {
      try {
        await this.page.goto(this.url, {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        });
        await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => undefined);
        await this.handleUnexpectedPopup();

        if (await this.page.locator('body').count().catch(() => 0) > 0) {
          break;
        }
      } catch (error) {
        console.warn(`Navigation attempt ${i + 1} failed: ${error instanceof Error ? error.message : String(error)}`);
        await this.safeWaitForTimeout(1000);
      }
    }
  }



  async getAccountBalance(): Promise<string> {
    const balanceText = await this.page.locator("a[class^='header_balanceDisplay']").textContent();
    return balanceText ? balanceText.trim() : '';
  }


}