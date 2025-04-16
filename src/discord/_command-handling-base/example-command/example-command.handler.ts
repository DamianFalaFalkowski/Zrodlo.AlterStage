import { ExampleCommand } from "./example-command.command";

/** Metoda obsługująca polecenie */
module.exports = {
    async handle(interaction: any, command: ExampleCommand): Promise<void> {

        // Handling the command

        command.Response.AssignResponseData()
        command.Response.PrepeareSuccessResponseBase();
    }
}