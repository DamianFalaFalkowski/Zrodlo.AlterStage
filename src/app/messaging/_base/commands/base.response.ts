import { BitFieldResolvable, InteractionReplyOptions, MessageFlags } from "discord.js";
import { BaseCommand } from "./base.command";
import { NotImplementedError } from "../../../Errors/not-implemented-error";

export class BaseCommandResponse { // TODO: add components {
    
    public IsReady: boolean = false;
    public IsFailure: boolean = false;
    public Command: BaseCommand<BaseCommandResponse> | undefined;

    protected _reply: InteractionReplyOptions | undefined;
    protected readonly isEphemeral: boolean;

    public get Reply(): InteractionReplyOptions {
        if(!this.ensureReadyBase()) throw Error("Odpoweidź nie jest gotowa do wysyłki.");
        return this._reply!;
    }

    constructor(command: BaseCommand<BaseCommandResponse>) {
        this.Command = command;
        this._reply = { content: "", flags: MessageFlags.Ephemeral };
        this.isEphemeral = command.IsEphemeral!;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny na poziomie bazowym
    protected ensureReadyBase(): boolean {
        try {
            if(!this.IsReady ||
                this._reply!.content === undefined  ||
               (this.isEphemeral && this._reply!.flags !== MessageFlags.Ephemeral))
                return false;
            return this.ensureReady();;         
        } catch (error) {
            throw error;
        }
    }

    public PrepeareSuccessResponseBase(
        content :string, 
        components: any[] | null = null, 
        flags: BitFieldResolvable<"SuppressEmbeds" | "Ephemeral" | "SuppressNotifications", MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.SuppressNotifications> | null = null)
    {
        try{
            this._reply = { 
                content: content,
                components: components!,
                flags: flags!
            }
            this._reply.flags = this.isEphemeral ? MessageFlags.Ephemeral : this._reply.flags;       
            this.IsReady = true;
            this.PrepeareSuccessResponse();
        }catch(error){
            throw error;
        }      
    }

    public PepeareFailureResponseBase(errorMessage: string) {
        try {
            this._reply!.content = errorMessage;
            this._reply!.flags = MessageFlags.Ephemeral;
            this.IsFailure = true;
            this.IsReady = true;
            this.PepeareFailureResponse();
        } catch (error) {
            throw error;
        }
    }

    public PepeareFailureResponse() {
        throw new NotImplementedError();
    }

    protected ensureReady(): boolean {
        throw new NotImplementedError();
    }

    public PrepeareSuccessResponse(){
        throw new NotImplementedError();
    }
}