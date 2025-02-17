import { ApplicationCommandType, ApplicationIntegrationType, ChatInputCommandInteraction, InteractionContextType, SlashCommandBuilder, Integration } from 'discord.js';
import { TagCreateHandler } from './tag-create.handler';
import { TagCreateCommand } from './tag-create.command';
import { BaseCommandHandler } from '../../_base/commands/base.handler';
import { BaseCommandResponse } from "../../_base/commands/base.response";
import { BaseCommand } from "../../_base/commands/base.command";
import { TagCreateResponse } from "./tag-create.response";
import dcLoggerUtil, { DcLogger } from '../../../utils/dc-logger.util';
import { prototype } from 'events';

const commandName: string = 'tag-create';
const commandDescription: string = 'Adds a new tag to the database';

module.exports = {
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
                .setDescription('The meaning of the tag or additional notes.')),
    async execute(interaction: ChatInputCommandInteraction) {
        new TagCreateHandler(new TagCreateCommand(interaction)).baseHandle();
    }
};