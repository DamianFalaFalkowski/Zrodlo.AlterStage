import { BaseChatInputCommandHandler } from '../prototype/base-chat-input-command-handler';
import { GenerateTransferMessageCommand } from './generate-transfer-message.command';

export class GenerateTransferMessageCommandHandler extends BaseChatInputCommandHandler<GenerateTransferMessageCommand>{
    constructor(command: GenerateTransferMessageCommand) {
        super(command);
    }

    protected override async handle() {
        // Sprawdzenie czy przekazana rola istnieje w systemie ...
        if (this.command.AllGuildRoles.find(role => role.name === this.command.RoleToBuyName) === undefined) {
            this.command.Response.prepeareFailureResponse('Rola którą próbujesz zakupić nie istnieje w systemie.');
            return;
        }

        // ... i czy jest rolą ozanczoną jako do kupienia
        if (this.command.RoleToBuyName!.charAt(0) !== '+') {
            this.command.Response.prepeareFailureResponse('Rola którą próbujesz zakupić nie jest przeznaczona do kupienia.');
            return;
        }


        // rozpoczęcie generowania wiadomości
        let itemName = this.command.RoleToBuyName!;
        let globalName = this.command.Interaction.user.globalName!; 
        let userId = this.command.Interaction.user.id;
        let generatedTransferMessage = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();

        // Sprawdzenie czy generatedTransferMessage zawiera tylko dozwolone znaki
        const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(generatedTransferMessage);
        if (!ValidRespMess) {
            // Jeśli tak to zastąp niedozwolone znaki podkreślnikiem
            generatedTransferMessage = generatedTransferMessage.replace(/[^a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+/g, '_');
        }

        // Sprawdzenie czy generatedTransferMessage nie jest dłuższa niż 140 znaków
        if (generatedTransferMessage.length > 140) {
            // JHeśli tak to skróć generatedTransferMessage do 140 znaków
            generatedTransferMessage = generatedTransferMessage.substring(0, 140);
        }
    }
}