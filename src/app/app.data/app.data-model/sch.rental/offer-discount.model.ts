import { DiscountType } from "./enums/discount-type.enum";
import { BaseEntity } from "../_base/_base-entity.model";
import { DataTypes } from "sequelize";

export const OfferDiscountModelName = 'OfferDiscounts'

export class OfferDiscountEntity extends BaseEntity 
{
    // declare discountName: string;
    // declare discountType: DiscountType

    // /* depending on typw willl be either percentage or fixed value */
    // declare discountValue: number;

    // declare doscountDescription: string;
    // declare activeFrom: Date;
    // declare activeUntil: Date;
    // declare isEnabled: boolean;

    // /** Nazwy wymagań do spełnienia aby zastosować zniżkę. Nazwy nie mogą zawierać spacji. Nazwy powinny być oddzielone spacją. Kaze wymaganie musi mieć swojego odpowiednika w kodzie. 
    // TODO: prawdopodobnie najlepiej będzie wyniesc to do osobnej tabelki a jeśli nie, to trzeba będzie dodać sprawdzenie poprawnosci wartosci tego pola przy starcie aplikacji. */
    // declare discountRequirements: string;

    // declare discountCode: string;
    // declare isActivatedByDiscountCode: boolean;
    // declare discountCodeUsageLimitGlobal: number;
    // declare discountCodeUsageCountGlobal: number;
    // declare discountCodeUsageLimitPerCustomer: number;
}

export const OfferDiscountAttributes = {
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