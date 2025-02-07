import { ChatInputCommandInteraction,  } from 'discord.js';
import { BaseCommand } from '../prototype/base-command';
import { GenerateTransferMessageCommandResponse } from './generate-transfer-message.command-response';

export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageCommandResponse> {
    // command config
    public static readonly AllowedRoles = ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'];
    protected static readonly isEphemeral: boolean = true;

    // Params
    public readonly RoleToBuyName: string | undefined;

    // ctor with authorisation check
    constructor(interaction: ChatInputCommandInteraction) {
        let tempRoleToBuy = interaction.options.data[0].role!.name;
        super(interaction, GenerateTransferMessageCommand.AllowedRoles,
            new GenerateTransferMessageCommandResponse(GenerateTransferMessageCommand.isEphemeral, tempRoleToBuy));
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