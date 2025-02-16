import { DcCommandsAdministrationOptsConsumer } from './app/consumers/terminal/dc-commands-administration.consumer.js'
import dcLogger from './app/utils/dc-logger.js';


// Odczytywanie argumentów wiersza poleceń
// ADN: Pomijamy pierwsze dwa elementy, ponieważ są to ścieżki do node i skryptu
const args = process.argv.slice(2); 

// Wyświetl informację o odczytanych parametrach
if (args.length === 0) {
    dcLogger.logStringError('No arguments provided.');
} else {
    dcLogger.logInfo('Arguments:', args);
}

/// Odczytywanie konkretnych parametrów:

// -registercommand
const registerDiscordCommandParam = args.find(arg => arg.startsWith('-registercommand'));
if (registerDiscordCommandParam) {
    const value = registerDiscordCommandParam.split('=')[1];
    DcCommandsAdministrationOptsConsumer.RegisterCommand(value);
}