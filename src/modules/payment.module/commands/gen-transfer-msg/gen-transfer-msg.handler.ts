import { Role } from 'discord.js';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';
import { __logger } from '../../../../utils/dc-logger.util';

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie

/**  */
module.exports = {
    async handle(interaction: any, command: GenerateTransferMessageCommand) : Promise<void> {
        try {
            // Sprawdzenie czy przekazana rola istnieje w systemie ...
            if (command.AllGuildRoles!.find((role: Role) => role.name === command.RoleToBuy.name) === undefined) {
                command.Response.PepeareFailureResponseBase('Rola którą próbujesz zakupić nie istnieje w systemie.');
                return;
            }

            // ... i czy jest rolą ozanczoną jako do kupienia
            if (command.RoleToBuy.name!.charAt(0) !== '+') {
                command.Response.PepeareFailureResponseBase('Rola którą próbujesz zakupić nie jest przeznaczona do kupienia.');
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
            command.Response.PrepeareSuccessResponseBase(generatedTransferMessage);
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}