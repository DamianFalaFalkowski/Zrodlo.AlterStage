export class IGuild {
    id: string  | undefined
    name: string  | undefined
    constructor(guild: IGuild) {
        this.id = guild.id
        this.name = guild.name
    }
}



export class GuildInfo {
    id: string  | undefined
    type: number  | undefined
    flags: number  | undefined
    guild_id: string  | undefined
    name: string  | undefined
    parent_id?: string  | undefined
    position: number  | undefined
    permission_overwrites: PermissionOverwrite[]  | undefined
    last_message_id?: string  | undefined
    last_pin_timestamp?: string  | undefined
    rate_limit_per_user?: number  | undefined
    topic?: string  | undefined
    default_auto_archive_duration?: number  | undefined
    nsfw?: boolean
    bitrate?: number  | undefined
    user_limit?: number  | undefined
    rtc_region: any
    available_tags?: AvailableTag[]
    default_reaction_emoji?: DefaultReactionEmoji
    default_sort_order?: number  | undefined
    default_forum_layout?: number  | undefined
    icon_emoji: any
    theme_color: any
    template?: string  | undefined
  }
  
  export class PermissionOverwrite {
    id: string  | undefined
    type: number  | undefined
    allow: string  | undefined
    deny: string  | undefined
  }
  
  export class AvailableTag {
    id: string  | undefined
    name: string  | undefined
    moderated: boolean | undefined
    emoji_id: any
    emoji_name: any
  }
  
  export class DefaultReactionEmoji {
    emoji_id: any
    emoji_name: string  | undefined
  }