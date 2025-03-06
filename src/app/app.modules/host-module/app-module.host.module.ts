import { Client } from "discord.js";
import { HostBuilder } from "./app-module.host.builder";
import { IHost } from "./app-module.host.instance";
import { IGetClientIntegration } from "./integrations/get-client.host.integration";
import { CommandHandlersUtil } from "../../../discord/find-command-handlers-definitions.util";
import { execute } from '../../../modules/messaging.module/dc-commands/tag-create';

export class HostModule
    extends 
        HostBuilder
    implements 
        IHost,
        IGetClientIntegration
{
    private constructor() {
        super();
    }
    RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void 
    {
        if(!this.isClientSetUp())
            throw new Error("Client is not set up");
        const commands = CommandHandlersUtil.FindCommandHandlersInFolders(this.client!, commandHandlersFolderPaths);
        commands.forEach(command => {
            this.commands.push(command);
        });
    };
    public initialize(): HostModule {
        return HostModule.initialize();
    }
    public static initialize(): HostModule {
        return new HostModule()
    }
}

const hostModule: HostModule = HostModule.initialize();

export default hostModule;