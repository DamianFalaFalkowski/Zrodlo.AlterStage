import { ChatInputCommandInteraction, 
    SlashCommandBuilder } from 'discord.js';
import dcLogger from '../../utils/dc-logger';
import { ReloadCommandCommand } from './reload-command.command';
import { ReloadCommandHandler } from './reload-command.handler';


// https://discord.com/developers/docs/interactions/application-commands#contexts
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload-command')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('The command to reload.')
            .setRequired(true))
        ,
    async execute(interaction: ChatInputCommandInteraction)
    {
        dcLogger.logToFile(`Interaction '${interaction.commandName}' execution started!`);
        let command = new ReloadCommandCommand(interaction);
        let handler = new ReloadCommandHandler(command);
        await handler.baseHandle();
    } 
};