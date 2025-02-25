import { Client, GatewayIntentBits, REST } from "discord.js";
import dcLoggerUtil from "../../../utils/dc-logger.util";
import { ApplicationError } from "../../app.errors/application.error";

/**
 * Reprezentacja klasy instancji modułu hostującego usługę. Zawiera metody zarządzające instancją, parametry konfiguracyjne i przertzymuje obiekty potrzebne do funkcjonowania instancji ale sam ich nie tworzy. Jest podstawą do załączania kolejnych modułów.
 */
class HostInstance
{
    // TODO: wystawić jako zmienna konfiguracyjna
    /**
     * Zakres uprawnień aplikacji
     * */
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

    public get rest(): REST { return HostInstance.rest };
    public get client(): Client<boolean> { return HostInstance.client; }

    /** Statyczny wewnętrzny dostęp do klasy rest */
    protected static rest
        : REST
            = new REST();
    /** Statyczny wewnętrzny dostęp do klienta discord */
    protected static client
        : Client<boolean>
            = new Client({ intents: 0 });

    /** Dostęp do instancji buildera z poziomu encji */
    // protected get instance(): HostBuilder
    // {
    //     if(HostInstance._instance === null) 
    //         throw new BusinessError('instance accesed before creation.').Handle();
    //     return HostInstance._instance;
    // }

    /** Zmienna trzymająca informacje o tym czy instancja została utworzona */
    protected static _instanceCreated: boolean = false;

    /** Instancja buildera */
    private static _instance: HostInstance | null = null;

    /** Dostęp statyczny do instancji */
    public static get instance(): HostInstance {
        if(HostInstance._instance === null) 
            throw new ApplicationError('instance accesed before creation.').Handle();
        return HostInstance._instance;
    }
    
    /** Metoca resetująca całą instancję hosta */
    protected static resetInstance() { 
        this._instanceCreated = false;
        this._instance = null;
    }

    public static CreateInstanceStatic(afterLoginCallback: () => void, instance: HostInstance)
    {
        if(HostInstance._instanceCreated == true)
            new Error('Instancja została ju utworzona, przerywam tworzenie nowej...');
        else{
            try {
                HostInstance._instance = instance as HostInstance;
                this.SetUpClient(afterLoginCallback)
                this.ClientLogin(); // w klasie jest zakomentowana opcja asyncowania tej metody
                this.SetUpRest();
                this._instanceCreated = true;
            } catch (e: Error | any) {
                HostInstance.resetInstance();
                throw new e.throw2('Instance creation failed. Process caancelled.');
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
{
    CreateInstance(afterLoginCallback: () => IHostBuilder): void {
        HostBuilder.CreateInstanceStatic(afterLoginCallback, this as HostInstance); 
    }
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

/** Interfejs buildera, wystawia metody uywane do tworzenia modułów */
export interface IHostBuilder// extends IEventsBuilder<IHostBuilder>
{
    //readonly instance 
    //    : HostBuilder;        
    //readonly client
    //    : Client<boolean>;
    //readonly rest
    //    : REST;
    CreateInstance(
        afterLoginCallback: () => HostBuilder)
            : void;
}

// EXAMPLE->    doładowanie modułu poprzez require():  
// EXAMPLE->        const __hostInstance: IHostBuilder = require('./module.host.builder').default;
class __hostInstance implements IHostBuilder { // IHostBuilder  // EXAMPLE: merging modules to one

            // IHostBuilder members:
            private constructor() {
                return new HostBuilder() as unknown as __hostInstance;
            }
            static CreateInstance(afterLoginCallback: () => void): void {
                HostBuilder.CreateInstanceStatic(afterLoginCallback, new HostBuilder() as HostInstance); 
            }
            CreateInstance(afterLoginCallback: () => void): void {
                __hostInstance.CreateInstance(afterLoginCallback);
            }
            // private set instance(i :HostBuilder){
            //     this._instance = i;
            // }
            // public get instance(): HostBuilder { 
            //     return HostInstance.instance; 
            // }
            // public static get instance(): HostBuilder { 
            //     return HostInstance.instance; 
            // }
            // get client(): Client<boolean> { 
            //     return HostInstance.instance?.client; 
            // }
            // get rest(): REST { 
            //     return HostInstance.instance?.rest;
            // }


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