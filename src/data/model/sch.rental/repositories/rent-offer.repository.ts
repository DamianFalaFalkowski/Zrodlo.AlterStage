import { RentOfferEntity } from "../entities/rent-offer.entity";


export class RentOfferRepository{
    private constructor() {
    }

    public static async create(discordUserId: number, name: string, description: string, totalPrice: number, totalDepositPrice: number, imageUrl: string): Promise<RentOfferEntity>
    {
        return await RentOfferEntity.create({
            name: name,
            description: description,
            createdDiscordUserId: discordUserId,
            totalPrice: totalPrice,
            totalDepositPrice: totalDepositPrice,
            imageUrl: imageUrl,
        })
    }

    public static async getAllActiveWithRelations(): Promise<RentOfferEntity[]>
    {
        return await RentOfferEntity.findAll(
            { where: { isActive: true}}
        );
    }
}