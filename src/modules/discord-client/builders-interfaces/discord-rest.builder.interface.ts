import { REST } from "discord.js";
import { AlterStageModuleBuilder, IAlterStageModuleBuilder } from "../../../startup.builder";

export interface IDiscordRestBuilder extends IAlterStageModuleBuilder
{
    SetUpRest(): AlterStageModuleBuilder

    rest: REST | null;
} 