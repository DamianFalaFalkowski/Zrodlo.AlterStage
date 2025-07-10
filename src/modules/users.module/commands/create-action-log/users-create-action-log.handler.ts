import { __logger } from "../../../../utils/dc-logger.util";
import { ExampleCommand } from "./users-create-action-log.command";

/** Metoda obsługująca polecenie */
module.exports = {
    async handle(interaction: any, command: ExampleCommand): Promise<void>
    {

        // Handling the command

        command.Response.AssignResponseData();
        command.Response.PrepeareSuccessResponseBase();
    }
};