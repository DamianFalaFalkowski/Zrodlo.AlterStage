import { ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import { BaseCommandResponse } from '../../modules/messaging/commands/base.response';
import dcLogger from "../../utils/dc-logger";

export class ReloadCommandResponse extends BaseCommandResponse {

    protected commandOpt: string;

    constructor(isEphemeral: boolean = false, command: string) {
        super(isEphemeral);
        this.commandOpt = command;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected ensureReady(markReadyIfReady: boolean = true): boolean {
        try {
            if (super.ensureReady(false)) 
            {
                if (markReadyIfReady)
                    this.IsReady = true;
                return true;
            }
            return false;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public prepeareFailureResponse(errorMessage: string) {
        try {
            // stuff can be done here
            super.prepeareFailureResponse(errorMessage);
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public TryFinalize(command: string) {
        try {
            this.commandOpt = command;
            if (this.ensureReady()) {
                this.prepeareSuccessResponse();
            }
            else {
                this.prepeareFailureResponse("Odpowiedź nie spełnia wymogów kompletności!");
            }
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    protected prepeareSuccessResponse() {
        this._reply.content = ``;
    }
}