import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../../../app/app.data/app.data-model/_base/_base.hash-entity";
import { RecievePointEntity, RecievePointModelName } from "../entities/recieve-point.entity";
import { RentOfferEntity, RentOfferModelName } from "../entities/rent-offer.entity";
import { rentalSchemaName } from "../../../modules/rental-data.module/rental-data.instance";


export const RentOfferToRecievePointName = 'RentOffersToRecievePoints';

export class RentOffer_RecievePoint_Hash 
    extends BaseHashEntity<RentOfferEntity, RecievePointEntity>
{
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentOfferToRecievePointName;
    protected tableA: ModelStatic<RentOfferEntity> = RentOfferEntity;
    protected tableB: ModelStatic<RecievePointEntity> = RecievePointEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}RentOfferId`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}RecievePointId`;
    }
    public entityName: string = RentOfferToRecievePointName;

declare RentalRentOfferId: Identifier;
    declare RentalRecievePointId: Identifier;
}