import { Sequelize } from "sequelize";
import { IAlterStageModuleBuilder } from '../../module.alter-stage.builder';

export interface IBuilderDiscordEvents {
    sequelizeContext: Sequelize | null;

    LoadCommands(): IAlterStageModuleBuilder;

    LoadEventHandlers(): IAlterStageModuleBuilder;
}