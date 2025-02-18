import dcLogger from '../../../utils/dc-logger.util';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';
import { GenerateTransferMessageResponse } from './gen-transfer-msg.response';

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie

/**  */
module.exports = {
    _baseHandler: require('./../c_command-handling-base/base.handler'),

    async handle(interaction: any, command: GenerateTransferMessageCommand, response: GenerateTransferMessageResponse) {
        try {
            // wywołanie metody bazowej
            await this._baseHandler.handle(interaction);

            // Sprawdzenie czy przekazana rola istnieje w systemie ...
            if (command.AllGuildRoles!.find(role => role.name === command.RoleToBuy.name) === undefined) {
                response.PepeareFailureResponseBase('Rola którą próbujesz zakupić nie istnieje w systemie.');
                return;
            }

            // ... i czy jest rolą ozanczoną jako do kupienia
            if (command.RoleToBuy.name!.charAt(0) !== '+') {
                response.PepeareFailureResponseBase('Rola którą próbujesz zakupić nie jest przeznaczona do kupienia.');
                return;
            }

            // rozpoczęcie generowania wiadomości
            let itemName = command.RoleToBuy!;
            let globalName = interaction.user.globalName!;
            let userId = interaction.user.id;
            let generatedTransferMessage = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();

            // Sprawdzenie czy generatedTransferMessage zawiera tylko dozwolone znaki
            const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(generatedTransferMessage);
            if (!ValidRespMess) {
                // Jeśli tak to zastąp niedozwolone znaki podkreślnikiem
                generatedTransferMessage = generatedTransferMessage.replace(/[^a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+/g, '_');
            }

            // Sprawdzenie czy generatedTransferMessage nie jest dłuższa niż 140 znaków
            if (generatedTransferMessage.length > 140) {
                // Jeśli tak to skróć generatedTransferMessage do 140 znaków
                generatedTransferMessage = generatedTransferMessage.substring(0, 140);
            }
            response.PrepeareSuccessResponseBase(generatedTransferMessage);
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}