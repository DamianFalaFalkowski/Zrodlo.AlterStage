import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs = require('node:fs');
import path = require('node:path');
import "./type-mappings/client-type-map.js";
import { log } from 'node:console';

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Zdefiniowanie polaczenia z baza danych
export const sequelizeContext = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
sequelizeContext.afterSync(() => log('Database synchronized'));
sequelizeContext.sync();

// Read commands from the commands directory
client.commands = new Collection();
const commandsFolderPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsFolderPath).filter((file: any) => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsFolderPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Read event handlers from the events directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with your app's token
client.login(process.env.TOKEN);