import { HostBuilder } from "./app-module.host.builder";
import { IHost } from "./app-module.host.instance";
import { IGetClientIntegration } from "./integrations/get-client.host.integration";
import { CommandHandlersUtil } from "../../../discord/find-command-handlers-definitions.util";
import { IGetGuildDataIntegration } from "./integrations/get-guild-channel.integration";
import { ForumChannel, GuildChannel, GuildForumThreadCreateOptions } from "discord.js";
import { __logger } from "../../../utils/dc-logger.util";
import { ApplicationError } from "../../app.errors/application.error";
import { IGuildChannelManagementIntegration } from "./integrations/guild-channel-management.integration";
import { IPostThreadInForumChannelIntegrationProvider } from "./integrations/post-thread-in-forum-channel.integration";
import { IFillTemplateWithDataIntegrationProvider } from "./integrations/fill-template-with-data.integration";

export class HostModule
    extends 
        HostBuilder
    implements 
        IHost,
        IGetClientIntegration,
        IGetGuildDataIntegration,
        IGuildChannelManagementIntegration,
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
    public async postThreadInForumChannel(channelId: string, title: string, content: string, imageUrl: string, applayTags: string[]): Promise<void>
    {
        const ch = await hostModule.As<HostModule>().GetGuildChannel<ForumChannel>(channelId);
        await ch.threads.create({
            name: title,
            message: {
            content: content, 
            embeds: [
                { image: { url: imageUrl}  }
            ]},
            appliedTags: applayTags
        })
        .then(threadChannel => __logger.logInfo(JSON.stringify(threadChannel)))
        .catch(console.error);
    }

    async CreateForumThread(channelId: string, options: GuildForumThreadCreateOptions): Promise<boolean>
    {
        const ch = await hostModule.As<HostModule>().GetGuildChannel<ForumChannel>(channelId);
        if((await ch.threads.fetch()).threads.find(x => x.name == options.name) === undefined)
            return false;
        await ch.threads.create(options)
        .then(threadChannel => __logger.logInfo(JSON.stringify(threadChannel)))
        .catch(console.error);
        return true;
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