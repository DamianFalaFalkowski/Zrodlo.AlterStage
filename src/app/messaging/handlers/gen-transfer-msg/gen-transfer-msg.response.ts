import dcLogger from '../../../utils/dc-logger.util';
import { BaseCommandResponse } from '../_command-handling-base/base.response';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';
export class GenerateTransferMessageResponse extends BaseCommandResponse {
    
    constructor(command :GenerateTransferMessageCommand) {
            super(command);
        }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid(): boolean {
        try {
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse() {
        try {
            // stuff can be done here
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public override PrepeareSuccessResponse() {
        let content = `Aby dokonać zakupu produktu ${(this.Command as GenerateTransferMessageCommand)!.RoleToBuyName} wklej tą wiadomość w tytule przelewu:\n\n **${this.Reply.content}**\n\n.`;
    }
}