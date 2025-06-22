import { Message } from "discord.js";
import { AppModule } from "../../app/app.modules/app.module";
import { IOnMessageCreateIntegrationConsumer } from "../../app/app.modules/host.module/integrations/on-message-create.integration";
import { UsersBuilder } from "./users.builder";
import { IUsers } from "./users.instance";
import { __logger } from "../../utils/dc-logger.util";

interface IRentalDependency<T extends IOnMessageCreateIntegrationConsumer>
{
    initialize(hostModule: T): AppModule;
}

export class UsersModule<T extends IOnMessageCreateIntegrationConsumer>
    extends UsersBuilder
    implements IUsers, IRentalDependency<T>
{
    protected RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void
    {
        throw new Error("Method not implemented.");
    }
    protected getCommandHandlersFolderPaths(): [string]
    {
        throw new Error("Method not implemented.");
    }
    public SetUpOnMessageCreate(): void
    {
        this._dependencyHost.SetUpOnMessageCreate((message: Message) =>{
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
    private _dependencyHost: T;

    private constructor(dependencyHost: T) {
        super();
        this._dependencyHost = dependencyHost;
    }

    public static initialize<T extends IOnMessageCreateIntegrationConsumer>(dependencyHost: T): UsersModule<T> {
        return new UsersModule<T>(dependencyHost);
    }

    initialize(hostModule: T): AppModule {
        return UsersModule.initialize(hostModule);
    }
}

const usersModule = <T extends IOnMessageCreateIntegrationConsumer>(dependencyHost: T): UsersModule<T> => {
    return UsersModule.initialize(dependencyHost);
}

export default usersModule;