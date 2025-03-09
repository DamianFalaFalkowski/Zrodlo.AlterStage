import { DataTypes, FindOptions, Identifier, INTEGER, ModelStatic } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { CustomerDiscountHistoryEntity } from "./customer-discount-history.model";
import { CustomerEntity } from "./customer.model";
import { OrderStatus } from "./enums/order-status.enum";
import { OrderDeliveryEntity } from "./order-delivery.model";
import { RentItemDamageEntity } from "./rent-item-damage.model";
import { RentOfferEntity } from "./rent-offer.model";
import { RecievePointEntity } from "./recieve-point.model";
import { EntityNotFoundByPkError } from "../../../app.errors/entity-not-found-by-this-pk.error";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RentOrderModelName = 'RentOrders'

export class RentOrderEntity extends BaseEntity 
{
    public entityName: string = RentOrderModelName;

    // declare status: OrderStatus;
    // declare payedAmount: number;
    // declare onHoldDepositeAmount: number;
    // declare totalAmount: number;
    // declare discountAmount: number;
    // declare taxPercent: number;
    // declare taxAmount: number;
    // declare depositeAmount: number;
    // declare depositeReturnedAmount: number;
    // declare damagesFixingCost: number;
    // declare damagesFixingCostOverDepositedAmount: number;
    // declare dipositeDiscountAmount: number;
    // declare rentPeriodFrom: Date;
    // declare rentPeriodUntil: Date;
    // declare hasDelivery: boolean;
    // declare hasOperator: boolean;
    // declare hasMontage: boolean;
    // declare hasDemontage: boolean;
    // declare areItemsReturned: boolean;
    // declare isPaymentDone: boolean;
    // declare isDepositeLeftToBeReturned: boolean;

    declare RentalRecievePointId: Identifier;
    public async getRecievePoint(): Promise<RecievePointEntity> {
        return this.getOwnedEntity<RecievePointEntity>(
            RecievePointEntity, 
            this.RentalRecievePointId, 
            propertyOf<RentOrderEntity>('RentalRecievePointId'));
    };

    declare RentalCustomerId: Identifier;
    public async getCustomer(): Promise<CustomerEntity> {
        return this.getOwnedEntity<CustomerEntity>(
            CustomerEntity, 
            this.RentalCustomerId, 
            propertyOf<RentOrderEntity>('RentalCustomerId'));
    };

    public async getOrderDelivery(): Promise<OrderDeliveryEntity> {
        return (await OrderDeliveryEntity.findOne({where: { RentalDeliveryInfoId: this.id } }))!;
    };

    // declare itemDamages: RentItemDamageEntity[];
    // declare offers: RentOfferEntity[];
    // declare appliedDoscounts: CustomerDiscountHistoryEntity[];
}

export const RentOrderAttributes = {
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
    RentalCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalOrderDeliveryId: {
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