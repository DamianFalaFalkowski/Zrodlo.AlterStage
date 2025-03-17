import { Identifier, Model, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RentOfferEntity, RentOfferModelName } from '../rent-offer.entity';
import { OfferDiscountEntity } from "../offer-discount.entity";
import { rentalSchemaName } from "../../../app.data-modules/app-data.sqlite/app-data.sqlite.builder";

export const RentOfferToOfferDiscountModelName = 'RentOffersToOfferDiscounts';

export class RentOffer_OfferDiscount_Hash extends BaseHashEntity<RentOfferEntity, OfferDiscountEntity>
{
    public entityName: string = RentOfferToOfferDiscountModelName;
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentOfferToOfferDiscountModelName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;
    protected tableB: ModelStatic<OfferDiscountEntity> = OfferDiscountEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}RentOfferId`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}OfferDiscountId`;
    }
    
    declare RentalRentOfferId: Identifier;
    declare RentalOfferDiscountId: Identifier;
}