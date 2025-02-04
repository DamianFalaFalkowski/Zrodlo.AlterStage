import { Client, GatewayIntentBits } from 'discord.js';
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

// Login to Discord with your app's token
client.login(process.env.TOKEN);