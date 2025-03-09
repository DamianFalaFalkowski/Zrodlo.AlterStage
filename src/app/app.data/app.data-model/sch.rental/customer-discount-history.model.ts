import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { CustomerEntity } from "./customer.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentOrderEntity } from "./rent-order.model";
import { propertyOf } from "../../../../utils/type-properties.util";

export const CustomerDiscountHistoryModelName = 'CustomerDiscountHistory';
export class CustomerDiscountHistoryEntity extends BaseEntity 
{
    // declare savedAmount: number;
    // declare giftEstimatedValue: number;
    // declare beforeDiscountAmount: number;

    declare RentalRentOrderId: Identifier;
    public async geRentOrder(): Promise<RentOrderEntity> {
        return this.getOwnedEntity(RentOrderEntity, this.RentalRentOrderId, propertyOf<CustomerDiscountHistoryEntity>('RentalRentOrderId'));
    };

    declare RentalCustomerId: Identifier;
    public async geCustomer(): Promise<CustomerEntity> {
        return this.getOwnedEntity(CustomerEntity, this.RentalCustomerId, propertyOf<CustomerDiscountHistoryEntity>('RentalCustomerId'));
    };

    declare RentalOfferDiscountId: Identifier;
    public async geOfferDiscount(): Promise<OfferDiscountEntity> {
        return this.getOwnedEntity(OfferDiscountEntity, this.RentalOfferDiscountId, propertyOf<CustomerDiscountHistoryEntity>('RentalOfferDiscountId'));
    };
}

export const CustomerDiscountHistoryAttributes = 
{
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
    RentalRentCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalOfferDiscountId: {
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