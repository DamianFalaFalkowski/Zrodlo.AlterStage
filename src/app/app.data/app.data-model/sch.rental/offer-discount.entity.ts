import { DiscountType } from "./enums/discount-type.enum";
import { BaseEntity } from "../_base/_base-entity.entity";
import { DataTypes } from "sequelize";
import { CustomerDiscountHistoryEntity } from "./customer-discount-history.entity";

export const OfferDiscountModelName = 'OfferDiscounts'

/** Reprezentacja i definicja znizki ofertowej 
 * TODO: PILNE! zastanowic się nad zmianą nazewnictwa, chodzi o uzycie bardziej pasującego slowa niz 'discount' */
export class OfferDiscountEntity extends BaseEntity 
{
    public readonly entityName: string = OfferDiscountModelName;

// TODO: opisy pól
    declare discountName: string;
    declare discountType: DiscountType

    /* depending on typw willl be either percentage or fixed value */
    declare discountValue: number;

    declare doscountDescription: string;
    declare activeFrom: Date;
    declare activeUntil?: Date;
    declare isEnabled: boolean;

    /** 
     * ? Nazwy wymagań do spełnienia aby zastosować zniżkę. Nazwy nie mogą zawierać spacji. Nazwy powinny być oddzielone spacją. Kaze wymaganie musi mieć swojego odpowiednika w kodzie. 
     * TODO: prawdopodobnie najlepiej będzie wyniesc to do osobnej tabelki a jeśli nie, to trzeba będzie dodać sprawdzenie poprawnosci wartosci tego pola przy starcie aplikacji. */
    declare discountRequirements: string;

    declare discountCode: string;
    declare isActivatedByDiscountCode: boolean;
    declare discountCodeUsageLimitGlobal?: number;
    declare discountCodeUsageCountGlobal?: number;
    declare discountCodeUsageLimitPerCustomer?: number;

    public getCustmerDiscountHistories() : CustomerDiscountHistoryEntity[]
    {
        // TODO: implement this getter
        throw new Error('not implemented');
    }
}

export const OfferDiscountAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // columns
    discountName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discountType: {
        type: DataTypes.ENUM(...Object.values(DiscountType)),
        allowNull: false
    },
    discountValue: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    discountDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    activeFrom: {
        type: DataTypes.DATE,
        allowNull: true
    },
    activeUntil: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    discountRequirements: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discountCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActivatedByDiscountCode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    discountCodeUsageCountGlobal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    discountCodeUsageLimitGlobal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    discountCodeUsageLimitPerCustomer: {
        type: DataTypes.INTEGER,
        allowNull: true,
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