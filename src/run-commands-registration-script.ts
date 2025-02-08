import { REST, Routes, Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { FindCommandHandlersUtil } from './utils/find-command-handlers-definitions.util';
import dcLogger from './utils/dc-logger';

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // sprawdzac czy intends nie sa nullem

// Read commands from the commands directory
let commands = FindCommandHandlersUtil.GetCommandDefinitions(client, '/Users/damianfalkowski/Documents/Source/Zrodlo.AlterStage/Zrodlo.AlterStage.DiscordAppTs/.dist');

if (commands.length > 0) {
    client.commands = new Collection();
    commands.forEach(command => {
        client.commands.set(command.data.name, command.data);
    });
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN as string);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

        // Logowanie ciała żądania
        const requestBody = client.commands.map(command =>JSON.stringify(command));
        dcLogger.logToFile(`Request body: ${JSON.stringify(requestBody, null, 2)}`);
		
        //The put method is used to fully refresh all commands in the guild with the current set
        const data: any = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
            { body: client.commands }
        );

        // The put method is used to fully refresh all global commands
        // const data: any = await rest.put(
        //     Routes.applicationCommands(process.env.CLIENT_ID as string),
        //     { body: client.commands.toJSON() }
        // );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
        dcLogger.logStringError(JSON.stringify(error as Error));
    }
})();