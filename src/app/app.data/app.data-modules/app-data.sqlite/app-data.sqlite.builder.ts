
import { DataTypes, Dialect, Sequelize } from "sequelize";
import { ISqliteInstance, SqliteInstance } from './app-data.sqlite.instance';
import { SqliteModule } from "./app-data.sqlite.module";
import {TagsRepository} from './../../app.data-model/tags.model'


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
   implements ISqliteInstance,
   ISqliteBuilder 
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
      TagsRepository.init(
         {
            id: {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            name: {
               type: DataTypes.STRING,
               allowNull: false,
            },
            description: DataTypes.STRING,
            userId: { 
               type: DataTypes.NUMBER, 
               allowNull: false
            },
            createdUserId: { 
               type: DataTypes.NUMBER, 
               allowNull: false
            },
         },
         {
               sequelize: this._context!,
               modelName: 'Tags', // We need to choose the model name
         }
      );
      return this as unknown as SqliteModule;
   }
}