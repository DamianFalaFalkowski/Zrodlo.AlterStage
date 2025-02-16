import { BaseCommand } from "./base.command";
import dcLogger from "../../../utils/dc-logger";
import { BaseCommandResponse } from "./base.response";
import { MessageFlags } from 'discord.js';

export class BaseCommandHandler<C extends BaseCommand<BaseCommandResponse>> {

    protected command: C;

    constructor(command: C) {
        this.command= command;
    }

    public baseHandle = async () => {
        try {
            dcLogger.logCommand(this.command.Interaction);
            await this.handle();
            await this.command.Interaction.reply({ content: this.command.Response.Reply.content, components: this.command.Response.Reply.components, flags: MessageFlags.Ephemeral });
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    protected async handle() {
        throw new Error('Method not implemented.');
    }
}