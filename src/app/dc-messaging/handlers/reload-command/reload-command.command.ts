import { ChatInputCommandInteraction } from "discord.js";
import { ReloadCommandResponse } from "./reload-command.response";
import { BaseCommand } from "../../_base/commands/base.command";
import dcLogger from "../../../utils/dc-logger";

export class ReloadCommandCommand extends BaseCommand<ReloadCommandResponse> {
    public readonly CommandName: string | undefined;

    constructor(interaction: ChatInputCommandInteraction) {
        try {
            let definition = module.require(`./${interaction.commandName}.definition`);
            let commandName = interaction.options.getString('command', true).toLowerCase();
            console.log('Option found definition: ' + commandName);
            super(
                interaction, 
                definition.allowedRoles!, 
                new ReloadCommandResponse(
                    definition.isEphemeral, 
                    commandName))
            this.CommandName = commandName;
            this.CheckAuthorisation(); 
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzenie czy command moze byc wykonany
    public CheckAuthorisation(): boolean {
        try {
            if (this.CommandName === undefined || this.CommandName === null || this.CommandName.length === 0) {
                this.IsSucess = false;
                this.Response.prepeareFailureResponse('Invalid command. \'command\' parameter is missing.');
                return false;
            }
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}