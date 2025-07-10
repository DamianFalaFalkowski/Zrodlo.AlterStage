import { Sequelize } from "sequelize";
import { UsersDataBuilder } from "./users-data.builder";
import { RentalDataModule } from "../rental-data.module/rental-data.module";
import { IGetContextIntegrationProvider } from "../../../app/app.data/app.data-modules/app-data.module/integrations/get-context.integration";

interface IUsersDataModuleDependency
{
    initializeUsers(
        appData: IGetContextIntegrationProvider, 
        shouldForceSync: boolean): UsersDataModule
}
export class UsersDataModule
    extends UsersDataBuilder
    implements IUsersDataModuleDependency
{
    private _dependency: IGetContextIntegrationProvider;

    GetContext(): Sequelize
    {
        return (this._dependency as IGetContextIntegrationProvider).GetContext();
    }
    private constructor(appData: IGetContextIntegrationProvider, shouldForceSync: boolean) {
        super(shouldForceSync);
        this._dependency = appData;
    }

    public static initializeUsers(appData: IGetContextIntegrationProvider, shouldForceSync: boolean): UsersDataModule {
        return new UsersDataModule(appData, shouldForceSync);
    }

    public initializeUsers(appData: IGetContextIntegrationProvider, shouldForceSync: boolean): UsersDataModule {
        return new UsersDataModule(appData, shouldForceSync);
    }
}