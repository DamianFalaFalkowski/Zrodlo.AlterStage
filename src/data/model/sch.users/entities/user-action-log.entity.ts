import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { UserActionType } from "../enums/user-action-type.enum";

export const UserActionLogModelName = 'UserActionLogs';

export class UserActionLogEntity extends BaseEntity
{
    public entityName: string = UserActionLogModelName;

    /** Id użytkownika w bazie danych */
    declare userId: Identifier;
    declare userActionType: UserActionType;
    declare logMessage: string | null;
    declare actionDate: Date;
    declare isOutdated: boolean;
    declare outdatesAfter: Date | null;
}

export const UserActionLogAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // fks
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // columns
    userActionType: {
        type: DataTypes.ENUM,
        values: Object.values(UserActionType),
        allowNull: false
    },
    logMessage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    actionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isOutdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    outdatesAfter: {
        type: DataTypes.DATE,
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
};