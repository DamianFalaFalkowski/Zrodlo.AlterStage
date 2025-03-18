import { DeliveryInfoEntity } from "../entities/delivery-info.entity";
import { RentItemAviablility } from "../enums/rent-item-aviablility.enum";

export class DeliveryInfoRepository {
    private constructor() {
        }
        
        public static async create(discordUserId: number, 
            standardDeliveryAreaDescription: string, 
            isAvaliableOutsideStandardArea: boolean,
            baseRentItemsAviability: RentItemAviablility,

            allowsDelivery?: boolean,
            allowsMontage?: boolean,
            allowsDemontage?: boolean,
            allowsOperator?: boolean,
            needsDelivery?: boolean,
            needsMontage?: boolean,
            needsDemontage?: boolean,
            needsOperator?: boolean,
            maxDeliveryDistance?: number,
            standardDeliveryPrice?: number,
            deliveryPricePerKm?: number,
            operatorPricePerHour?: number,
            montagePrice?: number,
            demontagePrice?: number,
            ): Promise<DeliveryInfoEntity>  
        {
            return DeliveryInfoEntity.create({
                createdDiscordUserId: discordUserId,
                standardDeliveryAreaDescription: standardDeliveryAreaDescription,
                isAvaliableOutsideStandardArea: isAvaliableOutsideStandardArea,
                baseRentItemsAviability: baseRentItemsAviability,
                allowsDelivery: allowsDelivery,
                allowsMontage: allowsMontage,
                allowsDemontage: allowsDemontage,
                allowsOperator: allowsOperator,
                needsDelivery: needsDelivery,
                needsMontage: needsMontage,
                needsDemontage: needsDemontage,
                needsOperator: needsOperator,
                maxDeliveryDistance: maxDeliveryDistance,
                standardDeliveryPrice: standardDeliveryPrice,
                deliveryPricePerKm: deliveryPricePerKm,
                operatorPricePerHour: operatorPricePerHour,
                montagePrice: montagePrice,
                demontagePrice: demontagePrice
            });
        }
}