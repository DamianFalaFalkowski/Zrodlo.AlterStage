import { GuildForumThreadCreateOptions } from "discord.js";

export interface IGuildChannelManagementIntegration
{
    CreateForumThread(channelId: string, options: GuildForumThreadCreateOptions): Promise<boolean>;
}