import { Identifier } from "sequelize";
import { RentItemEntity } from "../rent-item.entity";
import { RentItemAviablility } from "../enums/rent-item-aviablility.enum";

export class RentItemRepository {
    private constructor(){}

    public static async create(discordUserId: number, recievePointId: Identifier, code:string, barcodeNumber:number, rentItemAviabilityInHomeRecievePoint:RentItemAviablility, 
        onBuyAmountSpent?:number, isAvaliable?:boolean, isDamaged?:boolean, 
    ): Promise<RentItemEntity>
    {
        return RentItemEntity.create({
            createdDiscordUserId: discordUserId,
            RentalRecievePointId: recievePointId,
            code:code,
            barcodeNumber:barcodeNumber,
            rentItemAviabilityInHomeRecievePoint:rentItemAviabilityInHomeRecievePoint,
            onBuyAmountSpent:onBuyAmountSpent,
            isAvaliable:isAvaliable,
            isDamaged:isDamaged
        });
    }
}