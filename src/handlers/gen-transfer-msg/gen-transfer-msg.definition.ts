import { ChatInputCommandInteraction, 
    SlashCommandBuilder } from 'discord.js';
import { GenerateTransferMessageHandler } from './gen-transfer-msg.handler';
import { GenerateTransferMessageCommand } from './gen-transfer-msg.command';
import dcLogger from '../../utils/dc-logger';


// https://discord.com/developers/docs/interactions/application-commands#contexts
module.exports = {
    name: 'gen-transfer-msg',
    description: 'Generates a transfer message for specific role (role has to begin with \'+\' sign)',
    // type: ApplicationCommandType.ChatInput,
    // interactionType: InteractionType.ApplicationCommandAutocomplete,
    // internalId: 'generate-payment-transfer-message_chat-input',
    // isEphemeral: true,   
    // integrationTypes: ApplicationIntegrationType.GuildInstall,
    // handler: EntryPointCommandHandlerType.AppHandler,
    // allowedRoles: ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'],
    data: new SlashCommandBuilder()
        .setName('gen-transfer-msg') 
        .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
        //.setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel)
        // .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
        // .setContexts( InteractionContextType.Guild)
        .addRoleOption(option =>
            option.setName('role-to-buy')
                .setDescription('The role to buy.')
                .setRequired(true))
        ,
    async execute(interaction: ChatInputCommandInteraction)
    {
        dcLogger.logToFile(`Interaction '${interaction.commandName}' execution started!`);
        let command = new GenerateTransferMessageCommand(interaction);
        let handler = new GenerateTransferMessageHandler(command);
        await handler.baseHandle();
    } 
};

// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu