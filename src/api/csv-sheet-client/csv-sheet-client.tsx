import Papa from "papaparse";

import { CompanyInfo } from "../../types/company-row";
import { IndexedDBService } from "../storage-api/storage-api";

export class CSVSheetClient {

    private db = IndexedDBService.getInstance<CompanyInfo>('sheet', 'table')

    private saveToCache(data: CompanyInfo[]) {
        this.db.storeArray(data)
    }

    private getFromCache() {
        return this.db.retrieveArray()
    }

    async updateRow(index: number, data: CompanyInfo ) {
       await this.db.updateArrayElementByIndex(index, data)
    }

    async getTableFull(): Promise<CompanyInfo[]> {
        
        const data = await this.getFromCache();

        if (data?.length && data.length > 0) {
            return await this.getFromCache() ?? []
        }

        try {
            const response = await fetch(import.meta.env['VITE_BASE_API_SHEET_URL']);
            const csvData = await response.text();
            const data = Papa.parse(csvData, {
                header: true,
            });

            this.saveToCache(data.data as CompanyInfo[])
            return data.data as CompanyInfo[];
        } catch (error) {
            return []
        }
    }

}