import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SlashCommandBuilder } from "discord.js";

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

export const execute = async (interaction: any) => {
    let reply: any = { content: undefined, flags: MessageFlags.Ephemeral }

    let itemName = interaction.options.data.find((x: any) => x !== undefined).role.name;
    let globalName = interaction.user.globalName;
    let userId = interaction.user.id;
    let respMess = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();

    // Sprawdzenie czy respMess zawiera tylko dozwolone znaki
    const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(respMess);
    if (!ValidRespMess) {
        reply.content = 'Nazwa roli zawiera niedozwolone znaki.';
        return interaction.reply(reply);
    }
    console.log(respMess.length);
    console.log(respMess.toString());
    // Sprawdzenie czy respMess nie jest dłuższa niż 140 znaków
    if (respMess.length > 140) {
        reply.content = 'Wiadomość jest zbyt długa. Maksymalna długość to 140 znaków.'
        return interaction.reply(reply);
    }

    reply.content = `Aby dokonać zakupu produktu **${itemName.toString()}** wklej tą wiadomość w tytule przelewu:\n\n **${respMess}**`

    // Utwórz przycisk do kopiowania
    const row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId('copy')
            .setLabel('Copy')
            .setStyle(ButtonStyle.Primary));

    reply.components = [row];

    await interaction.reply(reply);
};


// TODO: sprawić, eby wiadomość była widoczna tylko dla pytającego
// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu
// TODO: ograniczyć tylko do ról po rozpoczętej walidacji (@member)