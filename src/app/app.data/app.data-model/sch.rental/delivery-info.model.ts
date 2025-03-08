import { RecievePointEntity } from "./recieve-point.model";
import { RentOfferEntity } from "./rent-offer.model";
import { BaseEntity } from "../_base/_base-entity.model";
import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { DataTypes, Identifier } from "sequelize";

export const DeliveryInfoModelName = 'DeliveryInfos'

export class DeliveryInfoEntity extends BaseEntity 
{
    // declare isAvaliable: boolean;
    // declare isNeeded: boolean;
    // declare standardDeliveryAreaDescription?: string;
    // declare isAvaliableOutsideStandardArea: boolean;
    // declare maxDeliveryDistance?: number;
    // declare standardDeliveryPrice?: number;
    // declare deliveryPricePerKm?: number;
    // declare baseRentItemsAviability: RentItemAviablility;

    // declare rentOfferId: Identifier;
    // declare recievePointId: Identifier;
    // declare rentOffer: RentOfferEntity;
    // declare recievePoint: RecievePointEntity;

    // declare allowsMontage: boolean;
    // declare allowsDemontage: boolean;
    // declare allowsOperator: boolean;

    // declare needsMontage: boolean;
    // declare needsDemontage: boolean;
    // declare needsOperator: boolean;

    // declare operatorPricePerHour?: number;
    // declare montagePrice?: number;
    // declare demontagePrice?: number;
}

export const DeliveryInfoAttributes = {
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