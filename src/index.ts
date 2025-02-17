import { __sleep } from './app/utils/sleep.util.js';
import TerminalInputService from './app/consumers/terminal/terminal-input.service.js';

async function main() {
    try {
        // Odczytywanie argumentów wiersza poleceń
        // ADN: Pomijamy pierwsze dwa elementy, ponieważ są to ścieżki do node i skryptu
        let userParamInput = process.argv.slice(2);
        await TerminalInputService.ReadInputAndStartOperation(userParamInput);
    } catch (error) {
        console.error("Error in main function response:", error);
    }
}
main();