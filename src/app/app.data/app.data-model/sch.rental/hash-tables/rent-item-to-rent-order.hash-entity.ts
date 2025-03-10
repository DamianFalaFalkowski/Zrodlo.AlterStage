import { Model } from "sequelize";

export const RentItemToRentOrderModelName = 'RentItemsToRentOrders'

export class RentItem_RentOrder_Hash extends Model
{
    declare RentalRentItemId: number;
    declare RentalRentOrderId: number;
}