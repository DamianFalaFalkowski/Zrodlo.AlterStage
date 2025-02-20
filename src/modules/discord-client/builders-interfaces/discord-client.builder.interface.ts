import { Client, REST } from "discord.js";
import { IAlterStageModuleBuilder } from "../../../app/module.alter-stage.builder";

export interface IDiscordClientHostModuleBuilder
{
    rest: REST | null;
    client: Client | null;

    SetUpClient(): IDiscordClientHostModuleBuilder;
    ClientLogin(afterLoginCallback: () => {}): Promise<IDiscordClientHostModuleBuilder>;
    SetUpRest(): IDiscordClientHostModuleBuilder
}