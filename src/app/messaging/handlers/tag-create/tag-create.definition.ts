import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';
import { baseHandlerExecute } from '../_command-handling-base/base.handler';

/**  */
const commandName: string = 'tag-create';
const commandDescription: string = 'Adds a new tag to the database';

export class GenerateTransferMessageDefinition {
    public static __commandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: true,
        allowedRoles: ['member', 'admin', 'moderator', 'owner', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription(commandDescription)
            .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
            .setContexts(InteractionContextType.Guild)

            .addUserOption(option =>
                option.setName('user-id')
                    .setDescription('User id to add tag')
                    .setRequired(true))

            .addStringOption(option =>
                option.setName('name')
                    .setDescription('Name of the tag')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('description')
                    .setDescription('The meaning of the tag or additional notes.'))
        ,
        async execute(interaction: any) {
            await baseHandlerExecute(
                interaction,
                require('./${commandName}.command'),
                require('./${commandName}.response')
            )
        }
    };
}