import { Identifier } from "sequelize";
import { RecievePointEntity } from "../entities/recieve-point.entity";

export class RecievePointRepository{
    private constructor() {
    }

    public static async findByDiscordUserId(id: Identifier): Promise<RecievePointEntity | null> {
        return await RecievePointEntity.findOne(
            { where: { ownerDiscordId: id } });
    }

    public static async create(discordUserId: Identifier, addressId: Identifier, deliveryInfoId: Identifier, name: string, phoneNumber: string, email:string, description:string, ownerName:string, ownerLastName:string, ownerDiscordId: Identifier, lastOwnerDiscordName: string, recievePointCityCode: string, isActive?: boolean): Promise<RecievePointEntity>
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
                isActive: isActive,
                recievePointCityCode: recievePointCityCode
            });
        }

    public static async attachToRentOffer(recievePoint: RecievePointEntity, offerId: Identifier): Promise<void> 
        {
            await RecievePointEntity.sequelize!.query(`INSERT INTO "main"."Rental_RentOffersToRecievePoints"
    ("RentalRentOfferId", "RentalRecievePointId")
    VALUES (${offerId}, ${recievePoint.id});`);
        }
}