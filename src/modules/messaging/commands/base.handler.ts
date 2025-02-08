import { BaseCommand } from "./base.command";

import dcLogger from "../../../utils/dc-logger";
import { BaseCommandResponse } from "./base.response";

export class BaseChatInputCommandHandler<C extends BaseCommand<BaseCommandResponse>> {

    protected command: C;

    constructor(command: C) {
        this.command= command;
    }

    public baseHandle = async () => {
        try {
            dcLogger.logCommand(this.command.Interaction);
            await this.handle();
            await this.command.Interaction.reply(dcLogger.logReplyAndReturn(this.command.Interaction, this.command.Response.Reply));
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    protected async handle() {
        throw new Error('Method not implemented.');
    }
}