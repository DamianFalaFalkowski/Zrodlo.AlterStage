import { Client, GatewayIntentBits } from "discord.js";
import dcLoggerUtil from "../../../app/utils/dc-logger.util";
import AlterStageAppStartup from '../../../startup';

class DiscordClientBuilder {
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

    public async ClientLogin(client :Client | null): Promise<Client> {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!client)
            throw Error("Client is missing");
        await client.login(process.env.TOKEN);
        return client;
    }

    public SetUpClient(): Client {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        return new Client({ intents: this._intends });
    }
}
export default new DiscordClientBuilder();