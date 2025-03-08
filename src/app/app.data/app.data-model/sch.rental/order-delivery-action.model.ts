import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { OrderDeliveryEntity } from "./order-delivery.model";
import { RecievePointEntity } from "./recieve-point.model";
import { RentItemEntity } from "./rent-item.model";

export const OrderDeliveryActionModelName = 'OrderDeliveryActions'

export class OrderDeliveryActionActionEntity extends BaseEntity 
{
    declare totalAmountToEarn: number;
    declare comenstationRentPricePercentage: number;
    declare compensationAmountFromRentPrice: number;
    declare deliveryPrice: number;
    declare montagePrice: number;
    declare demontagePrice: number;
    declare operatorPrice: number;
    declare isResponded: boolean;
    declare respondedAfterHours: number;
    declare isRejected: boolean;
    declare isCompleted: boolean;
    declare actionType: OrderDeliveryActionActionEntity;

    declare recievePointId: number;
    declare recievePoint: RecievePointEntity;
    declare orderDeliveryId: number;
    declare orderDelivery: OrderDeliveryEntity;
    declare actionSourceAddressId: number;
    declare actionSourceAddress: AddressEntity;
    declare actionDestinationAddressId: number;
    declare actionDestinationAddress: AddressEntity;

    declare rentItems: RentItemEntity[];
}

export const OrderDeliveryActionAttributes ={
    
}