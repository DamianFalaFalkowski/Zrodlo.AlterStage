import { DiscountType } from "./enums/discount-type.enum";
import { BaseEntity } from "../_base/_base-entity.model";

export const OfferDiscountModelName = 'OfferDiscounts'

export class OfferDiscountEntity extends BaseEntity 
{
    declare discountName: string;
    declare discountType: DiscountType

    /* depending on typw willl be either percentage or fixed value */
    declare discountValue: number;

    declare doscountDescription: string;
    declare activeFrom: Date;
    declare activeUntil: Date;
    declare isEnabled: boolean;

    /* Nazwy wymagań do spełnienia aby zastosować zniżkę. Nazwy nie mogą zawierać spacji. Nazwy powinny być oddzielone spacją. Kaze wymaganie musi mieć swojego odpowiednika w kodzie. 
    TODO: prawdopodobnie najlepiej będzie wyniesc to do osobnej tabelki a jeśli nie, to trzeba będzie dodać sprawdzenie poprawnosci wartosci tego pola przy starcie aplikacji. */
    declare discountRequirements: string;

    declare discountCode: string;
    declare isActivatedByDiscountCode: boolean;
    declare discountCodeUsageLimitGlobal: number;
    declare discountCodeUsageCountGlobal: number;
    declare discountCodeUsageLimitPerCustomer: number;
}

export const OfferDiscountAttributes = {
}