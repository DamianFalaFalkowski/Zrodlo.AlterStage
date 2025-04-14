import { APIRole, InteractionReplyOptions, Role } from "discord.js";
import { BaseCommandResponse } from "../../../../discord/_command-handling-base/base.response";
import { __logger } from "../../../../utils/dc-logger.util";

export class CreateOfferRentItemResponse extends BaseCommandResponse {
    
    constructor(isEphemeral: boolean) {
            super(isEphemeral);
        }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid(): boolean {
        try { // TODO: sprawdezanie czy rola zostala dostarczona
            return true;
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse(reply: InteractionReplyOptions): InteractionReplyOptions {
        try {
            // stuff can be done here
            return reply;
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }

    public override PrepeareSuccessResponse(reply: InteractionReplyOptions): InteractionReplyOptions {
        reply.content = `TODO`;
        return reply;
    }
}