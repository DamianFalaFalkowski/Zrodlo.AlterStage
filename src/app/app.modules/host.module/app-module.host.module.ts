import { HostBuilder } from "./app-module.host.builder";
import { IHost } from "./app-module.host.instance";
import { IGetClientIntegration } from "./integrations/get-client.host.integration";
import { CommandHandlersUtil } from "../../../discord/find-command-handlers-definitions.util";
import { IGetGuildDataIntegration } from "./integrations/get-guild-channel.integration";
import { ForumChannel, GuildChannel, Message } from "discord.js";
import { __logger } from "../../../utils/dc-logger.util";
import { ApplicationError } from "../../app.errors/application.error";
import { IPostThreadInForumChannelIntegrationProvider } from "./integrations/post-thread-in-forum-channel.integration";
import { IFillTemplateWithDataIntegrationProvider } from "./integrations/fill-template-with-data.integration";
import { FillTemplateService } from "./services/fill-template.service";
import { IOnMessageCreateIntegrationProvider } from "./integrations/on-message-create.integration";

export class HostModule
    extends 
        HostBuilder
    implements 
        IHost,
        IGetClientIntegration,
        IGetGuildDataIntegration,
        IPostThreadInForumChannelIntegrationProvider,
        IFillTemplateWithDataIntegrationProvider,
        IOnMessageCreateIntegrationProvider
{
    private constructor() {
        super();
    }
    OnMessageCreate(handle: (message: Message) => void): void
    {
        this.client!.on('messageCreate', handle);
        __logger.logInfo("Zarejestrowano obsługę zdarzenia 'messageCreate'");

        this.client!.on('messageCreate', (message: Message) => {
            // Sprawdź, czy wiadomość pochodzi z oczekiwanego kanału tekstowego
            if (message.channel.id === process.env.VERIFICATION_CHANNEL_ID &&
                !message.author.bot) 
            {
                message.attachments.forEach(attachment => {
                    // Sprawdź, czy załącznik jest obrazkiem
                    if (attachment.contentType && attachment.contentType.startsWith('image/')) {
                        __logger.logInfo(`Otrzymano zdjęcie od użytkownika ${message.author.username}: ${attachment.url}`);
                        // Tutaj możesz dodać logikę do przetwarzania zdjęcia
                    } else {
                        __logger.logInfo(`Otrzymano nieobsługiwany załącznik od użytkownika ${message.author.username}: ${attachment.name}`);
                    }
                })
            }
            else {
                __logger.logInfo(`Wiadomość na kanale: ${message.content}`);
            }
        });
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