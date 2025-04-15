import { __logger } from "../../../utils/dc-logger.util";
import { ExampleCommand } from "./example.command";


module.exports = {
    handle(interaction: any, command: ExampleCommand) {
        try {
            // implementation of example

            command.Response.PrepeareSuccessResponseBase('example');
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}