import __optModule from './.app/app.modules/ops.module/app-module.ops';
import TerminalInputService from './terminal-input.service(TODO_redesign)';

async function main() {
    try {
        let userParamInput = process.argv.slice(2);
            await TerminalInputService.ReadInputAndStartOperation(userParamInput);
    } catch (error) {
        console.error("Error in main function response:", error);
    }
}
main();