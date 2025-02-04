"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("./type-mappings/client-type-map.ts");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create a new Discord client instance
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
client.commands = new discord_js_1.Collection();
// Bot logs when it's ready
client.once('ready', () => {
    console.log(`${client.user?.username} is online!`);
});
// Listen for messages and log the sender's name
client.on('messageCreate', (message) => {
    if (!message.member) {
        // If the message is a DM, stop further execution
        return;
    }
    console.log(`${message.member.displayName} sent: ${message.content}`);
});
// dynamically retrieve command files
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
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
});
// Login to Discord with your app's token
client.login(process.env.TOKEN);
