import { InteractionReplyOptions, MessageFlags } from "discord.js";
import { BaseCommandResponse } from "../_command-handling-base/base.response";

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie

export class TagCreateResponse extends BaseCommandResponse {
    
    constructor(isEphemeral: boolean) {
        super(isEphemeral); this._reply = { content: "", flags: MessageFlags.Ephemeral };
    }
    

    // przygotowanie wiadomosci o błędzie
    public PepeareFailureResponse(reply: InteractionReplyOptions): InteractionReplyOptions
    {
        return reply;
    }

    // przygotowanie wiadomości sukcesu
    public PrepeareSuccessResponse(reply: InteractionReplyOptions): InteractionReplyOptions
    {
        return reply;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected EnsureReadyAndValid(): boolean {
        throw new Error("Method not implemented.");
    }
}