import { Identifier, Model, ModelStatic } from "sequelize";
import { RentItemEntity, RentItemModelName } from "../entities/rent-item.entity";
import { RentOrderEntity, RentOrderModelName } from "../entities/rent-order.entity";
import { BaseHashEntity } from "../../../../app/app.data/app.data-model/_base/_base.hash-entity";
import { rentalSchemaName } from "../../../modules/rental-data.module/rental-data.instance";


export const RentItemToRentOrderModelName = 'RentItemsToRentOrders'

export class RentItem_RentOrder_Hash extends BaseHashEntity<RentItemEntity, RentOrderEntity>
{
    public entityName: string = RentItemToRentOrderModelName;
    protected schemaName: string = rentalSchemaName;
    protected modelName: string = RentItemToRentOrderModelName;
    protected tableA: ModelStatic<RentItemEntity> = RentItemEntity;
    protected tableB: ModelStatic<RentOrderEntity> = RentOrderEntity;
    protected get tableA_PK_Name(): string
    {
        return `${this.schemaName}${RentItemModelName}Id`;
    }
    protected get tableB_PK_Name(): string
    {
        return `${this.schemaName}${RentOrderModelName}Id`;
    }
    declare RentalRentItemId: Identifier;
    declare RentalRentOrderId: Identifier;
}