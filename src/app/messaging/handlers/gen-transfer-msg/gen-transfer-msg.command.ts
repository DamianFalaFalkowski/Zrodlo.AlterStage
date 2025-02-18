import { APIRole, ChatInputCommandInteraction, MessageFlags, Role } from 'discord.js';
import dcLogger from '../../../utils/dc-logger.util';
import { GenerateTransferMessageResponse } from './gen-transfer-msg.response';
import { BaseCommand } from '../_command-handling-base/base.command';

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie
export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageResponse> {
    public readonly RoleToBuy: Role | APIRole;

    constructor(interaction: ChatInputCommandInteraction, isEphemeral: boolean) {
        try {
            let RoleToBuy = interaction.options.getRole('role-to-buy', true);
            super(interaction, new GenerateTransferMessageResponse(isEphemeral, RoleToBuy))
            this.RoleToBuy = RoleToBuy;
            console.log('Option found tempRoleToBuy: ' + RoleToBuy);

            this.CheckAuthorisationAndValidity(); 
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzenie czy GenerateTransferMessageCommand moze byc wykonany
    public override CheckAuthorisationAndValidity(): boolean {
        try {
            if (this.RoleToBuy === undefined || this.Response.RoleToBuy === null) {
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
