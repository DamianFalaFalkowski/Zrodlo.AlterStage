import { RentOrderEntity } from "./rent-order.model";
import { AddressEntity } from "./address.model";
import { RentItemDamageEntity } from "./rent-item-damage.model";
import { BaseEntity } from "../_base/_base-entity.model";
import { DataTypes, Identifier } from "sequelize";
import { propertyOf } from "../../../../utils/type-properties.util";

export const CustomerModelName = 'Customers'
export class CustomerEntity extends BaseEntity 
{
    // declare discordProfileId: string; // eg.352579442176163841
    // declare lastDiscordGuildProfileName: string;
    // declare name: string;
    // declare lastName: string;
    // declare email: string;
    // declare phone: string;

    declare RentAddressId?: Identifier;
    public async getAddressIfExists(): Promise<AddressEntity | undefined>
    {
        if(this.RentAddressId === undefined)
            return undefined;
        return await this.getOwnedEntity(AddressEntity, 
            this.RentAddressId, 
            propertyOf<CustomerEntity>('RentAddressId'));
    };

    // declare orders: RentOrderEntity[];
    // declare causedDamages: RentItemDamageEntity[];
}

export const CustomerAttributes = {
    // pk
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
    // fks
    RentalRecievePointId: {
       type: DataTypes.INTEGER,
       allowNull: false, 
    },

    // columns

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