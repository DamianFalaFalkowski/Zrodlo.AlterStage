import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction, InteractionReplyOptions, GuildMemberRoleManager } from 'discord.js';

const allowedRoles = ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-transfer-msg')
        .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
        .addRoleOption(option =>
            option.setName('role-to-buy')
                .setDescription('The role to buy.')
                .setRequired(true)),
    async execute(interaction: any) {
        await execute(interaction)
    }
};

export const execute = async (interaction: ChatInputCommandInteraction) => {
    let reply: InteractionReplyOptions = { content: undefined, flags: MessageFlags.Ephemeral };

    if (!interaction.isCommand()) return;

    // Sprawdzenie czy uzytkownik na uprawnienia do uruchomienia polecenia
    const member = interaction.member; // TODO: resp mess
    if (!member || !('roles' in member)) return; // TODO: resp mess
    const roles = (member.roles as GuildMemberRoleManager).cache;
    if (!roles.some(role => allowedRoles.includes(role.name))) return; // TODO: resp mess

    // Sprawdzenie czy przekazana rola istnieje w systemie ...
    if (interaction.guild!.roles.cache.find(role => role.name === interaction.options.data[0].role!.name) === undefined) 
        return interaction.reply(reply.content = 'Rola nie istnieje w systemie.');

    // ... i czy jest rolą ozanczoną jako do kupienia
    if(interaction.options.data[0].role!.name.charAt(0) !== '+') 
        return interaction.reply(reply.content = 'Rola nie jest przeznaczona do kupienia.'); 

    // rozpoczęcie generowania wiadomości
    let itemName = interaction.options.data.find((x: any) => x !== undefined)!.role!.name;
    let globalName = interaction.user.globalName!;
    let userId = interaction.user.id;
    let respMess = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();

    // Sprawdzenie czy respMess zawiera tylko dozwolone znaki
    const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(respMess);
    if (!ValidRespMess) {
        reply.content = 'Nazwa roli zawiera niedozwolone znaki.';
        return interaction.reply(reply);
    }

    // Sprawdzenie czy respMess nie jest dłuższa niż 140 znaków
    if (respMess.length > 140) {
        reply.content = 'Wiadomość jest zbyt długa. Maksymalna długość to 140 znaków.';
        reply.flags = MessageFlags.Ephemeral;
        return interaction.reply(reply);
    }

    reply.content = `Aby dokonać zakupu produktu **${itemName.toString()}** wklej tą wiadomość w tytule przelewu:\n\n **${respMess}**`

    // Utwórz przycisk do kopiowania
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId('copy')
            .setLabel('Copy')
            .setStyle(ButtonStyle.Primary));

    reply.components = [row];

    await interaction.reply(reply);
};

// TODO: dodać logowanie
// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu
// TODO: ograniczyć tylko do ról po rozpoczętej walidacji (@member)