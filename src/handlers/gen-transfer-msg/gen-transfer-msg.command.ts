import { ChatInputCommandInteraction } from 'discord.js';
import { BaseCommand } from '../../modules/messaging/commands/base.command';
import dcLogger from "../../utils/dc-logger";
import { GenerateTransferMessageResponse,  } from './gen-transfer-msg.response';
//import "gen-transfer-msg.definition";

export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageResponse> {
    public readonly RoleToBuyName: string | undefined;

    constructor(interaction: ChatInputCommandInteraction) {
        try {
            let definition = module.require(`./${interaction.commandName}.definition`);
            // let definition = module.require(interaction.commandName + '.command');
            // let definition = module.require(interaction.commandName + '.response');
            // let definition = module.require(interaction.commandName + '.handler');
            let tempRoleToBuy = interaction.options.getRole('role-to-buy', true) ;
            console.log('Option found tempRoleToBuy: ' + tempRoleToBuy.name);
            super(
                interaction, 
                definition.allowedRoles!, 
                new GenerateTransferMessageResponse(
                    definition.isEphemeral, 
                    tempRoleToBuy.name))
            this.RoleToBuyName = tempRoleToBuy.name;
            this.CheckAuthorisation(); 
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzenie czy GenerateTransferMessageCommand moze byc wykonany
    public CheckAuthorisation(): boolean {
        try {
            if (this.RoleToBuyName === undefined || this.RoleToBuyName === null || this.RoleToBuyName.length === 0) {
                this.IsSucess = false;
                this.Response.prepeareFailureResponse('Invalid command. RoleToBuyName parameter is missing.');
                return false;
            }
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}
