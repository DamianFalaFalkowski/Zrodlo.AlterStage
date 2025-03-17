import { DataTypes } from "sequelize";
import { BaseEntity } from "../_base/_base.entity";
import { AddressEntity } from "./address.entity";
import { OrderDeliveryActionEntity } from "./order-delivery-action.entity";
import { RentItemEntity } from "./rent-item.entity";
import { RentOrderEntity } from "./rent-order.entity";
import { propertyOf } from "../../../../utils/type-properties.util";

// TODO: na razie kompletność i poprawność nie będzie realizowana. najpierw chcę obsłuyć operacje na strukturze z pominięciem funkcjonalności dostawy 
export const OrderDeliveryModelName = 'OrderDeliveries';

// TODO: dodać opisy
export class OrderDeliveryEntity 
    extends BaseEntity 
{
    public readonly entityName: string = OrderDeliveryModelName;

    declare totalDeliveryPrice: number;
    declare withDelivery: boolean;
    declare estimatedDeliveryDistance?: number;
    declare estimatedDeliveryPrice?: number;
    declare realDeliveryDistance?: number;
    declare realDeliveryPrice?: number;
    declare withMontage: boolean;
    declare montagePrice?: number;
    declare withOperator: boolean;
    declare operatorWorkingHours?: number;
    declare operatorPricePerHour?: boolean;
    declare operatorTotalPrice?: number;
    declare withDemontage: boolean;
    declare demontagePrice?: boolean;
    declare isOrderDeliveredToDestinationAddress: boolean;
    declare isOrderDeliveredToCustomer: boolean;
    declare isOrderReturnedByCustomer: boolean;
    declare isOrderReturnedToHomeRecievePoint: boolean;

    declare rentDeliveryPeriodFrom: Date;
    declare rentDeliveryPeriodUntil: Date;
    declare rentReturnPeriodFrom: Date;
    declare rentReturnPeriodUntil: Date;

/**
* ? OK */
    declare RentalAddressId: number;
    public async getDeliveryDestinationAddress(): Promise<AddressEntity>
    {
        return this.getOwnedEntity(AddressEntity,
            this.RentalAddressId,
            propertyOf<OrderDeliveryEntity>('RentalAddressId'));
    };

/**
* * OK */
    public async getRentOrder(): Promise<RentOrderEntity> 
    {
        return (await RentOrderEntity.findOne(
            { where: { RentalOfferRentItemId: this.id } }))!;
    };

    // TODO: napisać gettery

/**
* ! OK */
    // declare sourceRecievePointAddresses: AddressEntity[];

/**
* ! OK */
    // declare rentItems: RentItemEntity[];

/**
* ! OK */
    // declare orderDeliveryActions: OrderDeliveryActionEntity[];
}

export const OrderDeliveryAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    RentalRentOrderId: {
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
};