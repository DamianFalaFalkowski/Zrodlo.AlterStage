import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { OrderDeliveryActionActionEntity } from "./order-delivery-action.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";

export const OrderDeliveryModelName = 'OrderDeliveries'

export class OrderDeliveryEntity extends BaseEntity 
{
    declare totalDeliveryPrice: number;
    declare withDelivery: boolean;
    declare estimatedDeliveryDistance?: number;
    declare estimatedDeliveryPrice?: number;
    declare realDeliveryDistance?: number;
    declare realDeliveryPrice?: number;
    declare withMontage: boolean;
    declare montagePrice?: number;
    declare withOperator: boolean;
    declare operatorWorkingHours?: number;
    declare operatorPricePerHour?: boolean;
    declare operatorTotalPrice?: number
    declare withDemontage: boolean;
    declare demontagePrice?: boolean;
    declare isOrderDeliveredToDestinationAddress: boolean;
    declare isOrderDeliveredToCustomer: boolean;
    declare isOrderReturnedByCustomer: boolean;
    declare isOrderReturnedToHomeRecievePoint: boolean;

    declare rentDeliveryPeriodFrom : Date;
    declare rentDeliveryPeriodUntil : Date;
    declare rentReturnPeriodFrom : Date;
    declare rentReturnPeriodUntil : Date;

    declare deliveryDestinationAddressId: number;
    declare deliveryDestinationAddress: AddressEntity;

    declare rentOrderId: number;
    declare rentOrder: RentOrderEntity;

    declare sourceRecievePointAddresses: AddressEntity[];
    declare rentItems: RentItemEntity[];
    declare orderDeliveryActions: OrderDeliveryActionActionEntity[];
}

export const OrderDeliveryAttributes = {

}