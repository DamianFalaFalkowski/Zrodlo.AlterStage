import { Identifier, IntegerDataType, Model } from "sequelize";

export abstract class BaseEntity extends Model 
{
    declare id: Identifier;
    declare createdAt: Date;
    declare updatedAt?: Date;
    declare createdDiscordUserId: number;
    declare updatedDiscordUserId?: number;
    declare isDeleted: boolean;
}

// NOTE: model creation:  https://sequelize.org/docs/v6/core-concepts/model-basics/

/* NOTE: skopiuj to do modeli atrybutów diedziczących:

    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        // TODO: add entity columns
    
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

*/