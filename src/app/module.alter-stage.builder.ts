import { IBuilderSequelizeSqLite } from "../modules/sqlite/startup-builders/builder.sequelize.sqlite.interface";

export interface IAlterStageModuleBuilder 
    extends
        IBuilderSequelizeSqLite
{
    appVersion: string | null;
    setUpAppVersion(): void;
}

