import { Client, GatewayIntentBits, REST } from 'discord.js';
import dotenv from 'dotenv';

let appSetUp = false;
/** 
 * Metoda konfigurująca składniki potrzebne do poprawnego działania aplikacji
 */
function __setUpApplication() {
    if (appSetUp) return;
    dotenv.config();  
    appSetUp = true;
}

function __setUpRest(): REST{
    __setUpApplication();
    return new REST().setToken(process.env.TOKEN as string);
}

export const __rest = __setUpRest();
export const __client = new Client({ intents: [GatewayIntentBits.Guilds] });
export const __util = require('node:util'); 
