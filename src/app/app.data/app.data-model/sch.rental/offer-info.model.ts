import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { RentOfferEntity } from "./rent-offer.model";

export const OfferInfoModelName = 'OfferInfos'

export class OfferInfoEntity extends BaseEntity 
{
    // declare infoMessage: string;

    // declare rentOfferId: Identifier;
    // declare rentOffer: RentOfferEntity;
};

export const OfferInfoAttributes = {
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