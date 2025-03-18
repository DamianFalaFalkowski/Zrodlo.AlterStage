import { DataTypes } from "sequelize";
import { BaseEntity } from "../../_base/_base.entity";
import { RentItemSize } from "../enums/rent-item-size.enum";
import { RentItemEntity } from "./rent-item.entity";

export const OfferRentItemModelName = 'OfferRentItems'
export class OfferRentItemEntity extends BaseEntity {
    public readonly entityName = OfferRentItemModelName;

    // TODO: dodać opisy
    declare isMainRentItem: boolean;
    declare itemName: string;
    declare brandName?: string;
    declare modelName?: string;
    declare description?: string;
    declare rentItemSize: RentItemSize;

    public async getRentItems(): Promise<RentItemEntity[]>
    {
        const entities = await RentItemEntity.findAll(
            { where : { RentalOfferRentItemId : this.id }});
        if (entities === null) 
            throw new Error();
        return entities;
    }
}

export const OfferRentItemAttributes =
{
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    // columns
    isMainRentItem: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modelName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rentItemSize: {
        type: DataTypes.ENUM(...Object.values(RentItemSize)),
        allowNull: false
    },

    // from base
    createdAt: {
        type: DataTypes.DATE,
        secondaryKey: true,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    updatedDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}