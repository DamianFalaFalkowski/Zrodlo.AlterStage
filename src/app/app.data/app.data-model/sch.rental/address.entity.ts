import { BaseAdddressEntity } from "../_base/_base-address.entity";

export const AddressModelName = 'Addresses'

/** Reprezentacja adresu wykorzystywanego w obrębie modułu rental */
export class AddressEntity extends BaseAdddressEntity {
    public entityName: string = AddressModelName;
    
    /** Link do znacznika w google maps */
    declare googleMapsPin: string;
}

// TODO: add attributes
export const AddressAttributes = {
}