import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { FindCommandHandlersUtil } from './utils/find-command-handlers-definitions.util';
import dcLogger from './utils/dc-logger';
import "./type-mappings/client-type-map.js";
import path from 'path';
import { json } from 'sequelize';

// Config
dotenv.config();

// Utworzenie klienta i zaladowanie commandsów z plików .definition
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST().setToken(process.env.TOKEN as string);
FindCommandHandlersUtil.LoadCommmandsToClient(client, path.join(__dirname, 'handlers'));

// Aktualizacja polecen na serwerze
console.log(`Started refreshing ${client.commands.size} application (/) commands.`);
let putAppCommandsRequestBody = client.commands.toJSON();
client.commands.forEach(clientCommand => {
    dcLogger.logToFile(`Request body: ${JSON.stringify(putAppCommandsRequestBody, null, 2)}`);
    //dcLogger.logToFile(`Request body: ${putAppCommandsRequestBody.toJSON()}`);
    (async () => {
        try { 
            // Wykonaj wysyłkę pijedynczego polecenia
            await rest.put(Routes.applicationGuildCommands(
                process.env.CLIENT_ID as string,
                process.env.GUILD_ID as string),
            { body: { json: putAppCommandsRequestBody } }
            );
        }
        catch (error) { 
            // Obsluga bledu z API!
            console.error(error);
            dcLogger.logStringError(JSON.stringify(error as Error));
        }
    });
    console.log(`Successfully reloaded ${client.commands.toJSON().length} application (/) commands.`);
});