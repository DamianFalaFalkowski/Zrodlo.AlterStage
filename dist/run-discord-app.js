"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeContext = void 0;
const discord_js_1 = require("discord.js");
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const fs = require("node:fs");
const path = require("node:path");
require("./type-mappings/client-type-map.js");
const node_console_1 = require("node:console");
// Load environment variables from .env file
dotenv_1.default.config();
// Create a new Discord client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// Zdefiniowanie polaczenia z baza danych
exports.sequelizeContext = new sequelize_1.Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});
exports.sequelizeContext.afterSync(() => (0, node_console_1.log)('Database synchronized'));
exports.sequelizeContext.sync();
// Read commands from the commands directory
client.commands = new discord_js_1.Collection();
const commandsFolderPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsFolderPath).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsFolderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
// Read event handlers from the events directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// Login to Discord with your app's token
client.login(process.env.TOKEN);
