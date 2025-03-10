import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RentOfferEntity, RentOfferModelName } from "../rent-offer.entity";
import { RentOrderEntity, RentOrderModelName } from "../rent-order.entity";
import { rentalSchemaName } from "../../../app.data-modules/app-data.sqlite/app-data.sqlite.builder";

export const RentOfferToRentOrderModelName = 'RentOffersToRentOrders';

export class RentOffer_RentOrder_Hash 
    extends BaseHashEntity<RentOfferEntity, RentOrderEntity>
{
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentOfferToRentOrderModelName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;
    protected tableB: ModelStatic<RentOrderEntity> = RentOrderEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentOrderModelName}Id`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${RentOfferModelName}Id`;
    }

    declare RentalRentOfferId: Identifier;
    declare RentalRentOrderId: Identifier;
}