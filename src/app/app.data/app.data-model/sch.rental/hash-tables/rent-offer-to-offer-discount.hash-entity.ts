import { Identifier, Model, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RentOfferEntity, RentOfferModelName } from '../rent-offer.entity';
import { OfferDiscountEntity } from "../offer-discount.entity";
import { rentalSchemaName } from "../../../app.data-modules/app-data.sqlite/app-data.sqlite.builder";

export const RentOfferToOfferDiscountModelName = 'RentOffersToOfferDiscounts';

export class RentOffer_OfferDiscount_Hash extends BaseHashEntity<RentOfferEntity, OfferDiscountEntity>
{
    isGowno<T extends RentOfferEntity | T extends OfferDiscountEntity ? RentOfferEntity : OfferDiscountEntity>(ins: T): T extends RentOfferEntity ? true : never
    {
        throw new Error("Method not implemented.");
    }
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentOfferToOfferDiscountModelName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;
    protected tableB: ModelStatic<OfferDiscountEntity> = OfferDiscountEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentOfferModelName}Id`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${RentOfferModelName}Id`;
    }
    
    declare RentalRentOfferId: Identifier;
    declare RentalOfferDiscountId: Identifier;
}