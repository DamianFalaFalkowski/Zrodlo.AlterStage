import { Client, REST } from "discord.js";
import dcLoggerUtil from "../../../utils/dc-logger.util";
import { HostInstance, IHostInstance } from "./app-module.host.instance";
import { HostModule } from './app-module.host.module';

export interface IHostBuilder
    extends
        IHostInstance
{
    SetUpClient(afterLoginCallback: () => void): HostModule;
    SetUpRest(): HostModule;
    ClientLogin(): HostModule;
}

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

export abstract class HostBuilder
    extends HostInstance
    implements IHostBuilder
{
    SetUpClient(afterLoginCallback: () => void): HostModule {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this.intends });
        this.client.once('ready', afterLoginCallback);
        dcLoggerUtil.logInfo(`Exevution of event 'ready' has been added`);
        this._isClientSetUp = true;
        return this as unknown as HostModule;
    }
    SetUpRest(): HostModule {
        dcLoggerUtil.logInfo("Tworzę REST...");
        this.rest = new REST()
            .setToken(process.env.TOKEN as string);
        return this as unknown as HostModule;
    }
    ClientLogin(): HostModule {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!this.client)
            throw Error("Client is missing");
        this.client.login(process.env.TOKEN);
        return this as unknown as HostModule;
    }
}
