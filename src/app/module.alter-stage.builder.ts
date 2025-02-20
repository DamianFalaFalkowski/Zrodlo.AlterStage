import { IBuilderDiscordEvents } from "./messaging/startup-builders/builder.dc-events.interface";
import { IBuilderSequelizeSqLite } from "../modules/sqlite/startup-builders/builder.sequelize.sqlite.interface";

export interface IAlterStageModuleBuilder 
    extends
        IBuilderSequelizeSqLite,
        IBuilderDiscordEvents
{
    appVersion: string | null;
    setUpAppVersion(): void;
}

