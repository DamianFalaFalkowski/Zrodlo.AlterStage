import { DataTypes } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";
import { ApplicationError } from "../../../app.errors/application.error";

export const RentItemDamageModelName = 'RentItemDamages'

export class RentItemDamageEntity extends BaseEntity 
{
    // declare payerDiscordClientId: string;
    // declare lastPayerDiscordClientName: string;

    // declare damageDescription: string;
    // declare isRepaired: boolean;
    // declare canBeRepaired: boolean;
    // declare repairDescription?: string;
    // declare repairCost?: number;
    // declare repairDate?: Date;
    // declare damageDate: Date;

    // declare entitlesToDiscountId?: number;
    // declare entitlesToDiscount?: OfferDiscountEntity;
    declare rentItemId: number;
    public async getRentItem(): Promise<RentItemEntity>
    {
        const rp = await RentItemEntity.findByPk(this.rentItemId);
            if (rp !== undefined && rp !== null) return rp;
            throw new ApplicationError(`Required foreginKey 'homeRecievePointId' with value '${this.rentItemId} has no corresponding 'homeRecievePoint' entity.'`);
    }
    // declare rentOrder: RentOrderEntity;
    // declare rentOrderId: number;
}

export const RentItemDamageAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    rentItemId: {
        type: DataTypes.INTEGER,
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
    },
}