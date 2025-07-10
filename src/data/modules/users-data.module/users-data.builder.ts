import { Sequelize } from "sequelize";
import { IUsersDataInstance, UsersDataInstance, usersSchemaName } from "./users-data.instance";
import { IGetContextIntegrationConsumer } from "../../../app/app.data/app.data-modules/app-data.module/integrations/get-context.integration";
import { UsersDataModule } from "./users-data.module";
import { UserAttributes, UserEntity, UserModelName } from "../../model/sch.users/entities/user.entity";
import { UserActionLogAttributes, UserActionLogEntity, UserActionLogModelName } from "../../model/sch.users/entities/user-action-log.entity";
import { __logger } from "../../../utils/dc-logger.util";

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
    abstract GetContext(): Sequelize;

    InitSchema(afterUsersSchemaSync: () => void): UsersDataModule
    {
    //--> 1. INIT DATA MODELS
        UserActionLogEntity.init(
            UserActionLogAttributes,
            { sequelize: this.GetContext(), modelName: usersSchemaName + '_' + UserActionLogModelName });
        UserEntity.init(
            UserAttributes,
            { sequelize: this.GetContext(), modelName: usersSchemaName+ '_' + UserModelName });

    //--> 2. INIT HASH TABLES
    // no hash tables to init

    //--> 3. CONFIGURE DB RELATIONS
// * 1. User has [].UserActionLog
        UserEntity.hasMany(UserActionLogEntity);
        UserActionLogEntity.belongsTo(UserEntity);

    //--> 4. SYNC MODEL WITH DB
        UserActionLogEntity.afterSync((): void => {
            __logger.logInfo(usersSchemaName + '_' + UserActionLogModelName + ' table synchronized');
            this.isDataSchemaSynced = true;
            afterUsersSchemaSync();
            
        });
        UserEntity.afterSync((): void => {
            __logger.logInfo(usersSchemaName + '_' + UserModelName + ' table synchronized');
            UserActionLogEntity.sync({ force: this._forceSync });
        });
        UserEntity.sync({ force: this._forceSync });

    //--> 5. RETURN MODULE WITH RENTAL SCHEMA
        return this as unknown as UsersDataModule;
    }
}