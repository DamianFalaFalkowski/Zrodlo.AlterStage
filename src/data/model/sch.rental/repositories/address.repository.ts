import { AddressEntity } from "../entities/address.entity";


export class AddressRepository {
    private constructor() {
    }
    
    public static async create(discordUserId: number, city: string, street: string, house: string,  postalCode: string, flat?: string, googleMapsPin?: string): Promise<AddressEntity>  
    {
        return AddressEntity.create({
            createdDiscordUserId: discordUserId,
            city: city,
            street: street,
            house: house,
            flat: flat,
            postalCode: postalCode,
            googleMapsPin: googleMapsPin
        });
    }
}