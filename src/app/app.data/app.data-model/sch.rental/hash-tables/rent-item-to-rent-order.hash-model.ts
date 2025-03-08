import { BaseEntity } from "../../_base/_base-entity.model";

export const RentItemToRentOrderModelName = 'RentItemsToRentOrders'

export class RentItem_RentOrder_Hash extends BaseEntity
{
    declare RentalRentItemId: number;
    declare RentalRentOrderId: number;
}