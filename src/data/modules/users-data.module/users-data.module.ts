import { Sequelize } from "sequelize";
import { UsersDataBuilder } from "./users-data.builder";
import { RentalDataModule } from "../rental-data.module/rental-data.module";

interface IUsersDataModuleDependency
{
    initializeUsers(
        shouldForceSync: boolean): UsersDataModule
}
export class UsersDataModule
    extends UsersDataBuilder
    implements IUsersDataModuleDependency
{
    GetContext(): Sequelize
    {
        throw new Error("Method not implemented.");
    }
    private constructor(shouldForceSync: boolean) {
        super(shouldForceSync);
    }

    public static initializeUsers(shouldForceSync: boolean): RentalDataModule {
        return UsersDataModule.initializeUsers(shouldForceSync);
    }

    public initializeUsers(shouldForceSync: boolean): UsersDataModule {
        return new UsersDataModule(shouldForceSync);
    }
}