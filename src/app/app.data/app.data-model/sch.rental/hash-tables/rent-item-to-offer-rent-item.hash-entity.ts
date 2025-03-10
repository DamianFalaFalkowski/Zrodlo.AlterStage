import { Model } from "sequelize";

export const RentItemToOfferRentItemModelName = 'RentItemsToOfferRentItems'

export class RentItem_OfferRentItem_Hash extends Model
{
    declare RentalRentItemId: number;
    declare RentalOfferRentItemId: number;
}
