import { DataTypes, Identifier } from "sequelize";
import { RentOrderEntity } from "./rent-order.entity";
import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { OfferDiscountEntity } from "./offer-discount.entity";
import { CustomerEntity } from "./customer.entity";
import { propertyOf } from "../../../../utils/type-properties.util";


export const CustomerDiscountHistoryModelName = 'CustomerDiscountHistory';
/** Historyczna znika uzytkownika
** Reprezentuje znikę udzieloną dla zamówienia. Powstaje w momencie zaakceptowania zamówienia przez obie strony.
* TODO: zformatować opisy */
export class CustomerDiscountHistoryEntity extends BaseEntity 
{
    public readonly entityName: string = CustomerDiscountHistoryModelName;

    /** Kwota zaoszczędzona dzięki znizce. Wartość 'null' kiedy znizka nie rabatowała ceny. */
    declare savedAmount?: number;

    /** Szacowana wartość prezentów promocyjnych. Wartość 'null' kiedy znika nie posiadała prezentów */
    declare giftEstimatedValue?: number;

    /** Wartość zamówienia bez znziek */
    declare beforeDiscountAmount: number;

    /** Id zamówienia dla którego znizka zostala udzielona */
    declare RentalRentOrderId: Identifier;
    /** Pobiera encję zamówienia dla którego znizka zostala udzielona */
    public async geRentOrder(): Promise<RentOrderEntity> {
        return this.getOwnedEntity(RentOrderEntity, this.RentalRentOrderId, propertyOf<CustomerDiscountHistoryEntity>('RentalRentOrderId'));
    };

    /** Id klienta który skorzystał ze znizki */
    declare RentalCustomerId: Identifier;
    /** Pobiera encję klienta który skorzystał ze znizki */
    public async geCustomer(): Promise<CustomerEntity> {
        return this.getOwnedEntity(CustomerEntity, this.RentalCustomerId, propertyOf<CustomerDiscountHistoryEntity>('RentalCustomerId'));
    };

    /** Id definicji zniki na podstawie której powstał ten obiekt */
    declare RentalOfferDiscountId: Identifier;
    /** Pobiera encję definicji znizki na podstawie której powstał ten obiekt */
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
    RentalCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalOfferDiscountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    savedAmount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    giftEstimatedValue: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    beforeDiscountAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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