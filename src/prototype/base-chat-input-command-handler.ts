import { BaseCommand } from "./base-command";
import { BaseCommandResponse } from "./base-command-response";
import dcLogger from "../utils/dc-logger";

export class BaseChatInputCommandHandler<C extends BaseCommand<BaseCommandResponse>> {

    protected command: C;

    constructor(command: C) {
        this.command= command;
    }

    public baseHandle = async () => {
        dcLogger.logCommand(this.command.Interaction);
        //
        this.handle();
        //
        // Odeślij odpowiedź
        await this.command.Interaction.reply(dcLogger.logReplyAndReturn(this.command.Interaction, this.command.Response.Reply));
    }


    protected async handle() {
        throw new Error('Method not implemented.');
    }
}