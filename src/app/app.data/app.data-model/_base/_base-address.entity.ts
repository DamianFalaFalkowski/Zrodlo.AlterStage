import { BaseEntity } from "./_base-entity.entity";

export abstract class BaseAdddressEntity extends BaseEntity
{
    declare city: string;
    declare street: string;
    declare house: string;
    declare flat: string;
    declare postalCode: string;
    declare googleMapsPin: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}