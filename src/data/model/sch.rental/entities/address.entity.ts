import { DataTypes } from "sequelize";
import { BaseAdddressEntity } from "../../../../app/app.data/app.data-model/_base/_base-address.entity";

export const AddressModelName = 'Addresses'

/** Reprezentacja adresu wykorzystywanego w obrębie modułu rental */
export class AddressEntity extends BaseAdddressEntity {
    public entityName: string = AddressModelName;
    
    /** Link do znacznika w google maps */
    declare googleMapsPin: string;
}

// TODO: add attributes
export const AddressAttributes = {
    id: 
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        
    // columns
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    house: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    googleMapsPin: {
        type: DataTypes.STRING,
        allowNull: true,
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