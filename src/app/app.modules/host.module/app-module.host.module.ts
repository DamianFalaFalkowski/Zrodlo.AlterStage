import { HostBuilder } from "./app-module.host.builder";
import { IHost } from "./app-module.host.instance";
import { IGetClientIntegration } from "./integrations/get-client.host.integration";
import { CommandHandlersUtil } from "../../../discord/find-command-handlers-definitions.util";
import { IGetGuildDataIntegration } from "./integrations/get-guild-channel.integration";
import { ForumChannel, GuildChannel } from "discord.js";
import { __logger } from "../../../utils/dc-logger.util";
import { ApplicationError } from "../../app.errors/application.error";
import { IPostThreadInForumChannelIntegrationProvider } from "./integrations/post-thread-in-forum-channel.integration";
import { IFillTemplateWithDataIntegrationProvider } from "./integrations/fill-template-with-data.integration";
import { FillTemplateService } from "./services/fill-template.service";

export class HostModule
    extends 
        HostBuilder
    implements 
        IHost,
        IGetClientIntegration,
        IGetGuildDataIntegration,
        IPostThreadInForumChannelIntegrationProvider,
        IFillTemplateWithDataIntegrationProvider
{
    private constructor() {
        super();
    }
    fillTemplateWithData(templateContent: string, data: Record<string, any>): string
    {
        let templateSrv = new FillTemplateService(templateContent);
        return templateSrv.render(data);
    }
    public async postThreadInForumChannelIfDoesntExist(channelId: string, title: string, content: string, applayTags: string[], imageUrl?: string): Promise<void>
    {
        const ch = await hostModule.As<HostModule>().GetGuildChannel<ForumChannel>(channelId);
        let oldThread = (await ch.threads.fetchActive(false)).threads.find(fn => fn.name === title);
        if (oldThread !== undefined) 
            return;
        await ch.threads.create({
            name: title,
            message: {
            content: content, 
            embeds: imageUrl ? [
                { image: { url: imageUrl}  }
            ] : undefined},
            appliedTags: applayTags
        })
        .then(threadChannel => __logger.logInfo(JSON.stringify(threadChannel)))
        .catch(console.error);
    }
    public async GetGuildChannel<T extends GuildChannel>(channelId: string): Promise<T>
    {
        if(!this.isClientSetUp())
            throw new ApplicationError('Klient nie został załadowany');
        const channels = this.client?.channels.cache;
        return (await channels?.get(channelId)?.fetch())! as unknown as T;
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