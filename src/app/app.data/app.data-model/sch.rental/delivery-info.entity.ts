import { RecievePointEntity } from "./recieve-point.entity";
import { RentOfferEntity } from "./rent-offer.entity";
import { BaseEntity } from "../_base/_base.entity";
import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { DataTypes, Identifier } from "sequelize";
import { propertyOf } from "../../../../utils/type-properties.util";
import { EntityNotFoundByFkError } from "../../../app.errors/entity-not-found-by-this-fk.error";

export const DeliveryInfoModelName = 'DeliveryInfos'

/** Określa informacje dot. dostawy dla powiązanej oferty i punktu odbioru. W róznych punktach odbioru mogą panować inne zasady dostaw. */
export class DeliveryInfoEntity extends BaseEntity 
{
    public readonly entityName: string = DeliveryInfoModelName;

    /** Opis określający standardowy obszar dostawy. Standardowy obszar dostawy to obszar w którym obowiązuje jedna stała stawka dostawy określona przez punkt odbioru. */
    declare standardDeliveryAreaDescription?: string;

    /** Flaga okreslająca czy punkt odbioru umozliwia dostawę poza obszarem standardowym */
    declare isAvaliableOutsideStandardArea: boolean;

    /** Określa maksymalny dystans dostawy podany w km. Wartość '0' oznacza nieograniczony dystans. Wartość 'null' moze wystąpić tylko w przypadku kiedy punkt odbioru nie umozliwia dostawy poza obszarem standardowym. */
    declare maxDeliveryDistance?: number;

    /** Koszt dostawy w standardowym obszarze dostawy. Wartość 'null' moze wystąpić tylko kiedy punkt odbioru nie posiada dostawy w ofercie. Wartość '0' oznacza darmową dostawę. */
    declare standardDeliveryPrice?: number;

    /** Cena za kilometr dla dostaw poza standardowym obszarem dostawy. Wartość 'null' moze wystąpić tylko kiedy punkt odbioru nie posiada dostawy w ofercie. Wartość '0' oznacza darmową dostawę.*/
    declare deliveryPricePerKm?: number;

    /** Cena godziny pracy operatora przedmiotu. Wartość 'null' moze wystąpić tylko kiedy punkt odbioru nie posiada obslugi w ofercie. */
    declare operatorPricePerHour?: number;

    /** Cena montazu. Wartość 'null' moze wystąpić tylko kiedy punkt odbioru nie posiada montazu w ofercie. */
    declare montagePrice?: number;

    /** Cena demontazu. Wartość 'null' moze wystąpić tylko kiedy punkt odbioru nie posiada demontazu w ofercie. */
    declare demontagePrice?: number;

    /** Minimalny/początkowy czas dostępności. Wartość ustalana przez punkt odbioru, określa ile czasu minimalnie punkt odbioru potrzebuje minimalnie na przygotowanie zlecenia do odbioru. Czas wzrazta kiedy przedmiot pochodzi z innego punktu odbioru.  */
    declare baseRentItemsAviability: RentItemAviablility;

    // TODO: opisy
    declare allowsDelivery: boolean;
    declare allowsMontage: boolean;
    declare allowsDemontage: boolean;
    declare allowsOperator: boolean;
    declare needsDelivery: boolean;
    declare needsMontage: boolean;
    declare needsDemontage: boolean;
    declare needsOperator: boolean;

    declare RentalRentOfferId: Identifier;
    public async getRentOffer(): Promise<RentOfferEntity>
    {
        return await this.getOwnedEntity(RentOfferEntity, 
            this.RentalRentOfferId, 
            propertyOf<DeliveryInfoEntity>('RentalRentOfferId'));
    };

    public async getRecievePoint(): Promise<RecievePointEntity> 
    {
        const entity = await RecievePointEntity.findOne(
            {where: { RentalDeliveryInfoId: this.id } });
        if (entity === null)
        throw new EntityNotFoundByFkError(RecievePointEntity, 
            'RentalDeliveryInfoId', this.id.toString());
        return entity;
    };
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
    standardDeliveryAreaDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAvaliableOutsideStandardArea: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    maxDeliveryDistance: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    standardDeliveryPrice: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    deliveryPricePerKm: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    operatorPricePerHour: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    montagePrice: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    demontagePrice: {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null
    },
    baseRentItemsAviability: {
        type: DataTypes.ENUM(...Object.values(RentItemAviablility)),
        allowNull: false,
        defaultValue: RentItemAviablility.IMMEDIATELY
    },
    allowsDelivery:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allowsMontage:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allowsDemontage:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allowsOperator:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    needsDelivery:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    needsMontage:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    needsDemontage:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    needsOperator:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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