import path from 'node:path';
import fs from 'node:fs';
import { Client, Collection } from 'discord.js';
import dcLogger from '../.utilities/dc-logger.util';

// TODO: uladnic kod
// TODO: dodac komentarze
export class FindCommandHandlersUtil {
    public static LoadCommmandsToClient(client: Client, rootFolderPath: string) {
        dcLogger.logInfo(
            `Szukam definicji poleceń $rootFolderPath=${rootFolderPath}`);        
        const singleHandlerFolders = fs
            .readdirSync(rootFolderPath)
            .filter(x => 
                 x[0] !== '_' && x[0] !== '.' 
            )
            .map(x => path.join(rootFolderPath, x));
       
        dcLogger.logInfo(`Found ${singleHandlerFolders.length} folders to check.`);

        client.commands = new Collection();
        for (const singleHandlerFolder of singleHandlerFolders) {
            let fileName = fs.readdirSync(singleHandlerFolder).find(x =>
                x.endsWith('.definition.ts') ||
                x.endsWith('.definition.js')
            );
                let filePath = singleHandlerFolder + "/" + fileName;
                dcLogger.logInfo(`Looking for file ${fileName}`);
                const command = require(filePath);
                if ('data' in command.definition && 'execute' in command.definition) {
                    client.commands.set(command.definition.data, command.definition.execute);
                    dcLogger.logInfo(command.definition.data.name + " set");
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            

        }
    };
}