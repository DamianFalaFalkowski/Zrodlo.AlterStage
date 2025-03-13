import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { OfferRentItemEntity, OfferRentItemModelName } from "../offer-rent-item.entity";
import { RentOfferEntity, RentOfferModelName } from "../rent-offer.entity";
import { rentalSchemaName } from "../../../app.data-modules/app-data.sqlite/app-data.sqlite.builder";

export const RentOfferToOfferRentItemEntityName = 'RentOfferToOfferRentItemEntity';

export class RentOffer_OfferRentItem_Hash 
    extends BaseHashEntity<RentOfferEntity, OfferRentItemEntity>
{
    protected schemaName: string = rentalSchemaName;
    protected modelName: string= RentOfferToOfferRentItemEntityName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;;
    protected tableB: ModelStatic<OfferRentItemEntity> = OfferRentItemEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentOfferModelName}Id`;           
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${OfferRentItemModelName}Id`;
    }
    public entityName: string = RentOfferToOfferRentItemEntityName;

    declare RentalRentOfferId: Identifier;
    declare RentalOfferRentItemId: Identifier;
}