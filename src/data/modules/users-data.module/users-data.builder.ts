import { Sequelize } from "sequelize";
import { IUsersDataInstance, UsersDataInstance } from "./users-data.instance";
import { IGetContextIntegrationConsumer } from "../../../app/app.data/app.data-modules/app-data.module/integrations/get-context.integration";
import { UsersDataModule } from "./users-data.module";

export interface IUsersDataBuilder 
    extends IUsersDataInstance
{
    InitSchema(afterUsersSchemaSync: () => void): UsersDataModule;

    // TDOD: sprawdzić czy będzie potrzeba tworzenia initializacji testowych danych i utworzyć ich tworzenie jesli tak
}

export abstract class UsersDataBuilder
    extends UsersDataInstance
    implements IUsersDataBuilder,
        // consuming
        IGetContextIntegrationConsumer
{
    InitSchema(afterUsersSchemaSync: () => void): UsersDataModule
    {
        // TODO: implementacja inicjalizacji schematu users-data

        throw new Error("Method not implemented.");
    }
    abstract GetContext(): Sequelize;
}