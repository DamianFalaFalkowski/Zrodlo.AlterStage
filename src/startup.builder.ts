import { Client, GatewayIntentBits, REST } from 'discord.js';
import { IDiscordRestBuilder } from './modules/discord-client/startup-builders/builder.discord-rest.interface';
import { IDiscordClientBuilder } from './modules/discord-client/startup-builders/builder.client.interface';
import { IBuilderSequelizeSqLite } from './modules/sqlite/startup-builders/builder.sequelize.sqlite.interface';
import { DataTypes, Sequelize } from 'sequelize';
import dcLogger from './app/utils/dc-logger.util';
import { IBuilderDiscordEvents } from './app/messaging/startup-builders/builder.dc-events.interface';
import path from 'node:path';
import fs from 'node:fs';
import { FindCommandHandlersUtil } from './app/utils/find-command-handlers-definitions.util';
import { TagsRepository } from './model/tags.model';

export interface IAlterStageModuleBuilder {
    appVersion: string | null;
    setUpAppVersion(): AlterStageModuleBuilder;
}

export class AlterStageModuleBuilder 
    implements IAlterStageModuleBuilder,
        IDiscordRestBuilder,
        IDiscordClientBuilder,
        IBuilderSequelizeSqLite,
        IBuilderDiscordEvents
{
    private readonly _intends = [ // TODO: przeniesc do .env
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.DirectMessagePolls,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping
        ];

    public appVersion: string | null = null;
    public rest: REST | null = null;    
    public client: Client<boolean> | null = null;
    public sequelizeContext: Sequelize | null = null;

    constructor() {
    }

    InitRepositories(): AlterStageModuleBuilder {
        dcLogger.logInfo("Inicjalizuję repozytoria...");
        if(!this.sequelizeContext)
            throw Error("DB context is missing!")
        
        // konfiguracja modelu bazy
        TagsRepository.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: DataTypes.STRING,
                userId: { type: DataTypes.NUMBER, allowNull: false},
                createdUserId: { type: DataTypes.NUMBER, allowNull: false},
            },
            {
                sequelize: this.sequelizeContext, // We need to pass the connection instance
                modelName: 'Tags', // We need to choose the model name
            }
        );
        return this;
    }

    LoadCommands(): AlterStageModuleBuilder {
        dcLogger.logInfo("Rejestruję polecenia...");
        if(!this.client)
            throw Error("Client is missing");
        FindCommandHandlersUtil.LoadCommmandsToClient(this.client, path.join(__dirname, 'app/messaging/handlers'));
        return this;
    }

    async ClientLogin(): Promise<AlterStageModuleBuilder> {
        dcLogger.logInfo("Loguję się do clienta discord...");
        if(!this.client) 
            throw Error("Client is missing");
        await this.client.login(process.env.TOKEN);
        return this;
    }

    LoadEventHandlers(): AlterStageModuleBuilder {
        dcLogger.logInfo("Rejestruję event handlery...");
        if(!this.client)
            throw Error("Client is missing");
        // Read event handlers from the events directory
        const eventsPath = path.join(__dirname, 'app/messaging/events');
        const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));
        
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }
            dcLogger.logInfo(`Exevution of event ${event.name} has been added`);
        }
        return this;
    }
    
    public SetDbConnection( // TODO: przeniesc do .env
        databaseName: 'database', 
        userName: 'user', 
        password: 'password',
        host: 'localhost', 
        dialect: 'sqlite', 
        logging: false, 
        storage: 'database.sqlite')
    : AlterStageModuleBuilder {
        dcLogger.logInfo("Nawiązuję połączenie z bazą danych...");
            this.sequelizeContext = new Sequelize(databaseName, userName, password, {
                host: host,
                dialect: dialect,
                logging: logging,
                storage: storage,
            }); 
            this.sequelizeContext.afterSync(() => dcLogger.logInfo('Database synchronized'));
            return this;
    }

    public setUpAppVersion() : AlterStageModuleBuilder{
        dcLogger.logInfo("Ustawiam wersję aplikacji...");
        this.appVersion = process.env.VERSION as string;
        return this;
    }

    public SetUpClient(): AlterStageModuleBuilder {
        dcLogger.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this._intends });
        return this;
    }

    public SetUpRest(): AlterStageModuleBuilder {
        dcLogger.logInfo("Tworzę REST...");
        this.rest = new REST()
            .setToken(process.env.TOKEN as string);
        return this;
    }
};