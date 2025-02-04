"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'copy') {
                await interaction.reply({ content: 'Skopiowano wiadomość!', flags: discord_js_1.MessageFlags.Ephemeral });
            }
            return;
        }
        if (!interaction.isChatInputCommand())
            return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.execute(interaction);
            console.log(interaction.commandName + " executed");
        }
        catch (error) {
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
