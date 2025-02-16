import { Client, GatewayIntentBits, REST } from 'discord.js';
import { RegisterCommand } from './app/consumers/terminal/command-administration.consumer.js'
import dotenv from 'dotenv';
//import { GenerateTransferMessageCommand } from './app/dc-messaging/handlers/gen-transfer-msg/gen-transfer-msg.command.js';
//const generateTransferMessageDef = require('/Users/damianfalkowski/Documents/Source/Zrodlo.AlterStage/Zrodlo.AlterStage.DiscordAppTs/src/app/dc-messaging/handlers/gen-transfer-msg/gen-transfer-msg.definition.ts');

// Config
dotenv.config();
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
export const rest = new REST().setToken(process.env.TOKEN as string);

// Odczytywanie argumentów wiersza poleceń
const args = process.argv.slice(2); // Pomijamy pierwsze dwa elementy, ponieważ są to ścieżki do node i skryptu

// Przykład użycia argumentów
if (args.length === 0) {
    console.log('No arguments provided.');
} else {
    console.log('Arguments:', args);
}

// Przykład: Odczytywanie konkretnego parametru
const paramName = '-registercommand';
const paramValue = args.find(arg => arg.startsWith(paramName));
if (paramValue) {
    const value = paramValue.split('=')[1];
    RegisterCommand(value);
} else {
    console.log(`Parameter ${paramName} not found.`);
}