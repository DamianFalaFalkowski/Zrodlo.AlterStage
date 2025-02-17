import dcLoggerUtil from "../../../../app/utils/dc-logger.util";
import { GuildInfo } from "../../../discord-client/model/guild.interface.model";
import AlterStageAppStartup from '../../../../startup';
import { Routes } from 'discord.js';

module.exports = {
    messageName: 'adm-msg-fetch-channels',
    params: [ 'text', 'voice', 'general'],

    _failsCount: 0,

    async Execute(...options: string[]) {
        let textChannelsFilter = options.find(x => x === 'text')!.length > 0;
        let voiceChannelsFilter = options.find(x => x === 'voice')!.length > 0;
        let generalChannelsFilter = options.find(x => x === 'general')!.length > 0;
        const filter = [ textChannelsFilter ? 'Text Channels' : null, voiceChannelsFilter ? 'Voice Channels' : null, generalChannelsFilter ? 'General' : null];
        dcLoggerUtil.logInfo(`Rozpoczynam pobieranie informacji o kanałach (${textChannelsFilter ?? 'Text Channels'} ${voiceChannelsFilter ?? 'Voice Channels'} ${generalChannelsFilter ?? 'General Channels'})`);

        try {
            let data = await AlterStageAppStartup.rest?.get(
                Routes.guildChannels(process.env.GUILD_ID as string)
            );
            // FULL INFO:
                //dcLoggerUtil.logInfo(`Pobrano informacje o  kanałach:\n` + JSON.stringify(data));
                
            // SELECTED INFO:
            let guild_channels: GuildInfo[] = JSON.parse(JSON.stringify(data));
            dcLoggerUtil.logInfo(`Pobrano informacje o ${guild_channels.length} kanałach.\n\n${guild_channels.map(
                x=> JSON.stringify(
    { id: x.id, name: x.name, aviable_tags: x.available_tags?.map(x => x.name).join(', ') }, null, 2))}`);
                
        } catch (error) {
            dcLoggerUtil.logError(error as Error);
            dcLoggerUtil.logStringError("Treść błędu:\n" + JSON.stringify(error, null, 2));
            throw error;
        }

    }
}