import { InteractionReplyOptions } from "discord.js";
import { BaseCommandResponse } from "../../../../discord/_command-handling-base/base.response";
import { __logger } from "../../../../utils/dc-logger.util";

export class ExampleResponse extends BaseCommandResponse {

    constructor(isEphemeral: boolean) {
        super(isEphemeral);
    }

    public AssignResponseData()
        : void
    {
        // Assignowanie danych odpowiedzi
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid()
        : boolean 
    {
        try { 

            // Sprawdzenie poprawności danych

            return true;
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse(reply: InteractionReplyOptions)
        : InteractionReplyOptions 
    {
        try {
            reply.content = `example failure.`;
        } catch (error) {
            __logger.logError(error as Error);
        }
        return reply;
    }

    public override PrepeareSuccessResponse(reply: InteractionReplyOptions)
        : InteractionReplyOptions 
    {
        reply.content = `example success`;
        return reply;
    }
}