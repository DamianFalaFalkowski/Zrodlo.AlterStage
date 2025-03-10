import { DataTypes } from "sequelize";
import { BaseEntity } from "../_base/_base.entity";
import { AddressEntity } from "./address.entity";
import { OrderDeliveryEntity } from "./order-delivery.entity";
import { RecievePointEntity } from "./recieve-point.entity";
import { RentItemEntity } from "./rent-item.entity";
import { propertyOf } from "../../../../utils/type-properties.util";

export const OrderDeliveryActionModelName = 'OrderDeliveryActions'

export class OrderDeliveryActionEntity extends BaseEntity 
{
    public readonly entityName: string = OrderDeliveryActionModelName;

    // declare totalAmountToEarn: number;
    // declare comenstationRentPricePercentage: number;
    // declare compensationAmountFromRentPrice: number;
    // declare deliveryPrice: number;
    // declare montagePrice: number;
    // declare demontagePrice: number;
    // declare operatorPrice: number;
    // declare isResponded: boolean;
    // declare respondedAfterHours: number;
    // declare isRejected: boolean;
    // declare isCompleted: boolean;
    // declare actionType: OrderDeliveryActionActionEntity;

    declare RentalRecievePointId: number;
    public async getRecievePoint(): Promise<RecievePointEntity> {
        return this.getOwnedEntity<RecievePointEntity>(
            RecievePointEntity,
            this.RentalRecievePointId,
            propertyOf<OrderDeliveryActionEntity>('RentalRecievePointId'));
    };

    declare RentalOrderDeliveryId: number;
    public async getOrderDelivery(): Promise<OrderDeliveryEntity> {
        return this.getOwnedEntity<OrderDeliveryEntity>(
            OrderDeliveryEntity,
            this.RentalOrderDeliveryId,
            propertyOf<OrderDeliveryActionEntity>('RentalOrderDeliveryId'));
    };

    // declare actionSourceAddressId: number;
    // declare actionSourceAddress: AddressEntity;
    // declare actionDestinationAddressId: number;
    // declare actionDestinationAddress: AddressEntity;

    // declare rentItems: RentItemEntity[];
}

export const OrderDeliveryActionAttributes = {
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
    RentalOrderDeliveryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // model


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