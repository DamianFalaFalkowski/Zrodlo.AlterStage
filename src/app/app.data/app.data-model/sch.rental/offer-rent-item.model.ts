import { DataTypes } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { RentItemSize } from "./enums/rent-item-size.enum";

export const OfferRentItemModelName = 'OfferRentItems'

export class OfferRentItemEntity extends BaseEntity {
    declare isMainRentItem: boolean;
    declare itemName: string;
    declare brandName?: string
    declare modelName?: string;
    declare description?: string;
    declare rentItemSize: RentItemSize;

    //declare phisicalRentItems: RentItemEntity[];
}

export const OfferRentItemAttributes =
{
    isMainRentItem: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modelName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rentItemSize: {
        type: DataTypes.ENUM(...Object.values(RentItemSize)),
        allowNull: false
    },

    // from base
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    },
}