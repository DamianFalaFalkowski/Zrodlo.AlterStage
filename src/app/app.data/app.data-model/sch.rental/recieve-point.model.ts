import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { DeliveryInfoEntity } from "./delivery-info.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";
import { EntityNotFoundByPkError } from "../../../app.errors/entity-not-found.error";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RecievePointModelName = 'RecievePoints'

export class RecievePointEntity extends BaseEntity 
{
    // declare name: string;
    // declare phoneNumber: string;
    // declare email: string;
    // declare description: string;
    // declare ownerName: string;
    // declare ownerLastName: string;
    // declare ownerDiscordId: string;
    // declare lastOwnerDiscordName: string;
    // declare isActive: boolean;

    declare RentalDeliveryInfoId: Identifier;
    public async getDeliveryInfo(): Promise<DeliveryInfoEntity>
    {
        return await this.getOwnedEntity(DeliveryInfoEntity, 
            this.RentalDeliveryInfoId, 
            propertyOf<RecievePointEntity>('RentalDeliveryInfoId'));
    };

    // declare addressId: number;
    // declare address: AddressEntity;

    // declare rentItems: RentItemEntity[];
    // declare orders: RentOrderEntity[];
}

export const RecievePointAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    RentalDeliveryInfoId: {
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
    }
};

// TODO: dodanie modeli odpowiedzialnych za transport pomiedzy punktami odbioru oraz rozliczenie za obsługę transportu