import { BaseEntity } from "../_base/_base-entity.model";
import { RentItemSize } from "./enums/rent-item-size.enum";
import { RentItemEntity } from "./rent-item.model";

export const OfferRentItemModelName = 'Order'

export class OfferRentItemEntity extends BaseEntity 
{
    declare isMainRentItem: boolean;
    declare itemName: string;
    declare producentName: string
    declare modelName: string;
    declare description?: string;
    declare rentItemSize: RentItemSize;

    declare customerId: number;
    declare phisicalRentItems: RentItemEntity[];
}

export const OfferRentItemAttributes = 
{
}