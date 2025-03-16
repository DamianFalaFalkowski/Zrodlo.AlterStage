import { RentOfferEntity } from "../rent-offer.entity";

export class RentOfferRepository{
    private constructor() {
    }

    public static async create(discordUserId: number, name: string, description: string): Promise<RentOfferEntity>
        {
            return await RentOfferEntity.create({
                name: name,
                description: description,
                createdDiscordUserId: discordUserId
            })
        }
}