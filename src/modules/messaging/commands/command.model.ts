import { SlashCommandBuilder, Interaction, ChatInputCommandInteraction, SharedSlashCommandOptions, SlashCommandOptionsOnlyBuilder, Events, ActivityType, ApplicationCommandType, ApplicationCommand, Client, Guild, Snowflake } from 'discord.js';
import { RawApplicationCommandData } from 'discord.js/typings/rawDataTypes';


// class CommandDefinition   
// {

//     public internalId: string;
//     public data: SlashCommandBuilder 
//         | SlashCommandOptionsOnlyBuilder 
//         | ChatInputCommandInteraction
//         | any;
//     public execute: (interaction: Interaction | any) => Promise<void>;
//     public isEphemeral?: boolean;
//     public allowedRoles?: string[];

//     constructor(o: CommandDefinition) 
//     {
//         {
//             this.internalId = o.internalId;
//             this.data = o.data;
//             this.execute = o.execute;
//             this.isEphemeral = o.isEphemeral;
//             this.allowedRoles = o.allowedRoles;
//         }
//     }
// }
// export default CommandDefinition;


// Nie można przypisać argumentu typu „{ id: string; isEphemeral: true; allowedRoles: string[]; name: string; type: string; data: SlashCommandOptionsOnlyBuilder; execute(interaction: any): Promise<...>; }” do parametru typu „CommandDefinition”.
//   Właściwości „Awaitable” brakuje w typie „{ id: string; isEphemeral: true; allowedRoles: string[]; name: string; type: string; data: SlashCommandOptionsOnlyBuilder; execute(interaction: any): Promise<...>; }”, ale jest wymagana w typie „CommandDefinition”.