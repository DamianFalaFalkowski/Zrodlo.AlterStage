import { RentOrderEntity } from "./rent-order.entity";
import { AddressEntity } from "./address.entity";
import { RentItemDamageEntity } from "./rent-item-damage.entity";
import { BaseEntity } from "../../_base/_base.entity";
import { DataTypes, Identifier } from "sequelize";
import { propertyOf } from "../../../../../utils/type-properties.util";
import { EntityNotFoundByFkError } from "../../../../app.errors/entity-not-found-by-this-fk.error";

// TODO: sformatowac opisy
export const CustomerModelName = 'Customers'
/** Reprezentuje klienta wypoyczalni */
export class CustomerEntity extends BaseEntity 
{
    public readonly entityName: string = CustomerModelName;

    /** Id profilu discord. eg.352579442176163841 */
    declare discordProfileId: string;

    /** Ostatnio odczytana nazwa serwerowa profilu discord */
    declare lastDiscordGuildProfileName: string;

    /** Imię klienta. Uzupełniane przed złoeniem pierwszego zamówienia. */
    declare name?: string;

    /** Nazwisko klienta. Uzupełniane przed złoeniem pierwszego zamówienia. */
    declare lastName?: string;

    /** Adres email do kontaktu. Uzupełniane przed złoeniem pierwszego zamówienia. */
    declare email?: string;

    /** Telefon do kontaktu. Uzupełniane przed złoeniem pierwszego zamówienia. */
    declare phone?: string;

    /** Konto bankowe do wykonania zwrotu kaucji */
    declare bankAccountIban?: string;

/** Id adresu określonego przez uytkownika jako proponowany adres dostawy 
* ? OK */
    declare RentalAddressId?: Identifier;
    /** Pobiera adres określony przez uytkownika jako proponowany adres dostawy */
    public async getAddressIfExists(): Promise<AddressEntity | undefined>
    {
        if(this.RentalAddressId === undefined)
            return undefined;
        return await this.getOwnedEntity(AddressEntity, 
            this.RentalAddressId, 
            propertyOf<CustomerEntity>('RentalAddressId'));
    };

/** Pobiera zlecenia utworzone przez klienta 
* * OK */
    public async getOrders(): Promise<RentOrderEntity[]>
    {
        const entities = await RentOrderEntity.findAll(
            { where : { RentalCustomerId : this.id }});
        if (entities === null) 
            throw new EntityNotFoundByFkError(RentOrderEntity, 
                'RentalCustomerId', this.id.toString());
        return entities;
    };

/** Pobiera uszkodzenia powstałe w zleceniach uytkownika
* ? OK */
    public async getDamagesIfExist(): Promise<RentItemDamageEntity[] | null>
    {
        const entities = await RentItemDamageEntity.findAll(
            { where : { RentalRentItemDamageId : this.id }});
        return entities;
    };
}

export const CustomerAttributes = {
    // pk
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
    // fks
    RentalAddressId: {
       type: DataTypes.INTEGER,
       allowNull: true, 
    },

    // columns
    discordProfileId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastDiscordGuildProfileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bankAccountIban: {
        type: DataTypes.STRING,
        allowNull: true
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
}