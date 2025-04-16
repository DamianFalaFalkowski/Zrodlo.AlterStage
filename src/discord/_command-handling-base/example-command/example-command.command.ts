import { ChatInputCommandInteraction } from "discord.js";
import { ExampleResponse } from "./example-command.response";
import { BaseCommand } from "../base.command";
import { ICommandDefinition } from "../base.definition.interface";

export class ExampleCommand extends BaseCommand<ExampleResponse> {
    public readonly ExampleName: string;
    public readonly ExampleWithOptions: string;

    /** Konstruktor polecenia. Pobiera wartości z przekazanych pól i waliduje je */
    constructor(interaction: any, definition: ICommandDefinition) {
        super(interaction, new ExampleResponse(definition.isEphemeral), definition);
        this.ExampleName = interaction.options.getString('example-name', true);
        this.ExampleWithOptions = interaction.options.getString('example-with-options', true);

        this.CheckAuthorisationAndValidityBase();
    }

    /** Metoda do zawarcia dodatkowych sprawdzeń autoryzacji i walidacji. Jest uruchamiana po metodzie CheckAuthorisationAndValidityBase() */
    protected CheckAuthorisationAndValidity(): boolean
    {
        // brak dodatkowych sprawdzen
        return true;
    }
}
module.exports = {
    createCommand(interaction: ChatInputCommandInteraction) : ExampleCommand
    {
        return new ExampleCommand(
            interaction, 
            require(`./${interaction.commandName}.definition`).definition as ICommandDefinition);
    }
}