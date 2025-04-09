import { Client, Collection, GatewayIntentBits, REST } from 'discord.js';
import { AppModule } from '../app.module';

/** Interfejs umozliwiający sprawdzenie czy poszczególne elementy modułu są uruchomione i gotowe do uycia */
export interface IHost 
{
    isClientSetUp(): boolean;
    isRestSetUp(): boolean;
    areCommandsPublished(): boolean;
    isInteractionCreateEventHandled(): boolean;
}

/** Interfejs zawierający opisy metod ktore odpowiadaja za uruchomienie poszczegolnych elementow modulu, elementy moga byc od siebie zalezne */
export interface IHostInstance extends IHost
{
    rest: REST | undefined;
    client: Client<boolean> | undefined;
    intends: GatewayIntentBits[];
    commands: any[];
    
}

export abstract class HostInstance extends AppModule implements IHostInstance
{
    
    public readonly intends: GatewayIntentBits[] = [
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

    protected _isClientSetUp: boolean = false;
    protected _isRestSetUp: boolean = false;
    protected _isInteractionCreateHandled: boolean = false;
    protected _areCommandsPublished: boolean = false;

    public isClientSetUp(): boolean { return this._isClientSetUp; };
    public isRestSetUp(): boolean { return this._isRestSetUp; };
    public areCommandsPublished(): boolean { return this._areCommandsPublished; };    
    public isInteractionCreateEventHandled(): boolean { return this._isInteractionCreateHandled; };

    public rest: REST | undefined;
    public client: Client<boolean> | undefined;
    public commands: any[] = [];
    

    /** Statyczny wewnętrzny dostęp do klasy rest */
    protected static rest
        : REST
            = new REST();
    /** Statyczny wewnętrzny dostęp do klienta discord */
    protected static client
        : Client<boolean>
            = new Client({ intents: 0 });
}