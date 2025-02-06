"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('generate-transfer-msg')
        .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
        .addRoleOption(option => option.setName('role-to-buy')
        .setDescription('The role to buy.')
        .setRequired(true)),
    async execute(interaction) {
        await (0, exports.execute)(interaction);
    }
};
const execute = async (interaction) => {
    // Sprawdzenie czy przekazana rola istnieje w systemie i czy jest rolą ozanczoną jako do kupienia
    if (interaction.guild.roles.cache.find(role => role.name === interaction.options.data[0].role.name) === undefined)
        return interaction.reply('Rola nie istnieje w systemie.');
    if (interaction.options.data[0].role.name.charAt(0) !== '+')
        return interaction.reply('Rola nie jest przeznaczona do kupienia.');
    let reply = { content: undefined, flags: discord_js_1.MessageFlags.Ephemeral };
    let itemName = interaction.options.data.find((x) => x !== undefined).role.name;
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
        reply.content = 'Wiadomość jest zbyt długa. Maksymalna długość to 140 znaków.';
        reply.flags = discord_js_1.MessageFlags.Ephemeral;
        return interaction.reply(reply);
    }
    reply.content = `Aby dokonać zakupu produktu **${itemName.toString()}** wklej tą wiadomość w tytule przelewu:\n\n **${respMess}**`;
    // Utwórz przycisk do kopiowania
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('copy')
        .setLabel('Copy')
        .setStyle(discord_js_1.ButtonStyle.Primary));
    reply.components = [row];
    await interaction.reply(reply);
};
exports.execute = execute;
// TODO: sprawić, eby wiadomość była widoczna tylko dla pytającego
// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu
// TODO: ograniczyć tylko do ról po rozpoczętej walidacji (@member)
