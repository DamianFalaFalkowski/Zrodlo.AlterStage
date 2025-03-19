import { Identifier } from "sequelize";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { OfferRentItemEntity } from "../entities/offer-rent-item.entity";

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