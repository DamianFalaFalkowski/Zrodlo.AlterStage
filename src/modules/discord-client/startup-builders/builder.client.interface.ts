import { Client } from "discord.js";
import { AlterStageModuleBuilder, IAlterStageModuleBuilder } from "../../../startup.builder";

export interface IDiscordClientBuilder extends IAlterStageModuleBuilder
{
    SetUpClient(): AlterStageModuleBuilder;

    ClientLogin(): Promise<AlterStageModuleBuilder>;

    client: Client | null;
}