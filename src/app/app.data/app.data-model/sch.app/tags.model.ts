import { DataTypes, Model } from 'sequelize';
import { BaseEntity } from '../_base/_base-entity.model';


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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    userId: { 
        type: DataTypes.NUMBER, 
        allowNull: false
    },
    createdUserId: { 
        type: DataTypes.NUMBER, 
        allowNull: false
    },
};