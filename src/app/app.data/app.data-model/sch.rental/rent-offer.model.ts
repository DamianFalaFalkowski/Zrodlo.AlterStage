import { RentItemAviablility } from './enums/rent-item-aviablility.enum';
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferRentItemEntity } from './offer-rent-item.model';
import { OfferDiscountEntity } from './offer-discount.model';
import { OfferInfoEntity } from './offer-info.model';
import { RecievePointEntity } from './recieve-point.model';

export const RentOfferModelName = 'RentOffer'

// TODO: rozkminić czy rabaty powinny byc naliczane zawsze od kwoty bazowej czy kazdy rabat powinien byc naliczany od kwoty po poprzednim rabacie?
export class RentOfferEntity extends BaseEntity {
    declare id: number
    declare name: string;
    declare description: string;
    declare createdUserId: string;
    declare price: number;
    declare depositPrice: number;
    declare contactPhoneNumber: string;

    declare includes: OfferRentItemEntity[];
    declare avaliableRecievePoints: RecievePointEntity[];
    declare offerDiscounts: OfferDiscountEntity[];
    declare offerInfo: OfferInfoEntity[];
}

export const RentOfferAttributes = {
    // TODO: add attributes
}