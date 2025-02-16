import { DcCommandsAdministrationOptsConsumer } from './app/consumers/terminal/dc-commands-administration.consumer.js'
import dcLogger from './app/utils/dc-logger.util.js';
import { __sleep } from './app/utils/sleep.util.js';
import AlterStageAppStartup from './startup';

async function main() {
    try {
        // Odczytywanie argumentów wiersza poleceń
        // ADN: Pomijamy pierwsze dwa elementy, ponieważ są to ścieżki do node i skryptu
        let userParamInput = process.argv.slice(2);
        await readInputAndStartOperation(userParamInput);
    } catch (error) {
        console.error("Error in main function response:", error);
    }
}
main();

async function readInputAndStartOperation(splittedUserInput: string[]): Promise<void> {
    if (splittedUserInput[0] == 'stop')
        dcLogger.logInfo("exiting the opt mode...")

    let foreachIterationsLeft = splittedUserInput.length;
    // Wyświetl informację o odczytanych parametrach
    if (splittedUserInput.length > 0) {
        dcLogger.logInfo('Arguments:', splittedUserInput);


        splittedUserInput.forEach(await (async (arg) => {
            let argPair = arg.split('=', 2);
            if (argPair.length < 2) // value-less
            {
                let valueLessParam = argPair[0];
                switch (valueLessParam) {
                    case "-hostapp":
                        try {
                            await hostApp();
                        }
                        catch { hostApp(); }
                        break;
                    default:
                        dcLogger.logInfo(`Parametr ${valueLessParam} nie został rozpoznany`);
                        break;
                }
            }
            else {
                let value = argPair.pop() as string;
                let param = argPair.pop() as string;
                switch (param) {
                    case "-registercommand":
                        await DcCommandsAdministrationOptsConsumer.RegisterCommand(value);
                        break;
                    default:
                        dcLogger.logInfo(`Parametr ${param} nie został rozpoznany`);
                        break;
                };
            }
            foreachIterationsLeft--;
            if (foreachIterationsLeft === 0) {
                const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                readline.question('Type next operation name and value or \'stop\' to exit.\n You have 20 min for entering next command.\n\n>', (name: string) => {
                    if (name === 'stop')
                        process.exit();
                    readInputAndStartOperation(name.split(' '));
                });
                await __sleep(20 * 60 * 1000);
                //         min * sec * m.sec
                dcLogger.logInfo('time left.');
            }
        }), foreachIterationsLeft);
    }
    else {
        dcLogger.logStringError('No arguments provided.');
    }
    if (foreachIterationsLeft <= 0)
        process.exit();
}



async function hostApp() {
    await AlterStageAppStartup.ClientLogin();
}