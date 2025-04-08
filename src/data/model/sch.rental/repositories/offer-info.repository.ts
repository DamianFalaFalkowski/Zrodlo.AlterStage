import { Identifier } from "sequelize";
import { OfferInfoEntity } from "../entities/offer-info.entity";

export class OfferInfoRepository {
    public static async create(discordUserId: number, rentOfferId: Identifier, infoMessage: string): Promise<OfferInfoEntity> 
    {
        return await OfferInfoEntity.create({
            createdDiscordUserId: discordUserId, 
            RentalRentOfferId: rentOfferId,
            infoMessage: infoMessage
        });
    }
}