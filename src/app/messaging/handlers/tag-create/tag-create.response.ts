import { InteractionReplyOptions } from "discord.js";



export class TagCreateResponse extends BaseCommandResponse {

    constructor(command :TagCreateCommand) {
        super(command); this._reply = { content: "", flags: MessageFlags.Ephemeral };
    }
    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected ensureReady(): boolean {
        // additional logic here
        return true;
    }

    // przygotowanie wiadomosci o błędzie
    public PepeareFailureResponse(): InteractionReplyOptions
    {
        // additional logic here
    }

    // przygotowanie wiadomości sukcesu
    public PrepeareSuccessResponse(): InteractionReplyOptions
    {
        // additional logic here
    }
}