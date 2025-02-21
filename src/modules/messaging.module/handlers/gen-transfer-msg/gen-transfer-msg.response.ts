import { APIRole, InteractionReplyOptions, Role } from 'discord.js';
import dcLogger from '../../../../utils/dc-logger.util';
import { BaseCommandResponse } from '../_command-handling-base/base.response';

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie

export class GenerateTransferMessageResponse extends BaseCommandResponse {
    public RoleToBuy: Role | APIRole;
    
    constructor(isEphemeral: boolean, roleToBuy: Role | APIRole) {
            super(isEphemeral);
            this.RoleToBuy = roleToBuy;
        }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid(): boolean {
        try { // TODO: sprawdezanie czy rola zostala dostarczona
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse(reply: InteractionReplyOptions): InteractionReplyOptions {
        try {
            // stuff can be done here
            return reply;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PrepeareSuccessResponse(reply: InteractionReplyOptions): InteractionReplyOptions {
        reply.content = `Aby dokonać zakupu produktu ${this.RoleToBuy} wklej tą wiadomość w tytule przelewu:\n\n **${this.RoleToBuy}**\n\n.`;
        return reply;
    }
}