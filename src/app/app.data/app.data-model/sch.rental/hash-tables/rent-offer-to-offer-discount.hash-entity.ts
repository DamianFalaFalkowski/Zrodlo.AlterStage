import { Model } from "sequelize";

export const RentOfferToOfferDiscountModelName = 'RentOffersToOfferDiscountss'

export class RentOffer_OfferDiscount_Hash extends Model
{
    // TODO: PILNE! zaimplementować abstrakcyjną klasę bazową i metody wspierające pobieranie encji powiązanych z przesłanym id
    declare RentalRentOfferId: number;
    declare RentalOfferDiscountId: number;
}