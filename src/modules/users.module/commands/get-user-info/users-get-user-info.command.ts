import { ChatInputCommandInteraction } from "discord.js";
import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { __logger } from "../../../../utils/dc-logger.util";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { GetUserInfoResponse } from "./users-get-user-info.response";

export class GetUserInfoCommand extends BaseCommand<GetUserInfoResponse>
{
    public readonly UserIdentifier: string;

    /** Konstruktor polecenia. Pobiera wartości z przekazanych pól i waliduje je */
    constructor(interaction: any, definition: ICommandDefinition)
    {
        super(interaction, new GetUserInfoResponse(definition.isEphemeral), definition);
        this.UserIdentifier = interaction.options.getString('user-identifier', true);

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
    createCommand(interaction: ChatInputCommandInteraction): GetUserInfoCommand
    {
        return new GetUserInfoCommand(
            interaction,
            require(`./${interaction.commandName}.definition`).definition as ICommandDefinition);
    }
};