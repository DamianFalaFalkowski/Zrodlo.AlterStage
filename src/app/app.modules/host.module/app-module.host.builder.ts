import { Client, Events, MessageFlags, REST, Routes } from "discord.js";
import { HostInstance, IHostInstance } from "./app-module.host.instance";
import { HostModule } from './app-module.host.module';
import { CommandHandlersUtil } from "../../../discord/find-command-handlers-definitions.util";
import { __logger } from "../../../utils/dc-logger.util";

export interface IHostBuilder
    extends
        IHostInstance
{
    SetUpClient(afterLoginCallback: () => void): HostModule;
    SetUpRest(): HostModule;
    ClientLogin(): HostModule;
    HandleEventInteractionCreate(): HostModule;
    PublishCommands(): Promise<HostModule>;
}

export abstract class HostBuilder
    extends HostInstance
    implements IHostBuilder
{
    public HandleEventInteractionCreate(): HostModule 
    {
        this.client!.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        });
        this._isInteractionCreateHandled = true;
        return this as unknown as HostModule;
    }

    async PublishCommands(): Promise<HostModule> 
    {
        await CommandHandlersUtil.PublishCommands(this.rest!, this.commands, process.env.CLIENT_ID as string, process.env.GUILD_ID as string);
        return this as unknown as HostModule;
    }

    SetUpClient(afterLoginCallback: () => void): HostModule {
        __logger.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this.intends });
        this.client.once('ready', afterLoginCallback);
        __logger.logInfo(`Exevution of event 'ready' has been added`);
        this._isClientSetUp = true;
        return this as unknown as HostModule;
    }

    SetUpRest(): HostModule {
        __logger.logInfo("Tworzę REST...");
        this.rest = new REST()
            .setToken(process.env.TOKEN as string);
        return this as unknown as HostModule;
    }

    ClientLogin(): HostModule {
        __logger.logInfo("Loguję się do clienta discord...");
        if (!this.client)
            throw Error("Client is missing");
        this.client.login(process.env.TOKEN);
        return this as unknown as HostModule;
    }
}
