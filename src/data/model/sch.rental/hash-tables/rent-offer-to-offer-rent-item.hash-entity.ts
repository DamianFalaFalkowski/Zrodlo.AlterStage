import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../../../app/app.data/app.data-model/_base/_base.hash-entity";

import { RentOfferEntity } from "../entities/rent-offer.entity";
import { OfferRentItemEntity } from "../entities/offer-rent-item.entity";
import { rentalSchemaName } from "../../../modules/rental-data.module/rental-data.instance";

export const RentOfferToOfferRentItemEntityName = 'RentOfferToOfferRentItems';

export class RentOffer_OfferRentItem_Hash 
    extends BaseHashEntity<RentOfferEntity, OfferRentItemEntity>
{
    protected schemaName: string = rentalSchemaName;
    protected modelName: string= RentOfferToOfferRentItemEntityName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;;
    protected tableB: ModelStatic<OfferRentItemEntity> = OfferRentItemEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}RentOfferId`;           
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}OfferRentItemId`;
    }
    public entityName: string = RentOfferToOfferRentItemEntityName;

    declare RentalRentOfferId: Identifier;
    declare RentalOfferRentItemId: Identifier;
}