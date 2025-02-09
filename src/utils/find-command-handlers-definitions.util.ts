import path = require('node:path');
import fs = require('node:fs');
import { ApplicationCommand, Client, Collection, CommandInteraction } from 'discord.js';
import dcLogger from './dc-logger';

export class FindCommandHandlersUtil {
    public static GetCommandDefinitions(client: Client, rootFolderPath: string): any {
        dcLogger.logToFile(`Szukam definicji poleceń $rootFolderPath=${rootFolderPath}.`)
        const singleHandlerFolders = fs.readdirSync(rootFolderPath)
            .map(x => path.join(rootFolderPath, x.substring(0, x.length)));
        dcLogger.logToFile(`Found ${singleHandlerFolders.length} folders to check.`)
        client.commands = new Collection();

        for (const singleHandlerFolder of singleHandlerFolders) {
            let fileName = fs.readdirSync(singleHandlerFolder).filter(x =>
                x.endsWith('.definition.ts') ||
                x.endsWith('.definition.js')
            )[0];
            if(singleHandlerFolder != undefined && fileName != undefined)
            {
                let filePath = singleHandlerFolder + "/" + fileName;
                dcLogger.logToFile(`Looking for file ${filePath}`);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    dcLogger.logToFile(command.data.name + " set");
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
        return client;
    };
}






// } // Read commands from the commands directory
// const handlersFolder = path.join(__dirname, 'handlers');
// const singleHandlerFolders = fs.readdirSync(handlersFolder).map(x => path.join(handlersFolder, x));
// for (const singleHandlerFolder of singleHandlerFolders) {
//   	let fileName = fs.readdirSync(singleHandlerFolder).filter(x => x.endsWith('.definition.js') || x.endsWith('.definition.ts'));
// 	let filePath = path.join(singleHandlerFolder, fileName[0]);
// 	const command = require(filePath);
// 	if ('data' in comand && 'execute' in command) {
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }