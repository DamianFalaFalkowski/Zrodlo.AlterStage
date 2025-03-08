import { RentItemAviablility } from './enums/rent-item-aviablility.enum';
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferRentItemEntity } from './offer-rent-item.model';
import { OfferDiscountEntity } from './offer-discount.model';
import { OfferInfoEntity } from './offer-info.model';
import { RecievePointEntity } from './recieve-point.model';
import { OrderDeliveryEntity } from './order-delivery.model';
import { DataTypes } from 'sequelize';

export const RentOfferModelName = 'RentOffers'

// TODO: rozkminić czy rabaty powinny byc naliczane zawsze od kwoty bazowej czy kazdy rabat powinien byc naliczany od kwoty po poprzednim rabacie?
export class RentOfferEntity extends BaseEntity 
{
    // declare name: string;
    // declare description: string;
    // declare price: number;
    // declare depositPrice: number;
    // declare contactPhoneNumber: string;

    // declare includes: OfferRentItemEntity[];
    // declare avaliableRecievePoints: RecievePointEntity[];
    // declare offerDiscounts: OfferDiscountEntity[];
    // declare offerInfo: OfferInfoEntity[];
}

export const RentOfferAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // ...

    // from base
    createdAt: {
        type: DataTypes.DATE,
        secondaryKey: true,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    updatedDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};