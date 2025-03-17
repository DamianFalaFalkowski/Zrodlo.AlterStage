import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RecievePointEntity, RecievePointModelName } from "../recieve-point.entity";
import { RentOfferEntity, RentOfferModelName } from "../rent-offer.entity";
import { rentalSchemaName } from "../../../app.data-modules/rental-data.module/rental-data.builder";

export const RentOfferToRecievePointName = 'RentOffersToRecievePoint';

export class RentOffer_RecievePoint_Hash 
    extends BaseHashEntity<RentOfferEntity, RecievePointEntity>
{
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentOfferToRecievePointName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;
    protected tableB: ModelStatic<RecievePointEntity> = RecievePointEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentOfferModelName}Id`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${RecievePointModelName}Id`;
    }
    public entityName: string = RentOfferToRecievePointName;

declare RentalRentOfferId: Identifier;
    declare RentalRecievePointId: Identifier;
}