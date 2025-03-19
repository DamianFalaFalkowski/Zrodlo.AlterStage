import { GuildChannel } from "discord.js";

export interface IGetGuildDataIntegration 
{
    GetGuildChannel<T extends GuildChannel>(channelId: string): Promise<T>;
}