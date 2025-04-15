import { ChatInputCommandInteraction } from "discord.js";
import { __logger } from "../../../../utils/dc-logger.util";
import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { ExampleResponse } from "./example.response";

export class ExampleCommand extends BaseCommand<ExampleResponse> {
    protected CheckAuthorisationAndValidity(): boolean
    {
        // brak dodatkowych sprawdzen
        return true;
    }
    public readonly ExampleField: string;

    constructor(interaction: any, isEphemeral: boolean, definition: any) {
        try{
            super(interaction, new ExampleResponse(isEphemeral), definition);
            this.ExampleField = interaction.options.getString('example', true);

        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}
module.exports = {
    createCommand(interaction: ChatInputCommandInteraction, isEphemeral: boolean) : ExampleCommand
    {
        return new ExampleCommand(interaction, isEphemeral, require('./example.definition'));
    }
}