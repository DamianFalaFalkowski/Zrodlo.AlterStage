import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import "./type-mappings/client-type-map.ts";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

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
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Login to Discord with your app's token
client.login(process.env.TOKEN);