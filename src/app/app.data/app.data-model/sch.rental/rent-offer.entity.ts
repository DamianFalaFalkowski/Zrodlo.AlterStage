import { RentItemAviablility } from './enums/rent-item-aviablility.enum';
import { BaseEntity } from "../_base/_base.entity";
import { OfferRentItemEntity } from './offer-rent-item.entity';
import { OfferDiscountEntity } from './offer-discount.entity';
import { OfferInfoEntity } from './offer-info.entity';
import { RecievePointEntity } from './recieve-point.entity';
import { OrderDeliveryEntity } from './order-delivery.entity';
import { DataTypes, ModelStatic } from 'sequelize';
import { RentOffer_RentOrder_Hash } from './hash-tables/rent-offer-to-rent-order.hash-entity';
import { BaseHashEntity } from '../_base/_base.hash-entity';
import { RentOrderEntity } from './rent-order.entity';

export const RentOfferModelName = 'RentOffers'

// TODO: rozkminić czy rabaty powinny byc naliczane zawsze od kwoty bazowej czy kazdy rabat powinien byc naliczany od kwoty po poprzednim rabacie?
export class RentOfferEntity 
    extends BaseEntity 
{
    // TODO: prsawdopodobnie brakuje czesci pol - sprawdzic to
    // TODO: dodać opisy
    public readonly entityName: string = RentOfferModelName;

    declare name: string;
    declare description: string;
    declare totalPrice: number;
    declare totalDepositPrice: number;

// TODO: zaimplementowac gettery
    // declare includes: OfferRentItemEntity[];
    // declare avaliableRecievePoints: RecievePointEntity[];
    // declare offerDiscounts: OfferDiscountEntity[];
    // declare offerInfo: OfferInfoEntity[];

/**
* ! OK - to powinna realizowac encja bazowa tabeli haszującej */
    public async getRentOrders<RentOrderEntity>(repository: ModelStatic<RentOffer_RentOrder_Hash>): Promise<RentOrderEntity[]>
    {
         throw new Error() //await RentOffer_RentOrder_Hash.getRelated<
    }
}

export const RentOfferAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    // (dodaj tutaj klucze obce, jeśli są potrzebne)

    // columns
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    totalDepositPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

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