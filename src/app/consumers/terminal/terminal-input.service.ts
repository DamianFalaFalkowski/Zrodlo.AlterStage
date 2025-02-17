import { __sleep } from '../../utils/sleep.util';
import dcLogger from '../../utils/dc-logger.util.js';
import AlterStageAppStartup from '../../../startup';
import OperationsModule from './../../../modules/ops/process-ops.module'

class TerminalInputService{
    public async ReadInputAndStartOperation(splittedUserInput: string[]): Promise<void> {
        if (splittedUserInput[0] == 'stop')
            dcLogger.logInfo("exiting the opt mode...")
        let foreachIterationsLeft = splittedUserInput.length;
        // Wyświetl informację o odczytanych parametrach
        if (splittedUserInput.length > 0) {
            dcLogger.logInfo('Arguments:', splittedUserInput); 
            splittedUserInput.forEach(await (async (arg) => {
                let argPair = arg.split('=', 2); // TODO: przeniesc to do env           
                if (argPair.length < 2 )    // no parameters
                { 
                    let valueLessParam = argPair[0];
                    await OperationsModule.OperationsRouter.Push(valueLessParam);
                } 
                else if (!argPair[1].includes('--')){   // single param
                    let value = argPair.reverse().pop() as string;
                    let param = argPair.pop() as string;
                    await OperationsModule.OperationsRouter.Push(value, param);
                }
                else {      // multiple params
                    let value = argPair.reverse().pop() as string;
                    let params = argPair.pop()!.split('--', 20); // TODO: dorzucic do configa i opisać zasady dot polecen
                    await OperationsModule.OperationsRouter.Push(value, ...params);
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
                        this.ReadInputAndStartOperation(name.split(' '));
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

    private async hostApp() {
        await AlterStageAppStartup.ClientLogin();
    }
}
export default new TerminalInputService();