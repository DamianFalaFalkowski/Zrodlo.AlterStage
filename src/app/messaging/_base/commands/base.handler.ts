import { BaseCommand } from "./base.command";
import dcLogger from "../../../utils/dc-logger.util";
import { BaseCommandResponse } from "./base.response";
import { MessageFlags } from 'discord.js';

export class BaseCommandHandler<C extends BaseCommand<BaseCommandResponse>> {

    protected command: C;

    constructor(command: C) {
        this.command= command;
    }

    public baseHandle = async () => {
        try {
            dcLogger.logInfo(`Interaction '${this.command.Interaction.commandName}' execution started!\n`);
            dcLogger.logCommand(this.command.Interaction);
            await this.handle();
            let rpl = this.command.Response.Reply;
            dcLogger.logInfo(`Reply content: ${JSON.stringify({ content: rpl.content, components: rpl.components, flags: rpl.flags })}`)
            await this.command.Interaction.reply({ content: rpl.content, components: rpl.components, flags: rpl.flags });
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    protected async handle() {
        throw new Error('Method not implemented.');
    }
}