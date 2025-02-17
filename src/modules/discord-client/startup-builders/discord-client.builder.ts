import { Client, GatewayIntentBits } from "discord.js";
import dcLoggerUtil from "../../../app/utils/dc-logger.util";
import { AlterStageModuleBuilder } from "../../../startup.builder";

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

    public async ClientLogin(builder :AlterStageModuleBuilder): Promise<AlterStageModuleBuilder> {
        dcLoggerUtil.logInfo("Loguję się do clienta discord...");
        if (!builder.client)
            throw Error("Client is missing");
        await builder.client.login(process.env.TOKEN);
        return builder;
    }

    public SetUpClient(builder :AlterStageModuleBuilder): AlterStageModuleBuilder {
        dcLoggerUtil.logInfo("Tworzę klienta discord...");
        builder.client = new Client({ intents: this._intends });
        return builder;
    }
}
export default new DiscordClientBuilder();