
import { Sequelize } from "sequelize";
import { IAlterStageModuleBuilder } from "../../../app/module.alter-stage.builder";

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