import { DataTypes, Identifier } from "sequelize";
import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { UserActionLogEntity } from "./user-action-log.entity";

export const UserModelName = 'Users';

/**  Reprezentacja użytkownika w bazie danych
* * Zawiera informacje dotycące uytkownika kanału */
export class UserEntity extends BaseEntity 
{
    public entityName: string = UserModelName;


    /** Id użytkownika na Discordzie */
    declare userDiscordId: Identifier;

    /** Nazwa użytkownika na Discordzie (nazwa globalna) */
    declare lastUserDiscordName: string;

    /** Ścieżka do zdjęcia weryfikacyjnego użytkownika */
    declare verificationPhotoPath: string;

    /** Określa czy użytkownik jest zaufany (przeszedł całkowicie weryfikację zdjęciem) */
    declare isTrusted: boolean;

    /** Data weryfikacji użytkownika (jeśli jest zaufany) */
    declare trustedDate: Date | null;

    /**  */
    public async getActionLogs(): Promise<UserActionLogEntity[]>
    {
        return await UserActionLogEntity.findAll({
            where: { 'userId': this.id }
        });
    }
}

export const UserAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // columns
    userDiscordId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    lastUserDiscordName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verificationPhotoPath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isTrusted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    trustedDate: {
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