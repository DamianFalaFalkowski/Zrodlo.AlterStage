import { Client, GatewayIntentBits, REST } from "discord.js";
import dcLoggerUtil from "./app/utils/dc-logger.util";
import { IEventsBuilder } from "./app/messaging/startup-builders/builder.events.interface";
import { Sequelize } from "sequelize";
import { FindCommandHandlersUtil } from "./app/utils/find-command-handlers-definitions.util";
import path from "path";
import fs from 'node:fs';

// TODO: dodać komentarze. Ta klasa nie powinna juz byc edytowana (20-02-2025)
abstract class HostInstance
{
    private static _instanceCreated: boolean = false;

    protected static readonly _intends = [
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
    protected static rest
        : REST
            = new REST();
    protected static client
        : Client<boolean>
            = new Client({ intents: this._intends }); // TODO: tutaj chyba trzeba bedzie stworzyc jakiegos mocka

    public static instance 
        : HostBuilder;  

    public static CreateInstance(afterLoginCallback: () => void) : void { 
        new HostBuilder(afterLoginCallback); 
    }

    public CreateInstance(afterLoginCallback: () => void) : void {
        HostInstance.CreateInstance(afterLoginCallback);
    }

    protected static CreateInstanceStatic(afterLoginCallback: () => void, instance: HostBuilder)
        : void
    {
        this.instance = instance;
        if(this._instanceCreated != null)
            return;
        this.SetUpClient(afterLoginCallback)
        this.SetUpRest();
        this.ClientLogin(); // TODO: sprawdzic jak zachowa sie metoad ClientLoginAsync() ????
    }

    protected static SetUpClient(afterLoginCallback: () => void) 
    {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this._intends });
        this.client.once('ready', afterLoginCallback);
        dcLoggerUtil.logInfo(`Exevution of event 'ready' has been added`);
        this._instanceCreated = true;
    }

    protected static async ClientLoginAsync(): Promise<void> {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!HostInstance.client)
            throw Error("Client is missing");
        await HostInstance.client.login(process.env.TOKEN);
    }

    protected static ClientLogin(): void {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!HostInstance.client)
            throw Error("Client is missing");
        HostInstance.client.login(process.env.TOKEN);
    }

    protected static SetUpRest() 
    {
        dcLoggerUtil.logInfo("Tworzę REST...");
        this.rest = new REST()
            .setToken(process.env.TOKEN as string);
    }
}

class HostBuilder 
    extends 
        HostInstance 
    implements 
        IHostBuilder,
        IEventsBuilder<HostBuilder> 
{
    readonly instance: HostBuilder = HostInstance.instance;
    readonly rest: REST = HostInstance.rest;
    readonly client: Client<boolean> = HostInstance.client;

    // public CreateInstance(afterLoginCallback: () => void) : void { 
    //     new HostBuilder(afterLoginCallback); 
    // }
    
    // public CreateInstance(afterLoginCallback: () => void, instance: HostBuilder) : void { // to chyba do wyjebania
    //     HostBuilder.CreateInstanceStatic(afterLoginCallback, instance); 
    // }    
    constructor(afterLoginCallback: () => void) { 
        super(); HostInstance.CreateInstanceStatic(afterLoginCallback, this); 
}  

    // public async ClientLoginAsync()
    //     : Promise<void> 
    // {
    //     await HostInstance.ClientLoginAsync();
    // }

    // public ClientLogin(): void {
    //     dcLoggerUtil.logInfo("Loguję się do clienta discord...");
    //     HostInstance.ClientLogin();
    // }
    
    public sequelizeContext: Sequelize | null = null;
    LoadCommands()
        : HostBuilder 
    {
        dcLoggerUtil.logInfo("Rejestruję polecenia...");
        if (!HostInstance.client)
            throw Error("Client is missing");
        FindCommandHandlersUtil.LoadCommmandsToClient(HostInstance.client, path.join(__dirname, 'app/messaging/handlers'));
        return this;
    }

    LoadEventHandlers()
        : HostBuilder 
    {
        dcLoggerUtil.logInfo("Rejestruję event handlery...");
        if (!HostInstance.client)
            throw Error("Client is missing");
        // Read event handlers from the events directory
        const eventsPath = path.join(__dirname, 'app/messaging/events');
        const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                HostInstance.client.once(event.name, (...args) => event.execute(...args));
            } else {
                HostInstance.client.on(event.name, (...args) => event.execute(...args));
            }
            dcLoggerUtil.logInfo(`Exevution of event ${event.name} has been added`);
        }
        return this;
    }
}
export interface IHostBuilder
{
    readonly instance 
        : HostBuilder;        
    readonly client
        : Client<boolean>;
    readonly rest
        : REST;
    CreateInstance(
        afterLoginCallback: () => void)
            : void;
  // ZAKOMENTOWANE BO NIE WYDAJE MI SIE ZE TE METODY NIE BEDA PORZEBNER PUBLICZNIE
  //  ClientLoginAsync()
  //      : Promise<void>;
  //  ClientLogin()
  //      : void;
}

const __hostInstance : IHostBuilder  // EXAMPLE: merging modules to one
= {
    instance: HostInstance.instance,
    client: HostInstance.instance?.client,
    rest: HostInstance.instance?.rest,
    CreateInstance: HostInstance.CreateInstance,
  //  ClientLoginAsync: HostInstance.instance.ClientLoginAsync,
  //  ClientLogin: HostInstance.instance.ClientLogin,
}
export default __hostInstance; // EXAMPLE: export merged module by 'export default'