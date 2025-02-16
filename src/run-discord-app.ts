import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs = require('node:fs');
import path = require('node:path');
import "./type-mappings/client-type-map.js";
import { log } from 'node:console';
import { FindCommandHandlersUtil } from './utils/find-command-handlers-definitions.util.js';
import dcLogger from './utils/dc-logger.js';


// Load environment variables from .env file
dotenv.config();
// Create a new Discord client instance
const client = new Client({ 
	intents: [
		"Guilds",
		'GuildExpressions',
		"GuildMessages",
		"MessageContent",
		"GuildMembers", 
		"GuildModeration",
		"MessageContent",
		"AutoModerationExecution",
		"DirectMessagePolls",
		"DirectMessageReactions",
		"DirectMessageTyping",
		'DirectMessagePolls',
		'DirectMessageTyping',
		'GuildIntegrations',
		'GuildMessageTyping',

	]
// 	intents: [
// 	GatewayIntentBits.Guilds,
// 	GatewayIntentBits.GuildMessages,
// 	GatewayIntentBits.MessageContent,
// 	GatewayIntentBits.GuildMembers, 
// 	GatewayIntentBits.GuildModeration,
// 	GatewayIntentBits.MessageContent,
// 	GatewayIntentBits.AutoModerationExecution,
// 	GatewayIntentBits.DirectMessagePolls,
// 	GatewayIntentBits.DirectMessageReactions,
// 	GatewayIntentBits.DirectMessageTyping
// ] 
});

// Zdefiniowanie polaczenia z baza danych
export const sequelizeContext = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
}); 
sequelizeContext.afterSync(() => log('Database synchronized'));

// Read commands from the commands directory
// client.commands = FindCommandHandlersUtil.GetCommandDefinitions('/Users/damianfalkowski/Documents/Source/Zrodlo.AlterStage/Zrodlo.AlterStage.DiscordAppTs/src');

FindCommandHandlersUtil.LoadCommmandsToClient(client, path.join(__dirname, 'app/dc-messaging/handlers'));
// if(commands.length>0)
// 	client.commands = new Collection();
// commands.forEach(command => {
// 	client.commands.set(command.data.name, command.data)
// });

// Read event handlers from the events directory
const eventsPath = path.join(__dirname, 'app/dc-messaging/events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	dcLogger.logInfo(`Exevution of event ${event.name} has been added`);
}

// Login to Discord with your app's token
client.login(process.env.TOKEN);