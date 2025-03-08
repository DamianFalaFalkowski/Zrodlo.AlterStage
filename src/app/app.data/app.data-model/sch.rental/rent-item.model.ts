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
    declare code: string;
    declare barcodeNumber: string;
    declare isAvialible: boolean;
    declare isDamaged: boolean;
    declare isRented: boolean;

    declare totalAmountEarned: number;
    declare totalAmountSpent: number;
    declare totalAmountSpentOnRepairs: number;

    declare rentItemAviabilityInHomeRecievePoint: RentItemAviablility;

    declare homeRecievePointId: number;
    public async gethomeRecievePoint(): Promise<RecievePointEntity> {
        const rp = await RecievePointEntity.findByPk(this.homeRecievePointId);
        if (rp !== undefined && rp !== null) return rp;
        throw new ApplicationError(`Required foreginKey 'homeRecievePointId' with value '${this.homeRecievePointId} has no corresponding 'homeRecievePoint' entity.'`);
    }

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
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    barcodeNumber: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },
    isAvaliable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isDamaged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isRented: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    totalAmountEarned: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    totalAmountSpent: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    totalAmountSpentOnRepairs: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    rentItemAviabilityInHomeRecievePoint: {
        type: DataTypes.ENUM(...Object.values(RentItemAviablility)),
        allowNull: false
    },
    homeRecievePointId: {
       type: DataTypes.NUMBER,
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
    // from base
}