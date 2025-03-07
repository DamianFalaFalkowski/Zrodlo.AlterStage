import { BaseEntity } from "../_base/_base-entity.model";
import { AddressEntity } from "./address.model";
import { DeliveryInfoEntity } from "./delivery-info.model";
import { RentItemEntity } from "./rent-item.model";
import { RentOrderEntity } from "./rent-order.model";

export const RecievePointModelName = 'RecievePoint'

export class RecievePointEntity extends BaseEntity 
{
    declare name: string;
    declare phoneNumber: string;
    declare email: string;
    declare description: string;
    declare ownerName: string;
    declare ownerLastName: string;
    declare ownerDiscordId: string;
    declare lastOwnerDiscordName: string;
    declare isActive: boolean;

    declare deliveryInfoId: number;
    declare deliveryInfo: DeliveryInfoEntity;
    declare addressId: number;
    declare address: AddressEntity;

    declare rentItems: RentItemEntity[];
    declare orders: RentOrderEntity[];
}

export const RecievePointAttributes = {
}

// TODO: dodanie modeli odpowiedzialnych za transport pomiedzy punktami odbioru oraz rozliczenie za obsługę transportu