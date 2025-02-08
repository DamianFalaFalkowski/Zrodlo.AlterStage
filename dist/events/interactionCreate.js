"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        console.info(`InteractionCreate event fired. CommandName: ${interaction.commandName}`);
        if (!interaction.isChatInputCommand())
            return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        console.info(`Command ${command.name} found for ${interaction.commandName} interaction.`);
        try {
            switch (interaction.commandType) {
                case discord_js_1.ApplicationCommandType.ChatInput:
                    await command.execute(interaction);
                    break;
                case discord_js_1.ApplicationCommandType.Message:
                    await command.execute(interaction);
                    break;
                case discord_js_1.ApplicationCommandType.PrimaryEntryPoint:
                    await command.execute(interaction);
                    break;
                case discord_js_1.ApplicationCommandType.User:
                    await command.execute(interaction);
                    break;
                default:
                    throw new Error(`Unsupported interaction type: ${typeof interaction}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`An error of type ${error.name} occured.\n ${error.message}`);
            }
            else {
                console.error('An unknown error occurred.');
            }
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', flags: discord_js_1.MessageFlags.Ephemeral });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command!', flags: discord_js_1.MessageFlags.Ephemeral });
            }
        }
    },
};
