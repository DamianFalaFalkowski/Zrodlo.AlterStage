import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import dcLogger from '../../../utils/dc-logger.util';
import { GenerateTransferMessageResponse } from './gen-transfer-msg.response';
import { BaseCommand } from '../_command-handling-base/base.command';

export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageResponse> {
    public readonly RoleToBuyName: string | undefined;

public CreateResponseObject(): GenerateTransferMessageResponse {
        return new GenerateTransferMessageResponse(this);
    }


    constructor(interaction: ChatInputCommandInteraction) {
        try {
            let tempRoleToBuy = interaction.options.getRole('role-to-buy', true) ;
            console.log('Option found tempRoleToBuy: ' + tempRoleToBuy.name);
            super(
                interaction)
            this.RoleToBuyName = tempRoleToBuy.name;
            this.CheckAuthorisationAndValidity(); 
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzenie czy GenerateTransferMessageCommand moze byc wykonany
    public override CheckAuthorisationAndValidity(): boolean {
        try {
            if (this.RoleToBuyName === undefined || this.RoleToBuyName === null || this.RoleToBuyName.length === 0) {
                //  TODO: ogar b
                //this.IsSucess = false;
                //this.Response!.PepeareFailureResponseBase('Invalid command. RoleToBuyName parameter is missing.');
                return false;
            }
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}
