import { REST } from "discord.js";
import dcLoggerUtil from "../../../app/utils/dc-logger.util";

class DiscordRestBuilder {

    public SetUpRest(): REST {
        dcLoggerUtil.logInfo("Tworzę REST...");
        let _rest = new REST()
            .setToken(process.env.TOKEN as string);
        return _rest;
    }
}
export default new DiscordRestBuilder();