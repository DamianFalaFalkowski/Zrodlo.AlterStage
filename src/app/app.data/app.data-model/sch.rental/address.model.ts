import { BaseAdddressEntity } from "../_base/_base-address.model";

export const AddressModelName = 'Addresses'

/* Reprezentacja adresu wykorzystywanego w obrębie modułu rental */
export class AddressEntity extends BaseAdddressEntity {
    declare googleMapsPin: string;
}

export const AddressAttributes = {
}