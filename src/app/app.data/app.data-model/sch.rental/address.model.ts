import { BaseEntity } from "../_base/_base-entity.model";

export const AddressModelName = 'Address'

export class AddressEntity extends BaseEntity {
    declare city: string;
    declare street: string;
    declare house: string;
    declare flat: string;
    declare postalCode: string;
    declare googleMapsPin: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

export const AddressAttributes = {
}