import { Identifier } from "sequelize";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { OfferRentItemEntity } from "../entities/offer-rent-item.entity";

export class OfferRentItemRepository {
    private constructor(){}

    public static async create(discordUserId: number, itemName:string, brandName:string, modelName:string, rentItemSize: RentItemSize
    ): Promise<OfferRentItemEntity>
    {
        return OfferRentItemEntity.create({
            createdDiscordUserId: discordUserId,
            itemName: itemName,
            brandName:brandName,
            modelName:modelName,
            rentItemSize:rentItemSize
        });
    }

    

    public static async attachToRentOffer(offerRentItem: OfferRentItemEntity, offerId: Identifier, isMainRentItem: boolean)
    {
        await OfferRentItemEntity.sequelize!.query(`INSERT INTO "main"."Rental_RentOfferToOfferRentItems"
("RentalRentOfferId", "RentalOfferRentItemId")
VALUES (${offerId}, ${offerRentItem.id});`);

        await offerRentItem.update({isMainRentItem: isMainRentItem})
    }
}