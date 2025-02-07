import { ChatInputCommandInteraction, GatewayIntentBits, GuildMemberRoleManager, InteractionReplyOptions, MessageFlags, SlashCommandBuilder } from "discord.js";
import dcLogger from "../utils/dc-logger";
import { TagsRepository } from "../model/tags.model";

const allowedRoles = ['admin', 'moderator', 'owner', 'super-moderator'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db-tags-add')
        .setDescription('Adds a new tag to the database')
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
        await execute(interaction)
    }
};

export const execute = async (interaction: ChatInputCommandInteraction) => {
    dcLogger.logCommand(interaction);
    let reply: InteractionReplyOptions = { content: undefined, flags: MessageFlags.Ephemeral };

    if (!interaction.isCommand()) return;

    // Sprawdzenie czy uzytkownik na uprawnienia do uruchomienia polecenia
    const member = interaction.member;
    if (!member || !('roles' in member)) {
        reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
        return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    }
    const roles = (member.roles as GuildMemberRoleManager).cache;
    if (!roles.some(role => allowedRoles.includes(role.name))) {
        reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
        return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    }

    const { commandName } = interaction;

    if (commandName === 'db-tags-add') {
        const tagName = interaction.options.getString('name');
        const userId = interaction.options.getUser('user-id')?.id;
        const tagDescription = interaction.options.getString('description');

        try {
            if ((await TagsRepository.findAll({
                where: {
                    name: tagName,
                    userId: userId
                }
            })).length > 0) {
                let err = new Error(`Tag with name: ${tagName} and userId: ${userId} already exists.`);
                err.name = "SequelizeUniqueConstraintError";
                throw err;
            }

            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            let tag: TagsRepository = await TagsRepository.create({
                name: tagName,
                description: tagDescription,
                userId: userId,
                createdUserId: interaction.user.id
            });

            return interaction.reply(`Tag ${tag.name} added.`);
        }
        catch (error: Error | any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                reply.content = error.message === null ? 'That tag already exists.': error.message;
            }
            reply.content = error.message === null ? 'Something went wrong with adding a tag.': error.message;
        }
    }
    else
        reply.content = `Nierozpoznana nazwa polecenia: ${commandName}`;

    // Odeślij odpowiedź
    await interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
}