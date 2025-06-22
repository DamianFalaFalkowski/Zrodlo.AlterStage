import { Identifier } from "sequelize";
import { UserActionLogEntity } from "../entities/user-action-log.entity";
import { UserActionType } from "../enums/user-action-type.enum";

export class UserActionLogRepository {
    private constructor() {
    }

    public static async create(
        userId: Identifier,
        userActionType: UserActionType,
        logMessage: string | null = null,
        outdatesAfterDays: number | null = null
    ): Promise<void> {
        await UserActionLogEntity.create({
            userId: userId,
            userActionType: userActionType,
            logMessage: logMessage,
            isOutdated: false,
            outdatesAfter: Date.now() + (outdatesAfterDays ? outdatesAfterDays * 24 * 60 * 60 * 1000 : 0),
            actionDate: Date.now(),
        });
    }
}