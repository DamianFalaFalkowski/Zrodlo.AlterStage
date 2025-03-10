import { DataTypes, Model } from 'sequelize';
import { BaseEntity } from '../_base/_base.entity';


export const TagsModelName = 'Tags'
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
export class TagsEntity extends BaseEntity 
{
    public entityName: string= 'Tags';

    declare name: string;
    declare description: string;
    declare userId: string;
}

export const TagsAttributes = 
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    userId: { 
        type: DataTypes.NUMBER, 
        allowNull: false
    }
};