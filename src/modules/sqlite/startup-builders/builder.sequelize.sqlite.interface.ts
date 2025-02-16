
import { Sequelize } from "sequelize";
import { AlterStageModuleBuilder } from "../../../startup.builder";

export interface IBuilderSequelizeSqLite extends AlterStageModuleBuilder {
    sequelizeContext: Sequelize | null;

    SetDbConnection(
        databaseName: string,
        userName: string,
        password: string,
        host: string,
        dialect: string,
        logging: boolean,
        storage: string
    ): AlterStageModuleBuilder;

    InitRepositories(): AlterStageModuleBuilder;
}