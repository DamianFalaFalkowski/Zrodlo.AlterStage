import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base-entity.model";
import { CustomerEntity } from "./customer.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentOrderEntity } from "./rent-order.model";

export const CustomerDiscountHistoryModelName = 'CustomerDiscountHistory';
export class CustomerDiscountHistoryEntity extends BaseEntity 
{
    // declare savedAmount: number;
    // declare giftEstimatedValue: number;
    // declare beforeDiscountAmount: number;

    // declare appliedOnOrderId: Identifier;
    // declare appliedOnOrder: RentOrderEntity;
    // declare customerId: Identifier;
    // declare customer: CustomerEntity;
    // declare offerDiscountId: Identifier;
    // declare offerDiscount: OfferDiscountEntity;

}

export const CustomerDiscountHistoryAttributes = 
{
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
};