import {Page} from "@playwright/test";
import ExcelJS from 'exceljs';


export class ImAamFunctionLibrary {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async configTestFlow() {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('./testData.xlsx');
        const worksheet = workbook.getWorksheet('testFlow');
        if (!worksheet) {
            throw new Error("Worksheet 'testFlow' not found in ./testData.xlsx");
        }

        const urlCell = worksheet.getCell('A1').value;
        const url = typeof urlCell === 'string' ? urlCell : String(urlCell || '');
        if (!url) {
            throw new Error("Cell A1 in worksheet 'testFlow' does not contain a valid URL.");
        }

        await this.page.goto(url);

        await this.page.click('text=Accept All Cookies');
        await this.page.click('text=Get Started');
    }

}