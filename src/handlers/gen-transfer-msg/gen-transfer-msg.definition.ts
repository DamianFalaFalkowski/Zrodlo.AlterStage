import { ActivityType, ApplicationCommandOptionType, ApplicationCommandType, ChannelType, Events, 
    SlashCommandBuilder, SlashCommandRoleOption } from 'discord.js';
import { GenerateTransferMessageHandler } from './gen-transfer-msg.handler';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';
import { GenerateTransferMessageResponse } from './gen-transfer-msg.response';

module.exports = {
    name: 'gen-transfer-msg',
   type: ChannelType.GuildText,
    internalId: 'generate-payment-transfer-message_chat-input',
    isEphemeral: true,
    allowedRoles: ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'],
    data: new SlashCommandBuilder()
    .setName('generate-transfer-msg')
    .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
    .addRoleOption(option =>
        option.setName('role-to-buy')
            .setDescription('The role to buy.')
            .setRequired(true)),
    async execute(interaction: any)
    {
        let command = new GenerateTransferMessageCommand(interaction);
        let handler = new GenerateTransferMessageHandler(command);
        await handler.baseHandle();
    } 
};

// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu