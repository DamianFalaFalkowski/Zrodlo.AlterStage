import { RecievePointEntity } from "./recieve-point.model";
import { RentOfferEntity } from "./rent-offer.model";
import { BaseEntity } from "../_base/_base-entity.model";
import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { DataTypes, Identifier } from "sequelize";
import { propertyOf } from "../../../../utils/type-properties.util";

export const DeliveryInfoModelName = 'DeliveryInfos'

export class DeliveryInfoEntity extends BaseEntity 
{
    public entityName: string = DeliveryInfoModelName;

    // declare isAvaliable: boolean;
    // declare isNeeded: boolean;
    // declare standardDeliveryAreaDescription?: string;
    // declare isAvaliableOutsideStandardArea: boolean;
    // declare maxDeliveryDistance?: number;
    // declare standardDeliveryPrice?: number;
    // declare deliveryPricePerKm?: number;
    // declare baseRentItemsAviability: RentItemAviablility;

    declare RentalRentOfferId: Identifier;
    public async getRentOffer(): Promise<RentOfferEntity>
    {
        return await this.getOwnedEntity(RentOfferEntity, 
            this.RentalRentOfferId, 
            propertyOf<DeliveryInfoEntity>('RentalRentOfferId'));
    };
    

    public async getRecievePoint(): Promise<RecievePointEntity> {
        return (await RecievePointEntity.findOne({where: { RentalDeliveryInfoId: this.id } }))!;
    };

    // declare allowsMontage: boolean;
    // declare allowsDemontage: boolean;
    // declare allowsOperator: boolean;

    // declare needsMontage: boolean;
    // declare needsDemontage: boolean;
    // declare needsOperator: boolean;

    // declare operatorPricePerHour?: number;
    // declare montagePrice?: number;
    // declare demontagePrice?: number;
}

export const DeliveryInfoAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    RentalRentOfferId: {
       type: DataTypes.INTEGER,
       allowNull: false, 
    },

    // columns

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
    }
};