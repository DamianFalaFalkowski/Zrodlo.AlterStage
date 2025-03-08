import { RentOrderEntity } from "./rent-order.model";
import { AddressEntity } from "./address.model";
import { RentItemDamageEntity } from "./rent-item-damage.model";
import { BaseEntity } from "../_base/_base-entity.model";
import { DataTypes, Identifier } from "sequelize";

export const CustomerModelName = 'Customers'

export class CustomerEntity extends BaseEntity 
{
    // declare discordProfileId: string; // eg.352579442176163841
    // declare lastDiscordGuildProfileName: string;
    // declare name: string;
    // declare lastName: string;
    // declare email: string;
    // declare phone: string;

    // declare addressId?: Identifier;
    // declare address?: AddressEntity;
    // declare orders: RentOrderEntity[];
    // declare causedDamages: RentItemDamageEntity[];
}

export const CustomerAttributes = {
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
}