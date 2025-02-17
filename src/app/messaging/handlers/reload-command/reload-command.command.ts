// import { ChatInputCommandInteraction } from "discord.js";
// import { BaseCommand } from "../../_base/commands/base.command";
// import dcLogger from "../../../utils/dc-logger.util";

// export class ReloadCommandCommand extends BaseCommand<ReloadCommandResponse> {
//     public readonly CommandName: string | undefined;

//     constructor(interaction: ChatInputCommandInteraction) {
//         try {
//             let commandName = interaction.options.getString('command', true).toLowerCase();
//             console.log('Option found definition: ' + commandName);
//             super(interaction)
//             this.CommandName = commandName;
//             this.CheckAuthorisation(); 
//         } catch (error) {
//             dcLogger.logError(error as Error);
//             throw error;
//         }
//     }

//     // sprawdzenie czy command moze byc wykonany
//     public CheckAuthorisation(): boolean {
//         try {
//             if (this.CommandName === undefined || this.CommandName === null || this.CommandName.length === 0) {
//                 this.IsSucess = false;
//                 this.Response.PepeareFailureResponse('Invalid command. \'command\' parameter is missing.');
//                 return false;
//             }
//             return true;
//         } catch (error) {
//             dcLogger.logError(error as Error);
//             throw error;
//         }
//     }
// }