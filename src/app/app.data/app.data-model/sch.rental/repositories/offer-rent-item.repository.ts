import { Identifier, Sequelize } from "sequelize";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { OfferRentItemEntity } from "../offer-rent-item.entity";
import { RentItem_RentOrder_Hash } from "../hash-tables/rent-item-to-rent-order.hash-entity";
import { RentOffer_OfferRentItem_Hash, RentOfferToOfferRentItemEntityName } from "../hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { RentOfferEntity } from "../rent-offer.entity";
import sequelize from "sequelize/types/sequelize";

export class OfferRentItemRepository {
    private constructor(){}

    public static async create(discordUserId: number, itemName:string, brandName:string, modelName:string, rentItemSize: RentItemSize,
        isMainRentItem?: boolean
    ): Promise<OfferRentItemEntity>
    {
        return OfferRentItemEntity.create({
            createdDiscordUserId: discordUserId,
            itemName: itemName,
            brandName:brandName,
            modelName:modelName,
            rentItemSize:rentItemSize,
            isMainRentItem:isMainRentItem
        });
    }

    public static async attachToRentOffer(id: Identifier, offerId: Identifier)
    {
        OfferRentItemEntity.sequelize!.query(`INSERT INTO "main"."Rental_RentOfferToOfferRentItems"
("RentalRentOfferId", "RentalOfferRentItemId")
VALUES (${offerId}, ${id});`)
    }
}