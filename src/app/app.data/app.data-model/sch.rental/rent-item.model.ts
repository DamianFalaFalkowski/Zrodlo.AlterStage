import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferRentItemEntity } from "./offer-rent-item.model";
import { RecievePointEntity } from "./recieve-point.model";
import { RentItemDamageEntity } from './rent-item-damage.model';
import { RentOrderEntity } from "./rent-order.model";
import { DataTypes } from "sequelize";
import { ApplicationError } from "../../../app.errors/application.error";
import { RentItemToOfferRentItemEntity } from "./hash-tables/rent-item-to-offer-rent-item.model";

export const RentItemModelName = 'RentItems'

export class RentItemEntity extends BaseEntity
{
    declare id: number;
    declare code: string;
    declare barcodeNumber: string;
    declare isAvialible: boolean;
    declare isDamaged: boolean;
    declare isRented: boolean;

    declare amountEarned: number;
    declare amountSpent: number;
    declare amountSpentOnRepairs: number;

    declare rentItemAviabilityInHomeRecievePoint: RentItemAviablility;

    declare homeRecievePointId: number;
    //declare homeRecievePoint: RecievePointEntity;

    public get offerRentItems() { 
        return RentItemToOfferRentItemEntity.findAll({
            where: { 'rentItemId': this.id }
        })
    }
    //declare damages: RentItemDamageEntity[];
    //declare rentOrders: RentOrderEntity[];
}

export const RentItemAttributes = 
{


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
    }
}