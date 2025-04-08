import { DataTypes } from "sequelize";
import { BaseEntity } from "../../_base/_base.entity";

export const TemplateModelName = 'Template'

export class TemplateEntity extends BaseEntity
{
    public entityName: string= 'Template';

    declare name: string;
    declare description: string;
    declare content: string;
    declare bId: string;
}

export const TemplateAttributes =
{
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // columns
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    bId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        secondaryKey: true,
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
    },
}