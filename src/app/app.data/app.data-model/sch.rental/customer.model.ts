import { RentOrderEntity } from "./rent-order.model";
import { AddressEntity } from "./address.model";
import { RentItemDamageEntity } from "./rent-item-damage.model";
import { BaseEntity } from "../_base/_base-entity.model";

export const CustomerModelName = 'Customer'

export class CustomerEntity extends BaseEntity 
{
    declare discordProfileId: string; // eg.352579442176163841
    declare lastDiscordGuildProfileName: string;
    declare name: string;
    declare lastName: string;
    declare email: string;
    declare phone: string;

    declare addressId?: number;
    declare address?: AddressEntity;
    declare orders: RentOrderEntity[];
    declare causedDamages: RentItemDamageEntity[];
}

export const CustomerAttributes = {
}