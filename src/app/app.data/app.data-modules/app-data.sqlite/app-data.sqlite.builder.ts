
import { Dialect, Sequelize } from "sequelize";
import { ISqliteInstance, SqliteInstance } from './app-data.sqlite.instance';
import { SqliteModule } from "./app-data.sqlite.module";
import {TagsAttributes, TagsModelName, TagsEntity} from './../../app.data-model/tags.model'
import dcLoggerUtil from "../../../../utils/dc-logger.util";


export interface ISqliteBuilder extends ISqliteInstance{
   SetDbConnection(
      databaseName: string,
      userName: string,
      password: string,
      host: string,
      dialect: string,
      logging: boolean,
      storage: string
   ): SqliteModule;

   InitRepositories(): SqliteModule;
}
export abstract class SqliteBuilder 
   extends SqliteInstance
   implements ISqliteBuilder 
{
   public SetDbConnection(databaseName: string, userName: string, password: string, host: string, dialect: Dialect, logging: boolean, storage: string): SqliteModule {
      this._context = new Sequelize(
         databaseName, userName, password, 
         { host: host, dialect: dialect, logging: logging, storage: storage }
      );
      return this as unknown as SqliteModule;
   }

   public InitRepositories(): SqliteModule
   {
      TagsEntity.init(
         TagsAttributes,
         {
            sequelize: this._context!,
            modelName: TagsModelName,
         }
      );

      this._context!.afterSync(() => { 
         this._isDatabaseSynced = true;
         dcLoggerUtil.logInfo('Database synchronized')
      });
      TagsEntity.sync();
      return this as unknown as SqliteModule;
   }
}