import { BaseEntity } from "../_base/_base-entity.model";
import { RentOfferEntity } from "./rent-offer.model";

export const OfferInfoModelName = 'OfferInfo'

export class OfferInfoEntity extends BaseEntity 
{
    declare infoMessage: string;

    declare rentOfferId: number;
    declare rentOffer: RentOfferEntity;
}

export const OfferInfoAttributes = {
}