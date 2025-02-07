import { APIInteractionGuildMember, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { BaseCommand } from "./base-command";
import { BaseCommandResponse } from "./base-command-response";

export class BaseChatInputCommandHandler<C extends BaseCommand<R>, R extends BaseCommandResponse> {

    constructor() {
    }

    protected baseHandle = async (command: C) => {
        //
        this.handle(command);
        //
    }


    async handle(command: C) {
 
    }
}