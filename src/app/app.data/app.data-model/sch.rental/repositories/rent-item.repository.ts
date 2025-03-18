import { Identifier } from "sequelize";
import { RentItemEntity } from "../entities/rent-item.entity";
import { RentItemAviablility } from "../enums/rent-item-aviablility.enum";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { OfferRentItemRepository } from "./offer-rent-item.repository";
import { RecievePointEntity } from "../entities/recieve-point.entity";

export class RentItemRepository {
    private constructor(){}

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
        itemName:string, brandName:string, modelName:string, rentItemSize: RentItemSize,
        recievePoint: RecievePointEntity, code:string, barcodeNumber:number, rentItemAviabilityInHomeRecievePoint:RentItemAviablility, isMainRentItem?: boolean,
        onBuyAmountSpent?:number, isAvaliable?:boolean, isDamaged?:boolean, 
    ): Promise<RentItemEntity>
    {
        const offerRentItem = await OfferRentItemRepository.create(discordUserId, itemName, brandName, modelName, rentItemSize, isMainRentItem);

        return this.createWithExistingOfferRentItem(discordUserId, offerRentItem.id, recievePoint, code, barcodeNumber, rentItemAviabilityInHomeRecievePoint, onBuyAmountSpent, isAvaliable, isDamaged)
    }
}