import { Model } from "sequelize";
import { RentItemAviablility } from './enums/rent-item-aviablility.enum';
import { RentItemEntity } from "./rent-item.model";

export const RentOfferModelName = 'RentOffer'

export class RentOfferEntity extends Model {
    declare id: number
    declare name: string;
    declare description: string;
    declare userId: string;
    declare createdUserId: string;
    declare price: number;
    declare depositPrice: number;
    declare aviablility: RentItemAviablility;
    declare contactPhoneNumber: string;
    declare includes: RentItemEntity[];
    // TODO: add more fields
}

export const RentOfferAttributes = {
    // TODO: add attributes
}