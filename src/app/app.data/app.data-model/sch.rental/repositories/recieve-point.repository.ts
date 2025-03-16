import { Identifier } from "sequelize";
import { RecievePointEntity } from "../recieve-point.entity";

export class RecievePointRepository{
    private constructor() {
    }

    public static async create(discordUserId: number, addressId: Identifier, deliveryInfoId: Identifier, name: string, phoneNumber: string, email:string, description:string, ownerName:string, ownerLastName:string, ownerDiscordId: number, lastOwnerDiscordName: string, isActive?: boolean): Promise<RecievePointEntity>
        {
            return await RecievePointEntity.create({
                createdDiscordUserId: discordUserId,
                RentalAddressId : addressId,
                RentalDeliveryInfoId: deliveryInfoId,
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                description: description,
                ownerName: ownerName,
                ownerLastName: ownerLastName,
                ownerDiscordId: ownerDiscordId,
                lastOwnerDiscordName: lastOwnerDiscordName,
                isActive: isActive
            });
        }
}