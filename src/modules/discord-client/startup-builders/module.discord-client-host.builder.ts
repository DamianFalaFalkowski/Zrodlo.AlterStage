import { Client, GatewayIntentBits, REST } from "discord.js";
import dcLoggerUtil from "../../../app/utils/dc-logger.util";
import { IDiscordClientHostModuleBuilder } from "../builders-interfaces/discord-client.builder.interface";

class DiscordClientHostModuleBuilder implements IDiscordClientHostModuleBuilder
{
    public _afterLoginCallback!: () => {};

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

    public rest: REST | null = null;    
    public client: Client<boolean> | null = null;

    public static readonly __discordClientHostModuleBuilder
        : DiscordClientHostModuleBuilder = new DiscordClientHostModuleBuilder();   
    
    public async ClientLogin(afterLoginCallback: () => void): Promise<DiscordClientHostModuleBuilder> {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!this.client)
            throw Error("Client is missing");
        await this.client.login(process.env.TOKEN);
        return this;
    }

    public SetUpClient(): DiscordClientHostModuleBuilder {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        this.client = new Client({ intents: this._intends });
        return this;
    }

    public SetUpRest(): DiscordClientHostModuleBuilder {
        dcLoggerUtil.logInfo("Tworzę REST...");
        let _rest = new REST()
            .setToken(process.env.TOKEN as string);
        return this;;
    }
}
export default DiscordClientHostModuleBuilder.__discordClientHostModuleBuilder;