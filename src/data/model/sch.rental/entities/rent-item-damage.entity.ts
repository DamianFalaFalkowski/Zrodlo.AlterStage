import { DataTypes } from "sequelize";
import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { RentItemEntity } from "./rent-item.entity";
import { RentOrderEntity } from "./rent-order.entity";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RentItemDamageModelName = 'RentItemDamages'

// TODO: dodać i zformatować opisy
export class RentItemDamageEntity extends BaseEntity 
{
    public readonly entityName: string = RentItemDamageModelName;

    declare payerDiscordClientId: string;
    declare lastPayerDiscordClientName: string;

    declare damageDescription: string;
    declare isRepaired: boolean;
    declare canBeRepaired: boolean;
    declare repairDescription?: string;
    declare repairCost?: number;
    declare repairDate?: Date;
    declare damageDate: Date;

    declare RentalRentItemId: number;
    public async getRentItem(): Promise<RentItemEntity>
    {
        return await this.getOwnedEntity(RentItemEntity, 
            this.RentalRentItemId, 
            propertyOf<RentItemDamageEntity>('RentalRentItemId'));
    }

/**
 * * OK */
    declare RentalRentOrderId: number;
    public async getRentOrder(): Promise<RentOrderEntity>
    {
        return await this.getOwnedEntity(RentOrderEntity, 
            this.RentalRentOrderId, 
            propertyOf<RentItemDamageEntity>('RentalRentOrderId'));
    }
}

export const RentItemDamageAttributes = {
    //pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    // fks
    RentalRentItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalRentOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    payerDiscordClientId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastPayerDiscordClientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    damageDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isRepaired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canBeRepaired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    repairDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    repairCost: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    repairDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    damageDate: {
        type: DataTypes.DATE,
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