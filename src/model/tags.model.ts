import { DataTypes, Model } from 'sequelize';
import { sequelizeContext } from '../run-discord-app';

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
export class TagsRepository extends Model {
    declare name: string;
    declare description: string;
    declare userId: string;
    declare createdUserId: string;
}

TagsRepository.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        userId: { type: DataTypes.NUMBER, allowNull: false},
        createdUserId: { type: DataTypes.NUMBER, allowNull: false},
    },
    {
        sequelize: sequelizeContext, // We need to pass the connection instance
        modelName: 'Tags', // We need to choose the model name
    }
);