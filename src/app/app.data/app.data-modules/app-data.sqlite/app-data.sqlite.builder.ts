import { Dialect, Sequelize } from "sequelize";
import { AppModule } from "../../../app.modules/app.module";
import { SqliteInstance } from './app-data.sqlite.instance';
import { SqliteModule } from "./app-data.sqlite.module";

export interface ISqLiteBuilder {
   SetDbConnection(
      databaseName: string,
      userName: string,
      password: string,
      host: string,
      dialect: string,
      logging: boolean,
      storage: string
   ): AppModule;

   InitRepositories(): AppModule;
}
export abstract class SqliteBuilder 
   extends SqliteInstance
   implements ISqLiteBuilder 
{
   public SetDbConnection(databaseName: string, userName: string, password: string, host: string, dialect: Dialect, logging: boolean, storage: string): SqliteModule {
      this._context = new Sequelize(
         databaseName, userName, password, 
         { host: host, dialect: dialect, logging: logging, storage: storage }
      );
      return this as unknown as SqliteModule;
   }

   InitRepositories(): AppModule {
      throw new Error("Method not implemented."); // TODO:
   }
}