import { Client, Collection, GatewayIntentBits, REST } from "discord.js";
import dcLoggerUtil from "./app/utils/dc-logger.util";
import { timeStamp } from "console";


// TODO: pove to another file or even create a component from it
            abstract class HostErrorHandlerBase{
                protected static _collectedErrors: Collection<Error, any> = new Collection<Error, any>();
                public static get collectedErrors() : Collection<Error, any>{return this._collectedErrors;}
                public static CollectDataAngGenerateErrorReportBase(errorOccurence: Error): any {
                    // TODO: logika obslugi bledu
                    return { a:JSON.stringify(errorOccurence), b:timeStamp.toString() };
                };
            }
            class HostErrorHandler extends HostErrorHandlerBase
            {
                public static CollectDataAngGenerateErrorReport(errorOccurence: Error):any 
                { 
                    const baseData = HostErrorHandlerBase.CollectDataAngGenerateErrorReportBase(errorOccurence);
                    // TODO: logika obslygi bledu
                    const finalData = JSON.stringify(baseData);
                    return finalData;
                };
            }
            // EXAMPLE=> extension methods           
            declare global {
                interface Error 
                {
                    throw2():Error;
                    collectAndContinue(): void;
                }
            }
            Error.prototype.throw2 = function(): Error {
                HostErrorHandler.CollectDataAngGenerateErrorReport(this);
                return this;
            }
            Error.prototype.collectAndContinue = function() {
                HostErrorHandler.CollectDataAngGenerateErrorReport(this);
                dcLoggerUtil.logError(this);
            }
            // EXAMPLE=> extension methods  
// TODO: pove to another file or even create a component from it



// TODO: dodać komentarze. Ta klasa nie powinna juz byc edytowana (20-02-2025)
class HostInstance
{
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
            = new Client({ intents: 0 });
    public get instance(): HostBuilder
    {
        if(HostInstance._instance === null) 
            throw new Error('instance accesed before creation.').throw2();
        return HostInstance._instance;
    }
    private static _instanceCreated: boolean = false;
    private static _instance: HostBuilder | null = null;
    public static get instance(): HostBuilder {
        if(HostInstance._instance === null) 
            throw new Error('instance accesed before creation.').throw2();
        return HostInstance._instance;
    }
    
    private static resetInstanceCreated() { 
        this._instanceCreated = false;
        this._instance = null;
    }

    public static CreateInstanceStatic(afterLoginCallback: () => IHostBuilder, instance: IHostBuilder)
        : IHostBuilder
    {
        if(this._instanceCreated == true)
            new Error('Instancja została ju utworzona, przerywam tworzenie nowej...');
        else{
            try {
                HostInstance._instance = instance as HostBuilder;
                this.SetUpClient(afterLoginCallback)
                this.ClientLogin(); // w klasie jest zakomentowana opcja asyncowania tej metody
                this.SetUpRest();
                this._instanceCreated = true;
            } catch { 

                this._instanceCreated = false;
            }
        }
        return instance;
    }

    private static SetUpClient(afterLoginCallback: () => void) 
    {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this._intends });
        this.client.once('ready', afterLoginCallback);
        dcLoggerUtil.logInfo(`Exevution of event 'ready' has been added`);
        this._instanceCreated = true;
    }

    private static ClientLogin(): void {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!HostInstance.client)
            throw Error("Client is missing");
        HostInstance.client.login(process.env.TOKEN);
    }

    private static SetUpRest() 
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
        IHostBuilder
       // , IEventsBuilder<HostBuilder> 
{
    public get rest(): REST { return HostInstance.rest };
    public get client(): Client<boolean> { return HostInstance.client; }

    public CreateInstance(afterLoginCallback: () => HostBuilder): void {
        HostInstance.CreateInstanceStatic(afterLoginCallback, new HostBuilder());
    }

    // public readonly sequelizeContext?: Sequelize = undefined;
    
    // public LoadCommands()
    //     : HostBuilder 
    // {
    //     dcLoggerUtil.logDebug(new Error(), `${this.__className}`);
    //     dcLoggerUtil.logInfo("Rejestruję polecenia...");
    //     if (!HostInstance.client)
    //         throw Error("Client is missing");
    //     FindCommandHandlersUtil.LoadCommmandsToClient(HostInstance.client, path.join(__dirname, 'app/messaging/handlers'));
    //     return this;
    // }

    // public LoadEventHandlers()
    //     : HostBuilder 
    // {
    //     dcLoggerUtil.logDebug(new Error(), `${this.__className}`);
    //     dcLoggerUtil.logInfo("Rejestruję event handlery...");
    //     if (!HostInstance.client)
    //         throw Error("Client is missing");
    //     // Read event handlers from the events directory
    //     const eventsPath = path.join(__dirname, 'app/messaging/events');
    //     const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));

    //     for (const file of eventFiles) {
    //         const filePath = path.join(eventsPath, file);
    //         const event = require(filePath);
    //         if (event.once) {
    //             HostInstance.client.once(event.name, (...args) => event.execute(...args));
    //         } else {
    //             HostInstance.client.on(event.name, (...args) => event.execute(...args));
    //         }
    //         dcLoggerUtil.logInfo(`Exevution of event ${event.name} has been added`);
    //     }
    //     return this;
    // }
}
export interface IHostBuilder// extends IEventsBuilder<IHostBuilder>
{
    readonly instance 
        : HostBuilder;        
    readonly client
        : Client<boolean>;
    readonly rest
        : REST;
    CreateInstance(
        afterLoginCallback: () => HostBuilder)
            : void;
}

// EXAMPLE->    doładowanie modułu poprzez require():  
// EXAMPLE->        const __hostInstance: IHostBuilder = require('./module.host.builder').default;
class __hostInstance implements IHostBuilder { // IHostBuilder  // EXAMPLE: merging modules to one
            
            // IHostBuilder members:
            private constructor() {
                this._instance = new HostInstance();
                return this._instance as unknown as __hostInstance;
            }
            static CreateInstance(afterLoginCallback: () => HostBuilder): void {            
                HostInstance.CreateInstanceStatic(afterLoginCallback, new HostBuilder() as IHostBuilder); 
            }
            CreateInstance(afterLoginCallback: () => HostBuilder): void {            
                __hostInstance.CreateInstance(afterLoginCallback);
            }
            private _instance: HostInstance;
            private set instance(i :HostBuilder){
                this._instance = i;
            }
            public get instance(): HostBuilder { 
                return HostInstance.instance; 
            }
            get client(): Client<boolean> { 
                return HostInstance.instance?.client; 
            }
            get rest(): REST { 
                return HostInstance.instance?.rest;
            }


            // // IEventHandlingBuilder // TODO: interfejs a najlepiej cały moduł do utworzenia
            // LoadEventHandlers(): HostBuilder { 
            //     return HostInstance.instance?.LoadEventHandlers(); 
            // }


            // // ICommandHandlingBuilder // TODO: interfejs a najlepiej cały moduł do utworzenia
            // LoadCommands(): HostBuilder { 
            //     return HostInstance.instance?.LoadCommands(); 
            // }


            // // ISequelizeClientBuilder // TODO: interfejs a najlepiej cały moduł do utworzenia
            // get sequelizeContext(): Sequelize | undefined { 
            //     return HostInstance.instance?.sequelizeContext; 
            // }

    }
export default __hostInstance; // EXAMPLE: export merged module by 'export default'