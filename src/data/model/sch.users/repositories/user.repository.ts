import { Identifier } from "sequelize";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {
    private constructor() {
    }

    public static async create(discordUserId: Identifier, lastUserDiscordName: string, verificationPhotoPath: string): Promise<UserEntity> {
        return await UserEntity.create({
            userDiscordId: discordUserId,
            lastUserDiscordName: lastUserDiscordName,
            verificationPhotoPath: verificationPhotoPath,
            isTrusted: false,
            trustedDate: null,
        });
    }

    public static async findByDiscordUserId(id: Identifier): Promise<UserEntity | null> {
            return await UserEntity.findOne(
                { where: { userDiscordId: id } });
        }
}