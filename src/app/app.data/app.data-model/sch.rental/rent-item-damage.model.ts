import { DataTypes } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";
import { ApplicationError } from "../../../app.errors/application.error";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RentItemDamageModelName = 'RentItemDamages'

export class RentItemDamageEntity extends BaseEntity 
{
    public entityName: string = RentItemDamageModelName;

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
    declare RentalRentItemId: number;
    public async getRentItem(): Promise<RentItemEntity>
    {
        return await this.getOwnedEntity<RentItemEntity>(RentItemEntity, this.RentalRentItemId, propertyOf<RentItemDamageEntity>('RentalRentItemId'));
    }

    declare RentalRentOrderId: number;
    public async getRentOrder(): Promise<RentOrderEntity>
    {
        return await this.getOwnedEntity<RentOrderEntity>(RentOrderEntity, this.RentalRentItemId, propertyOf<RentItemDamageEntity>('RentalRentOrderId'));
    }
}

export const RentItemDamageAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    RentalRentItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalRentOrderId: {
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