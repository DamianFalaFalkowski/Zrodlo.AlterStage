import { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionReplyOptions } from 'discord.js';
import { BaseCommandResponse } from '../../_base/commands/base.response';
import dcLogger from '../../../utils/dc-logger.util';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';


export class GenerateTransferMessageResponse extends BaseCommandResponse {
    constructor(command :GenerateTransferMessageCommand) {
            super(command);
        }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override ensureReady(): boolean {
        try {
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse() {
        try {
            // stuff can be done here
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PrepeareSuccessResponse() {
        let content = `Aby dokonać zakupu produktu ${(this.Command as GenerateTransferMessageCommand)!.RoleToBuyName} wklej tą wiadomość w tytule przelewu:\n\n **${this.Reply.content}**\n\n.`;
    }
}