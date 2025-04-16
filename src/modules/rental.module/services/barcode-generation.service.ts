import { RentItemEntity } from "../../../data/model/sch.rental/entities/rent-item.entity";
import { RentItemRepository } from "../../../data/model/sch.rental/repositories/rent-item.repository";

class BarcodeGenerationService {
    private static _isDataLoaded: boolean = false;
    private static _generatedBarcodes: string[] = [];


    private static generateRandomDigitString(length: number = 10): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    public static async generateUniqueDigitStrings(length: number = 10): Promise<string> {
        if(!BarcodeGenerationService._isDataLoaded)
        {
            this._generatedBarcodes = await RentItemRepository.getAllBarcodes();
            BarcodeGenerationService._isDataLoaded = true;
        }
        const uniqueString = this.generateRandomDigitString(length);
        BarcodeGenerationService._generatedBarcodes.push(uniqueString);
        return uniqueString;
    }
}

export const _barcodeGenerationService = BarcodeGenerationService;