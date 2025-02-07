import { InteractionReplyOptions, MessageFlags, BitFieldResolvable } from "discord.js";

export class BaseCommandResponse {

    public IsReady: boolean = false;
    public IsFailure: boolean = false;
    protected _reply: InteractionReplyOptions = {};
    protected readonly isEphemeral: boolean;

    public get Reply(): InteractionReplyOptions {
        return this._reply;
    }
    public set Reply(value: InteractionReplyOptions) {
        if (this.IsReady || this.IsFailure) throw new Error('Response is already ready and you cant change anything.');
        this._reply = value;
    }

    constructor(isEphemeral: boolean = false) {
        this._reply = {};
        this.isEphemeral = isEphemeral;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny na poziomie bazowym
    protected ensureReady(markReadyIfReady :boolean = true): boolean {
        if(this._reply.content !== undefined 
            && this._reply.flags !== undefined
            && this._reply.flags !== null
            && this._reply.content !== null 
            && (typeof this._reply.content !== 'string' 
                || (typeof this._reply.content === 'string' 
                    && this._reply.content.length > 0)
                )
            ) {
            if(markReadyIfReady)
                this.IsReady = true;
            return true;
        }
        return false;
    }

    protected prepeareSuccessResponse()
    {
        this._reply.flags = this.isEphemeral ? MessageFlags.Ephemeral : undefined;
        this.IsReady = true;
    }

    public prepeareFailureResponse(errorMessage: string) {
        this._reply.content = errorMessage;
        this._reply.flags = MessageFlags.Ephemeral;
        this.IsFailure = true;
    }
}