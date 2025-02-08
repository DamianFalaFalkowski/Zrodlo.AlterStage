import path = require('node:path');
import fs = require('node:fs');
import { ApplicationCommand, Client, Collection } from 'discord.js';
import dcLogger from './dc-logger';

export class FindCommandHandlersUtil {
    public static GetCommandDefinitions(client: Client, rootFolderPath: string): any[] {
        dcLogger.logToFile(`Szukam definicji poleceń $rootFolderPath=${rootFolderPath}.`)
        let commands: any[] = [];
        const handlersFolder = path.join(rootFolderPath, 'handlers');
        const singleHandlerFolders = fs.readdirSync(handlersFolder)
            .map(x => path.join(handlersFolder, x));
        client.commands = new Collection();
        let i = 0;
        for (const singleHandlerFolder of singleHandlerFolders) {
            let fileName = fs.readdirSync(singleHandlerFolder).filter(x =>
                x.endsWith('.definition.ts') ||
                x.endsWith('.definition.js')
            );
            if(singleHandlerFolder != undefined && fileName[i] != undefined)
            {
                let filePath = path.join(singleHandlerFolder, fileName[i]);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
            i++;
        }
        return commands;
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