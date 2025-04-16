import { InteractionReplyOptions } from "discord.js";
import { BaseCommandResponse } from "../../../../discord/_command-handling-base/base.response";
import { __logger } from "../../../../utils/dc-logger.util";
import { Identifier } from "sequelize";

export class CreateRentItemResponse extends BaseCommandResponse {

    private createdRentItemId?: Identifier;
    constructor(isEphemeral: boolean) {
        super(isEphemeral);
    }

    public AssignResponseData(createdRentItemId: Identifier)
        : void
    {
        this.createdRentItemId = createdRentItemId;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid()
        : boolean 
    {
        try { 
            if(!(this.createdRentItemId as number) || 
                this.createdRentItemId as number <= 0)
                return false;
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
            reply.content += `Nie udało się dodać elementu najmu. \nSpróbuj ponownie później lub skontaktuj się z administratorem.`;
        } catch (error) {
            __logger.logError(error as Error);
        }
        return reply;
    }

    public override PrepeareSuccessResponse(reply: InteractionReplyOptions)
        : InteractionReplyOptions 
    {
        reply.content = `Emement najmu został dodany. \nId elementu: ${this.createdRentItemId}`;
        return reply;
    }
}