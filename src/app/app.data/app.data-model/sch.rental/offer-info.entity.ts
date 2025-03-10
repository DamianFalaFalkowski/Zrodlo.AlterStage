import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base.entity";
import { RentOfferEntity } from "./rent-offer.entity";
import { propertyOf } from "../../../../utils/type-properties.util";

export const OfferInfoModelName = 'OfferInfos'
/** Reprezentuje dodatkowe informacje dot. oferty najmu */
export class OfferInfoEntity extends BaseEntity 
{
    public readonly entityName: string = OfferInfoModelName;

    /** Treść informacji dot. oferty */
    declare infoMessage: string;

    /** Id oferty najmu której dotyczy informacja */
    declare RentalRentOfferId: Identifier;
    /** Wykonuje query i zwraca obiekt oferty najmu */
    public async getOrderDelivery(): Promise<RentOfferEntity> {
        return this.getOwnedEntity<RentOfferEntity>(
            RentOfferEntity, 
            this.RentalRentOfferId, 
            propertyOf<OfferInfoEntity>('RentalRentOfferId'));
    };
};

export const OfferInfoAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    RentalRentOfferId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    infoMessage: {
        type: DataTypes.STRING,
        allowNull: false
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