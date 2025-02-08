import { ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import { BaseCommandResponse } from '../prototype/base-command-response';

export class GenerateTransferMessageResponse extends BaseCommandResponse {

    protected generatedTransferMessage: string | null = null;
    protected roleToBuy: string;

    constructor(isEphemeral: boolean = false, roleToBuy: string) {
        super(isEphemeral);
        this.roleToBuy = roleToBuy;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected ensureReady(markReadyIfReady: boolean = true): boolean {
        //if (super.ensureReady(false)) // TODO: poprawic
        // TODO: sprawdzenie czy zawiera przycisk do kopiowania
        {
            if (markReadyIfReady)
                this.IsReady = true;
            return true;
        }
        return false;
    }

    public prepeareFailureResponse(errorMessage: string) {
        // stuff can be done here
        super.prepeareFailureResponse(errorMessage);
    }

    public TryFinalize(generatedTransferMessage: string) {
        this.generatedTransferMessage = generatedTransferMessage;
        if (this.ensureReady()) {
            this.prepeareSuccessResponse();
        }
        else {
            this.prepeareFailureResponse("Odpowiedź nie spełnia wymogów kompletności!");
        }
    }

    protected prepeareSuccessResponse() {
        this._reply.content = `Aby dokonać zakupu produktu **${this.roleToBuy}** wklej tą wiadomość w tytule przelewu:\n\n **${this.generatedTransferMessage}**`

        // Utwórz przycisk do kopiowania
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(new ButtonBuilder()
                .setCustomId('copy')
                .setLabel('Copy')
                .setStyle(ButtonStyle.Primary));
        this._reply.components = [row];
        super.prepeareSuccessResponse();
    }
}