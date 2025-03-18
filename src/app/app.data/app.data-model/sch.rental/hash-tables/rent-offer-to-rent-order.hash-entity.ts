import { Identifier, ModelStatic } from "sequelize";
import { BaseHashEntity } from "../../_base/_base.hash-entity";
import { RentOfferEntity, RentOfferModelName } from "../entities/rent-offer.entity";
import { RentOrderEntity, RentOrderModelName } from "../entities/rent-order.entity";
import { rentalSchemaName } from "../../../app.data-modules/rental-data.module/rental-data.builder";

export const RentOfferToRentOrderModelName = 'RentOffersToRentOrders';

/** Tabela Haszującą encje
** RentofferEntity # RentOrderEntity
* ? Relacja [..]-[..]
* ! ZWERYFIKOWAĆ DZIAŁANIE 
*/
export class RentOffer_RentOrder_Hash extends BaseHashEntity<RentOfferEntity, RentOrderEntity>
{
    public entityName: string= 'RentOffersToRentOrders';
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
// /**
//  ! ZWERYFIKOWAĆ DZIAŁANIE */
//     public async getRentOffers<RentOfferEntity>(repository: RentOffer_RentOrder_Hash)
//         : Promise<RentOfferEntity[]>
//     {
//         return (await repository.getRelated(RentOfferEntity, this.RentalRentOrderId)) as unknown as RentOfferEntity[];
//     }


    declare RentalRentOrderId: Identifier;
// /**
//  ! ZWERYFIKOWAĆ DZIAŁANIE */
//     public async getRentOrders<RentOrderEntity>(repository: RentOffer_RentOrder_Hash)
//         : Promise<RentOrderEntity[]>
//     {
//         return (await repository.getRelated(RentOrderEntity, this.RentalRentOfferId)) as unknown as RentOrderEntity[];
//     }
}