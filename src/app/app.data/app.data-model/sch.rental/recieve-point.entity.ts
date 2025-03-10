import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base.entity";
import { AddressEntity } from "./address.entity";
import { DeliveryInfoEntity } from "./delivery-info.entity";
import { RentItemEntity } from "./rent-item.entity";
import { RentOrderEntity } from "./rent-order.entity";
import { EntityNotFoundByPkError } from "../../../app.errors/entity-not-found-by-this-pk.error";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RecievePointModelName = 'RecievePoints'

// TODO: dodać opisy
export class RecievePointEntity extends BaseEntity 
{
    public readonly entityName: string = RecievePointModelName;

    declare name: string;
    declare phoneNumber: string;
    declare email: string;
    declare description: string;
    declare ownerName: string;
    declare ownerLastName: string;
    declare ownerDiscordId: string;
    declare lastOwnerDiscordName: string;
    declare isActive: boolean;

    declare RentalDeliveryInfoId: Identifier;
    public async getDeliveryInfo(): Promise<DeliveryInfoEntity>
    {
        return await this.getOwnedEntity(DeliveryInfoEntity, 
            this.RentalDeliveryInfoId, 
            propertyOf<RecievePointEntity>('RentalDeliveryInfoId'));
    };

    declare RentalAddressId: number;
    public async getAddress(): Promise<AddressEntity>
    {
        return await this.getOwnedEntity(AddressEntity, 
            this.RentalAddressId, 
            propertyOf<RecievePointEntity>('RentalAddressId'));
    }

/**
* ! OK */
    // declare rentItems: RentItemEntity[];
/**
* * OK */
    public async getRentOrders(): Promise<RentOrderEntity[]>
    {
        return await RentOrderEntity.findAll(
            { where: { RentalOrderRentItemId: this.id } });
    }
}

export const RecievePointAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    RentalDeliveryInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerDiscordId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastOwnerDiscordName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
};

// TODO: dodanie modeli odpowiedzialnych za transport pomiedzy punktami odbioru oraz rozliczenie za obsługę transportu