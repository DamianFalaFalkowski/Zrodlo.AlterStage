import { Message } from "discord.js";
import { AppModule } from "../../app/app.modules/app.module";
import { IOnMessageCreateIntegrationConsumer } from '../../app/app.modules/host.module/integrations/on-message-create.integration';
import { UsersBuilder } from "./users.builder";
import { IUsers } from "./users.instance";
import { __logger } from "../../utils/dc-logger.util";
import { ftpFileUpload } from "../../utils/ftp-file-upload.util";
import { UsersDataModule } from "../../data/modules/users-data.module/users-data.module";
import { UserRepository } from "../../data/model/sch.users/repositories/user.repository";
import { IGetClientIntegration } from "../../app/app.modules/host.module/integrations/get-client.host.integration";
import { UserActionLogRepository } from "../../data/model/sch.users/repositories/user-action-log.repository";
import { UserActionType } from "../../data/model/sch.users/enums/user-action-type.enum";

interface IUsersDependency<
    T extends IOnMessageCreateIntegrationConsumer | IGetClientIntegration,
    U extends UsersDataModule>
{
    initialize(hostModule: T, usersData: U): AppModule;
}

export class UsersModule<
    T extends IOnMessageCreateIntegrationConsumer | IGetClientIntegration,
    U extends UsersDataModule>
    extends UsersBuilder
    implements IUsers, IUsersDependency<T, U>
{
    private _dependencyHost: T;
    private _usersData: U;

    public SetUpOnMessageCreate(): void
    {
        (this._dependencyHost as IOnMessageCreateIntegrationConsumer).SetUpOnMessageCreate(async (message: Message): Promise<void> =>
        {
            // Sprawdź, czy wiadomość pochodzi z oczekiwanego kanału tekstowego
            if (message.channel.id === process.env.VERIFICATION_CHANNEL_ID &&
                !message.author.bot) 
            {
                const user = await UserRepository.findByDiscordUserId(message.author.id);
                if (user !== null && user.verificationPhotoPath !== null)
                {
                    __logger.logStringError(`Użytkownik ${message.author.username} o id ${message.author.id} już istnieje w bazie danych.`);
                    // TODO: dodać obsługę błędu
                    this.DeleteMessage(message);
                }
                else
                {
                    message.attachments.forEach(attachment =>
                    {
                        // Sprawdź, czy załącznik jest obrazkiem
                        if (attachment.contentType && attachment.contentType.startsWith('image/')) 
                        {
                            __logger.logInfo(`Otrzymano zdjęcie od użytkownika ${message.author.username}: ${attachment.url}`);
                            const ftpFilePath = process.env.FTP_PATH + '/' + message.author.id + '.jpg';
                            ftpFileUpload(
                                process.env.FTP_HOST!,
                                process.env.FTP_PORT! as unknown as number,
                                process.env.FTP_USER!,
                                process.env.FTP_PASSWORD,
                                attachment.url,
                                ftpFilePath)
                                .then(() =>
                                {
                                    UserRepository.create(
                                        message.author.id,
                                        message.author.globalName!,
                                        ftpFilePath)
                                        .then(() =>
                                        {
                                            UserActionLogRepository.create(message.author.id, UserActionType.REGISTRATION, `Użytkownik ${message.author.globalName}(${message.author.id}) zarejestrował się poprzez przesłanie zdjęcia.`);
                                            __logger.logInfo(`Utworzono użytkownika w bazie danych: ${message.author.id}, ${message.author.globalName}, ${ftpFilePath}`);
                                            this.DeleteMessage(message);
                                        })
                                        .catch(err =>
                                            // TODO: dodać obsługę błędu
                                            __logger.logStringError(`Nie udało się utworzyć użytkownika w bazie danych: ${err.message}`)
                                        );
                                });
                        }
                        else
                        {
                            __logger.logInfo(`Otrzymano nieobsługiwany załącznik od użytkownika ${message.author.username}: ${attachment.name}`);
                        }
                    });
                }
            }
        });
    }

    protected RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void
    {
        return (this._dependencyHost! as IGetClientIntegration).RegisterCommandHandlers(commandHandlersFolderPaths);
    }
    public getCommandHandlersFolderPaths(): [string] { return super.getCommandHandlersFolderPaths(); }

    private constructor(dependencyHost: T, usersData: U)
    {
        super();
        this._dependencyHost = dependencyHost;
        this._usersData = usersData;
    }

    public static initialize<
        T extends IOnMessageCreateIntegrationConsumer | IGetClientIntegration,
        U extends UsersDataModule>
        (dependencyHost: T, usersData: U): UsersModule<T, U>
    {
        return new UsersModule<T, U>(dependencyHost, usersData);
    }

    initialize(hostModule: T, usersData: U): AppModule
    {
        return UsersModule.initialize(hostModule, usersData);
    }


    private DeleteMessage(message: Message): void
    {
        message.delete()
            .then(() =>
                __logger.logInfo(`Usunięto wiadomość użytkownika ${message.author.username} po weryfikacji.`))
            .catch(err =>
                // TODO: dodać obsługę błędu
                __logger.logStringError(`Nie udało się usunąć wiadomości użytkownika ${message.author.username}: ${err.message}`)
            );
    }
}

const usersModule = <
    T extends IOnMessageCreateIntegrationConsumer,
    U extends UsersDataModule
>(dependencyHost: T, usersData: U)
    : UsersModule<T, U> =>
{
    return UsersModule.initialize(dependencyHost, usersData);
};

export default usersModule;