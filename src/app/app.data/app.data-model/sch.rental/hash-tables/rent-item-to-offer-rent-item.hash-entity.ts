import { Identifier, Model, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RentItemEntity, RentItemModelName } from "../rent-item.entity";
import { OfferRentItemEntity, OfferRentItemModelName } from "../offer-rent-item.entity";
import { rentalSchemaName } from "../../../app.data-modules/app-data.sqlite/app-data.sqlite.builder";

export const RentItemToOfferRentItemModelName = 'RentItemsToOfferRentItems'

export class RentItem_OfferRentItem_Hash 
    extends BaseHashEntity<RentItemEntity, OfferRentItemEntity>
{
    public entityName: string = 'Rental_RentItemsToOfferRentItems';
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentItemToOfferRentItemModelName;
    protected tableA: ModelStatic<RentItemEntity> = RentItemEntity;
    protected tableB: ModelStatic<OfferRentItemEntity> = OfferRentItemEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentItemModelName}Id`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${OfferRentItemModelName}Id`;
    }
    declare RentalRentItemId: Identifier;
    declare RentalOfferRentItemId: Identifier;
}
