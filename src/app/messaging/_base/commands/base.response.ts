import { BitFieldResolvable, InteractionReplyOptions, MessageFlags } from "discord.js";
import dcLogger from "../../../utils/dc-logger.util";

export class BaseCommandResponse { // TODO: add components {
    
    public IsReady: boolean = false;
    public IsFailure: boolean = false;

    protected _reply: InteractionReplyOptions;
    protected readonly isEphemeral: boolean;

    public get Reply(): InteractionReplyOptions {
        if(!this.ensureReady()) throw Error("Odpoweidź nie jest gotowa do wysyłki.");
        return this._reply;
    }

    constructor(isEphemeral: boolean = false) {
        this._reply = {};
        this.isEphemeral = isEphemeral;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny na poziomie bazowym
    protected ensureReady(): boolean {
        try {
            if(!this.IsReady ||
                this._reply.content === undefined  ||
               (this.isEphemeral && this._reply.flags !== MessageFlags.Ephemeral))
                return false;
            return true;
        } catch (error) {
            throw error;
        }
    }

    public PrepeareSuccessResponse(
        content :string, 
        components: any[] | null = null, 
        flags: BitFieldResolvable<"SuppressEmbeds" | "Ephemeral" | "SuppressNotifications", MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.SuppressNotifications> | null = null)
    {
        this._reply = { 
            content: content,
            components: components!,
            flags: flags!
        }
        this._reply.flags = this.isEphemeral ? MessageFlags.Ephemeral : this._reply.flags;       
        this.IsReady = true;
    }

    public PepeareFailureResponse(errorMessage: string) {
        try {
            this._reply.content = errorMessage;
            this._reply.flags = MessageFlags.Ephemeral;
            this.IsFailure = true;
            this.IsReady = true;
        } catch (error) {
            throw error;
        }
    }
}