import { REST, Routes, Client, Collection, Events, GatewayIntentBits, MessageFlags  } from 'discord.js';
import dotenv from 'dotenv';
import fs = require('node:fs');
import path = require('node:path');
import "./type-mappings/client-type-map.ts";
//import type {Config from 'jest';

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Read commands from the commands directory
client.commands = new Collection();
const commandsFolderPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsFolderPath).filter((file: any) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path.join(commandsFolderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command.data);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN as string);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
			{ body: client.commands },
		);

        // The put method is used to fully refresh all global commands
        // const data: any = await rest.put(
		// 	Routes.applicationCommands(process.env.CLIENT_ID as string),
        //     { body: commands },
		// );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();