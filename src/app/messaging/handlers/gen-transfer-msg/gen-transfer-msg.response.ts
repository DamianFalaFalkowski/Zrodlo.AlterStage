import { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionReplyOptions } from 'discord.js';
import { BaseCommandResponse } from '../../_base/commands/base.response';
import dcLogger from '../../../utils/dc-logger.util';


export class GenerateTransferMessageResponse extends BaseCommandResponse {

    protected roleToBuy: string;

    constructor(isEphemeral: boolean = false, roleToBuy: string) {
        super(isEphemeral);
        this.roleToBuy = roleToBuy;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected ensureReady(): boolean {
        try {
            if (super.ensureReady())
                return true;           
            return false;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public PepeareFailureResponse(errorMessage: string) {
        try {
            // stuff can be done here
            super.PepeareFailureResponse(errorMessage);
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public PrepeareSuccessResponse(replyContent:string) {
        let content = `Aby dokonać zakupu produktu ${this.roleToBuy} wklej tą wiadomość w tytule przelewu:\n\n **${replyContent}**\n\n.`;

        // Utwórz przycisk do kopiowania
        // const row = new ActionRowBuilder<ButtonBuilder>()
        //     .addComponents(new ButtonBuilder()
        //         .setCustomId('copy')
        //         .setLabel('Copy')
        //         .setStyle(ButtonStyle.Primary));
        // const components = [row];
        super.PrepeareSuccessResponse(content);
    }
}