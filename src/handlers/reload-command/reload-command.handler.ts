
import { BaseCommandHandler } from "../../modules/messaging/commands/base.handler";
import dcLogger from "../../utils/dc-logger";
import { ReloadCommandCommand } from './reload-command.command';
import { Interaction } from 'discord.js';

export class ReloadCommandHandler extends BaseCommandHandler<ReloadCommandCommand>{
    constructor(command: ReloadCommandCommand) {
        super(command);
    }

     override async handle() {
        const commandName = this.command.CommandName;

        delete require.cache[require.resolve(`./${this.command.CommandName}.definition.js`)];
        delete require.cache[require.resolve(`./${this.command.CommandName}.command.js`)];
        delete require.cache[require.resolve(`./${this.command.CommandName}.response.js`)];
        delete require.cache[require.resolve(`./${this.command.CommandName}.handler.js`)];

        try {
            const newCommand = require(`./${this.command.CommandName}.js`);
            this.command.Interaction.client.commands.set(newCommand.data.name, newCommand);
            await this.command.Interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error: any) {
            console.error(error);
            await this.command.Interaction.reply(`There was an error while reloading a command \`${this.command.CommandName}\`:\n\`${error.message}\``);
        }
    }
}