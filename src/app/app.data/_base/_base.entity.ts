import { Identifier, Model, ModelStatic } from "sequelize";
import { EntityNotFoundByFkError } from "../../app.errors/entity-not-found-by-this-fk.error";

export abstract class BaseEntity extends Model 
{
    public readonly abstract entityName: string;

    declare id: Identifier;
    declare createdAt: Date;
    declare updatedAt?: Date;
    declare createdDiscordUserId: number;
    declare updatedDiscordUserId?: number;
    declare isDeleted: boolean;

    public async getOwnedEntity<T extends BaseEntity>(
        repository: ModelStatic<T>,
        fk: Identifier,
        fkName: string)
        : Promise<T>
    {
        const entity = await repository.findByPk(fk);
        if (entity === null)
            throw new EntityNotFoundByFkError<T>(
                repository,
                fkName,
                fk.toString());
        return entity;
    };
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