import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../_base/_base.entity";
import { AddressEntity } from "./address.entity";
import { DeliveryInfoEntity } from "./delivery-info.entity";
import { RentOrderEntity } from "./rent-order.entity";
import { propertyOf } from "../../../../utils/type-properties.util";
import { RentOffer_RecievePoint_Hash } from "./hash-tables/rent-order-to-recieve-point.hash-entity";
import { RentOfferEntity } from "./rent-offer.entity";

export const RecievePointModelName = 'RecievePoints'

// TODO: dodać i zformatować opisy
export class RecievePointEntity extends BaseEntity 
{
    public readonly entityName: string = RecievePointModelName;

    declare name: string;
    declare phoneNumber: string;
    declare email: string;
    declare description: string;
    declare ownerName: string;
    declare ownerLastName: string;
    declare ownerDiscordId: number;
    declare lastOwnerDiscordName: string;
    declare isActive: boolean;

/** Kod punktu odbioru
** Unikalny kod złozony z kolejno 3 liter oznaczających miasto
* TODO: utworzyć walidator kodów punktów odbioru */
    declare recievePointCityCode: string;

    public getRecievePointCode(): string {
        return this.recievePointCityCode + this.id;
    }

// ! TODO: na razie kompletność i poprawność nie będzie realizowana. najpierw chcę obsłuyć operacje na strukturze z pominięciem funkcjonalności dostawy 
    declare RentalDeliveryInfoId: Identifier;
    public async getDeliveryInfo(): Promise<DeliveryInfoEntity>
    {
        return await this.getOwnedEntity(DeliveryInfoEntity, 
            this.RentalDeliveryInfoId, 
            propertyOf<RecievePointEntity>('RentalDeliveryInfoId'));
    };

// ? ok
    declare RentalAddressId: Identifier;
    public async getAddress(): Promise<AddressEntity>
    {
        return await this.getOwnedEntity(AddressEntity, 
            this.RentalAddressId, 
            propertyOf<RecievePointEntity>('RentalAddressId'));
    }

/**
** Punkty odbioru świadczące tą ofertę najmu. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getRentItem(repository: RentOffer_RecievePoint_Hash) : Promise<RentOfferEntity[]>
    {
        return (await repository.getRelated(RentOfferEntity, this.id)) as unknown as RentOfferEntity[];
    }

/**
* * OK */
    public async getRentOrders(): Promise<RentOrderEntity[]>
    {
        return await RentOrderEntity.findAll(
            { where: { RentalOrderRentItemId: this.id } });
    }
}

export const RecievePointAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    // RentalDeliveryInfoId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    RentalAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerDiscordId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    lastOwnerDiscordName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    recievePointCityCode: {
        type: DataTypes.STRING,
        allowNull:false
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
    }
};

// TODO: dodanie modeli odpowiedzialnych za transport pomiedzy punktami odbioru oraz rozliczenie za obsługę transportu