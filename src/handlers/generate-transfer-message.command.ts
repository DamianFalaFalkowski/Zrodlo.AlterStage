import { ChatInputCommandInteraction,  } from 'discord.js';
import { BaseCommand } from '../prototype/base-command';
import { GenerateTransferMessageResponse } from './generate-transfer-message.response';

export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageResponse> {
// COMMAND SETTINGS
public static readonly __allowedRoles 
    = ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'];
protected static readonly __isEphemeral: boolean 
    = true;
// COMMAND SETTINGS


// OPTIONS
public readonly RoleToBuyName: string | undefined;
// OPTIONS


    constructor(interaction: ChatInputCommandInteraction) {
        let tempRoleToBuy = interaction.options.data[0].role!.name;
        console.log('Option found tempRoleToBuy: ' + tempRoleToBuy);
        super(interaction, GenerateTransferMessageCommand.__allowedRoles,
            new GenerateTransferMessageResponse(
                GenerateTransferMessageCommand.__isEphemeral, 
                tempRoleToBuy
            ));
        this.RoleToBuyName = tempRoleToBuy;
        this.CheckAuthorisation();
    }

    // sprawdzenie czy GenerateTransferMessageCommand moze byc wykonany
    public CheckAuthorisation(): boolean {
        //super.CheckAuthorisation(); // chyba tu jest nie potrzebne
        if (this.RoleToBuyName === undefined || this.RoleToBuyName === null || this.RoleToBuyName.length === 0) {
            this.IsSucess = false;
            this.Response.prepeareFailureResponse('Invalid command. RoleToBuyName parameter is missing.');
            return false;
        }
        return true;
    }
}