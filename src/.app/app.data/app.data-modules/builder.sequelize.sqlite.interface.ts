
import { Sequelize } from "sequelize";
import { IAlterStageModuleBuilder } from "../../app.modules/_app.module/_app.module";

export interface IBuilderSequelizeSqLite {
    sequelizeContext: Sequelize | null;

    SetDbConnection(
        databaseName: string,
        userName: string,
        password: string,
        host: string,
        dialect: string,
        logging: boolean,
        storage: string
    ): IAlterStageModuleBuilder;

    InitRepositories(): IAlterStageModuleBuilder;
}