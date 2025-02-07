"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const discord_js_1 = require("discord.js");
const dc_logger_1 = __importDefault(require("../utils/dc-logger"));
const allowedRoles = ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'];
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
    dc_logger_1.default.logCommand(interaction);
    let reply = { content: undefined, flags: discord_js_1.MessageFlags.Ephemeral };
    if (!interaction.isCommand())
        return;
    // Sprawdzenie czy uzytkownik na uprawnienia do uruchomienia polecenia
    const member = interaction.member;
    if (!member || !('roles' in member)) {
        reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
        return interaction.reply(dc_logger_1.default.logReplyAndReturn(interaction, reply));
    }
    const roles = member.roles.cache;
    if (!roles.some(role => allowedRoles.includes(role.name))) {
        reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
        return interaction.reply(dc_logger_1.default.logReplyAndReturn(interaction, reply));
    }
    // Sprawdzenie czy przekazana rola istnieje w systemie ...
    if (interaction.guild.roles.cache.find(role => role.name === interaction.options.data[0].role.name) === undefined) {
        reply.content = 'Rola którą próbujesz zakupić nie istnieje w systemie.';
        return interaction.reply(dc_logger_1.default.logReplyAndReturn(interaction, reply));
    }
    // ... i czy jest rolą ozanczoną jako do kupienia
    if (interaction.options.data[0].role.name.charAt(0) !== '+') {
        reply.content = 'Rola którą próbujesz zakupić nie jest przeznaczona do kupienia.';
        return interaction.reply(dc_logger_1.default.logReplyAndReturn(interaction, reply));
    }
    // rozpoczęcie generowania wiadomości
    let itemName = interaction.options.data.find((x) => x !== undefined).role.name;
    let globalName = interaction.user.globalName;
    let userId = interaction.user.id;
    let generatedTransferMessage = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();
    // Sprawdzenie czy generatedTransferMessage zawiera tylko dozwolone znaki
    const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(generatedTransferMessage);
    if (!ValidRespMess) {
        // Jeśli tak to zastąp niedozwolone znaki podkreślnikiem
        generatedTransferMessage = generatedTransferMessage.replace(/[^a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+/g, '_');
    }
    // Sprawdzenie czy generatedTransferMessage nie jest dłuższa niż 140 znaków
    if (generatedTransferMessage.length > 140) {
        // JHeśli tak to skróć generatedTransferMessage do 140 znaków
        generatedTransferMessage = generatedTransferMessage.substring(0, 140);
    }
    reply.content = `Aby dokonać zakupu produktu **${itemName.toString()}** wklej tą wiadomość w tytule przelewu:\n\n **${generatedTransferMessage}**`;
    // Utwórz przycisk do kopiowania
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('copy')
        .setLabel('Copy')
        .setStyle(discord_js_1.ButtonStyle.Primary));
    reply.components = [row];
    // Odeślij odpowiedź
    await interaction.reply(dc_logger_1.default.logReplyAndReturn(interaction, reply));
};
exports.execute = execute;
// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu
