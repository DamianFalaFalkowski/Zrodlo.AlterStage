"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs = require("node:fs");
const path = require("node:path");
require("./type-mappings/client-type-map");
//import type {Config from 'jest';
// Load environment variables from .env file
dotenv_1.default.config();
// Create a new Discord client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// Read commands from the commands directory
client.commands = new discord_js_1.Collection();
const commandsFolderPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsFolderPath).filter((file) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path.join(commandsFolderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command.data);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${client.commands.size} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: client.commands });
        // The put method is used to fully refresh all global commands
        // const data: any = await rest.put(
        // 	Routes.applicationCommands(process.env.CLIENT_ID as string),
        //     { body: commands },
        // );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
