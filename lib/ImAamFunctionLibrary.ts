import {Page} from "@playwright/test";
import ExcelJS from 'exceljs';


export class ImAamFunctionLibrary {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    // public url: string;
    url: string = '';

    async configTestFlow() {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('./testData.xlsx');
        const worksheet = workbook.getWorksheet('testFlow');
        if (!worksheet) {
            throw new Error("Worksheet 'testFlow' not found in ./test-data/testData.xlsx");
        }

        // const urlCell = worksheet.getCell('A1').value;
        const urlCell = worksheet.getCell('A1').value;
        this.url = typeof urlCell === 'string' ? urlCell : String(urlCell || '');
        if (!this.url) {
            throw new Error("Cell A1 in worksheet 'testFlow' does not contain a valid URL.");
        }

        await this.page.goto(this.url);

        await this.page.click('text=Accept All Cookies');
        await this.page.click('text=Get Started');
    }

}