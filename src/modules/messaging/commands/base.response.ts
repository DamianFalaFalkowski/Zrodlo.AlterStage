import { InteractionReplyOptions, MessageFlags } from "discord.js";
import dcLogger from "../../../utils/dc-logger";

export class BaseCommandResponse { // TODO: add components {
    
    public IsReady: boolean = false;
    public IsFailure: boolean = false;


    protected _reply: InteractionReplyOptions = {};
    protected readonly isEphemeral: boolean;

    public get Reply(): InteractionReplyOptions {
        try {
            if(!this.IsReady)
                this.prepeareFailureResponse('Response is not ready yet.');
            return this._reply;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
    public set Reply(value: InteractionReplyOptions) {
        try {
            if (this.IsReady || this.IsFailure) throw new Error('Response is already ready and you cant change anything.');
            this._reply = value;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    constructor(isEphemeral: boolean = false) {
        this._reply = {};
        this.isEphemeral = isEphemeral;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny na poziomie bazowym
    protected ensureReady(markReadyIfReady :boolean = true): boolean {
        try {
            if(this._reply.content !== undefined 
                && this.isEphemeral 
                && this._reply.flags != null 
                && this._reply.flags.toString().toLocaleLowerCase().includes("Ephemeral".toLocaleLowerCase())
                && this._reply.content !== null) 
            {
                if(markReadyIfReady)
                    this.IsReady = true;
                return true;
            }
            return false;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    protected prepeareSuccessResponse()
    {
        this._reply.flags = this.isEphemeral ? MessageFlags.Ephemeral : undefined;
        this.IsReady = true;
    }

    public prepeareFailureResponse(errorMessage: string) {
        try {
            this._reply.content = errorMessage;
            this._reply.flags = MessageFlags.Ephemeral;
            this.IsFailure = true;
            this.IsReady = true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}