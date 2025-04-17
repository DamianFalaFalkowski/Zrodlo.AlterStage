import { Identifier } from "sequelize";
import { RentItemAviablility } from "../enums/rent-item-aviablility.enum";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { OfferRentItemRepository } from "./offer-rent-item.repository";
import { RecievePointEntity } from "../entities/recieve-point.entity";
import { RentItemEntity } from "../entities/rent-item.entity";
import { RecievePointRepository } from "./recieve-point.repository";
import { _barcodeGenerationService } from "../../../../modules/rental.module/services/barcode-generation.service";

// 1024238253060145193
// 1024238253060145152
export class RentItemRepository {

    public static async createWithExistingOfferRentItemId(
        discordUserId: Identifier, 
        offerRentItemId: Identifier,
        rentItemAviabilityInHomeRecievePoint:RentItemAviablility, 
        onBuyAmountSpent?:number
    ): Promise<RentItemEntity>
    {
        const itemKindCode = await OfferRentItemRepository.getItemKindCode(offerRentItemId);
        const recievePoint = await RecievePointRepository.findByDiscordUserId(discordUserId);
        const itemsCount = await RentItemEntity.findAndCountAll();
        return RentItemEntity.create({
            createdDiscordUserId: discordUserId,
            RentalOfferRentItemId: offerRentItemId,
            RentalRecievePointId: recievePoint?.id,
            code: `${recievePoint?.getRecievePointCode()}_${itemKindCode}${itemsCount.count+1}`,
            barcodeNumber: await _barcodeGenerationService.generateUniqueDigitStrings(),
            rentItemAviabilityInHomeRecievePoint:rentItemAviabilityInHomeRecievePoint,
            onBuyAmountSpent:onBuyAmountSpent,
            isAvaliable:true,
            isDamaged:false
        });
    }

    public static async createWithExistingOfferRentItem(discordUserId: number, offerRentItemId: Identifier, recievePoint: RecievePointEntity, productCode:string, barcodeNumber:number, rentItemAviabilityInHomeRecievePoint:RentItemAviablility, 
        onBuyAmountSpent?:number, isAvaliable?:boolean, isDamaged?:boolean, 
    ): Promise<RentItemEntity>
    {
        const itemsCount = await RentItemEntity.findAndCountAll();
        return RentItemEntity.create({
            createdDiscordUserId: discordUserId,
            RentalOfferRentItemId: offerRentItemId,
            RentalRecievePointId: recievePoint.id,
            code: `${recievePoint.getRecievePointCode()}_${productCode}${itemsCount.count+1}`,
            barcodeNumber:barcodeNumber,
            rentItemAviabilityInHomeRecievePoint:rentItemAviabilityInHomeRecievePoint,
            onBuyAmountSpent:onBuyAmountSpent,
            isAvaliable:isAvaliable,
            isDamaged:isDamaged
        });
    }

    public static async createWithNewOfferRentItem(discordUserId: number,
        itemName:string, 
        brandName:string, 
        modelName:string, 
        rentItemSize: RentItemSize,
        recievePoint: RecievePointEntity, 
        itemKindCode:string, 
        barcodeNumber:number, rentItemAviabilityInHomeRecievePoint:RentItemAviablility,
        onBuyAmountSpent?:number, 
        isAvaliable?:boolean, isDamaged?:boolean, 
    ): Promise<RentItemEntity>
    {
        let offerRentItem = await OfferRentItemRepository.create(discordUserId, itemName, brandName, modelName, rentItemSize, itemKindCode);

        return this.createWithExistingOfferRentItem(discordUserId, offerRentItem.id, recievePoint, itemKindCode, barcodeNumber, rentItemAviabilityInHomeRecievePoint, onBuyAmountSpent, isAvaliable, isDamaged)
    }

    public static async getAllBarcodes(): Promise<string[]> {
        const rentItems = await RentItemEntity.findAll();
        const barcodes = rentItems.map(item => item.barcodeNumber);
        return barcodes;
    }
}