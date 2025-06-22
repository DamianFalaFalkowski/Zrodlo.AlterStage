import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { UserType } from "../enums/user-type.enum";

export const UserModelName = 'Users'

/**  Reprezentacja użytkownika w bazie danych
* * Zawiera informacje dotycące uytkownika kanału */
export class UserEntity extends BaseEntity 
{
    public entityName: string = UserModelName;

    declare userDiscordId: string;
    declare lastUserDisacordName: string;
    declare verificationPhotoPath: string;
    declare isTrusted: boolean;
    declare trustedDate: Date | null;
    declare bannedUntil: Date | null;
    declare userType: UserType;
}

export const UserAttributes = {
    // TODO: add user attributes
}