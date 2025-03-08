import { BaseEntity } from "../_base/_base-entity.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";

export const RentItemDamageModelName = 'RentItemDamages'

export class RentItemDamageEntity extends BaseEntity 
{
    declare payerDiscordClientId: string;
    declare lastPayerDiscordClientName: string;

    declare damageDescription: string;
    declare isRepaired: boolean;
    declare canBeRepaired: boolean;
    declare repairDescription?: string;
    declare repairCost?: number;
    declare repairDate?: Date;
    declare damageDate: Date;

    declare entitlesToDiscountId?: number;
    declare entitlesToDiscount?: OfferDiscountEntity;
    declare rentItem: RentItemEntity;
    declare rentItemId: number;
    declare rentOrder: RentOrderEntity;
    declare rentOrderId: number;
}

export const RentItemDamageAttributes = {
}