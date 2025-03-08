import { BaseEntity } from "../../_base/_base-entity.model";

export const RentItemToOfferRentItemModelName = 'RentItemsToOfferRentItems'

export class RentItemToOfferRentItemEntity extends BaseEntity
{
    declare rentItemId: number;
    declare offerRentItemId: number;
}
