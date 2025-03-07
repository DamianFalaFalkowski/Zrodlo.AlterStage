import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { CustomerDiscountHistoryEntity } from "./customer-discount-history.model";
import { CustomerEntity } from "./customer.model";
import { OrderStatus } from "./enums/order-status.enum";
import { OrderDeliveryEntity } from "./order-delivery.model";
import { RentItemDamageEntity } from "./rent-item-damage.model";
import { RentItemEntity } from './rent-item.model';
import { RentOfferEntity } from "./rent-offer.model";

export const RentOrderModelName = 'RentOrder'

export class RentOrderEntity extends BaseEntity 
{
    declare id: number;
    declare status: OrderStatus;
    declare payedAmount: number;
    declare onHoldDepositeAmount: number;
    declare totalAmount: number;
    declare discountAmount: number;
    declare taxPercent: number;
    declare taxAmount: number;
    declare depositeAmount: number;
    declare depositeReturnedAmount: number;
    declare damagesFixingCost: number;
    declare damagesFixingCostOverDepositedAmount: number;
    declare dipositeDiscountAmount: number;
    declare rentPeriodFrom: Date;
    declare rentPeriodUntil: Date;
    declare hasDelivery: boolean;
    declare hasOperator: boolean;
    declare hasMontage: boolean;
    declare hasDemontage: boolean;
    declare areItemsReturned: boolean;
    declare isPaymentDone: boolean;
    declare isDepositeLeftToBeReturned: boolean;
    // TODO: zweryfikowac, bo prawdopodobnie brakuje czesci pól

    declare custometId: number;
    declare customer: CustomerEntity;
    declare offerDeliveryId: number;
    declare offerDelivery: OrderDeliveryEntity;

    declare itemDamages: RentItemDamageEntity[];
    declare offers: RentOfferEntity[];
    declare appliedDoscounts: CustomerDiscountHistoryEntity[];
}

export const RentOrderAttributes = {
}