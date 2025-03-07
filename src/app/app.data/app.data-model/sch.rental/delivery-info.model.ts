import { RecievePointEntity } from "./recieve-point.model";
import { RentOfferEntity } from "./rent-offer.model";
import { BaseEntity } from "../_base/_base-entity.model";
import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";

export const DeliveryInfoModelName = 'DeliveryInfo'

export class DeliveryInfoEntity extends BaseEntity 
{
    declare id: number;
    declare isAvaliable: boolean;
    declare isNeeded: boolean;
    declare standardDeliveryAreaDescription?: string;
    declare isAvaliableOutsideStandardArea: boolean;
    declare maxDeliveryDistance?: number;
    declare standardDeliveryPrice?: number;
    declare deliveryPricePerKm?: number;
    declare baseRentItemsAviability: RentItemAviablility;

    declare rentOfferId: number;
    declare recievePointId: number;
    declare rentOffer: RentOfferEntity;
    declare recievePoint: RecievePointEntity;

    declare allowsMontage: boolean;
    declare allowsDemontage: boolean;
    declare allowsOperator: boolean;

    declare needsMontage: boolean;
    declare needsDemontage: boolean;
    declare needsOperator: boolean;

    declare operatorPricePerHour?: number;
    declare montagePrice?: number;
    declare demontagePrice?: number;
}

export const DeliveryInfoAttributes = {
}