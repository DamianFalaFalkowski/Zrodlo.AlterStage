import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferRentItemEntity } from "./offer-rent-item.model";
import { RecievePointEntity } from "./recieve-point.model";
import { RentItemDamageEntity } from './rent-item-damage.model';
import { RentOrderEntity } from "./rent-order.model";

export const RentItemModelName = 'RentItem'

export class RentItemEntity extends BaseEntity
{
    declare id: number;
    declare code: string;
    declare barcodeNumber: string;
    declare isAvialible: boolean;
    declare isDamaged: boolean;
    declare isRented: boolean;

    declare amountEarned: number;
    declare amountSpent: number;
    declare amountSpentOnRepairs: number;

    declare rentItemAviabilityInHomeRecievePoint: RentItemAviablility;

    declare offerRentItemId: number;
    declare offerRentItem: OfferRentItemEntity;
    declare homeRecievePointId: number;
    declare homeRecievePoint: RecievePointEntity;

    declare damages: RentItemDamageEntity[];
    declare rentOrders: RentOrderEntity[];
}

export const RentItemAttributes = 
{

}