import { BaseEntity } from "../_base/_base-entity.model";
import { CustomerEntity } from "./customer.model";
import { OfferDiscountEntity } from "./offer-discount.model";
import { RentOrderEntity } from "./rent-order.model";

export const CustomerDiscountHistoryModelName = 'CustomerDiscountHistory'

export class CustomerDiscountHistoryEntity extends BaseEntity 
{
    declare savedAmount: number;
    declare giftEstimatedValue: number;
    declare beforeDiscountAmount: number;

    declare appliedOnOrderId: number;
    declare appliedOnOrder: RentOrderEntity;
    declare customerId: number;
    declare customer: CustomerEntity;
    declare offerDiscountId: number;
    declare offerDiscount: OfferDiscountEntity;
    
}

export const CustomerDiscountHistoryAttributes = {
}