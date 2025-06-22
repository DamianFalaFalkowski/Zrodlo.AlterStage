import { UserEntity } from "../entities/user.entity";

export class UserRepository {
    private constructor() {
    }

    public static async create(discordUserId: number, lastUserDiscordName: string, verificationPhotoPath: string): Promise<UserEntity> {
        return await UserEntity.create({
            userDiscordId: discordUserId,
            lastUserDiscordName: lastUserDiscordName,
            verificationPhotoPath: verificationPhotoPath,
            isTrusted: false,
            trustedDate: null,
        });
    }
}