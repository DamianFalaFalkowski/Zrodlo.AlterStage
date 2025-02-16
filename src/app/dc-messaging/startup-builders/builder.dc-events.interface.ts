import { Sequelize } from "sequelize";
import { AlterStageModuleBuilder } from "../../../startup.builder";

export interface IBuilderDiscordEvents extends AlterStageModuleBuilder {
    sequelizeContext: Sequelize | null;

    LoadCommands(): AlterStageModuleBuilder;

    LoadEventHandlers(): AlterStageModuleBuilder;
}