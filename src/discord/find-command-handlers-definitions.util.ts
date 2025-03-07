import path from 'node:path';
import fs from 'node:fs';
import { Client, Collection, REST, Routes } from 'discord.js';
import {__logger} from './../utils/dc-logger.util';

// TODO: uladnic kod
// TODO: dodac komentarze
export class CommandHandlersUtil {
    public static FindCommandHandlersInFolders(client: Client,rootFolderPaths: [string]) : any[]
    {
        let foundCommands = new Collection();
        let jsonCommands: any[] = [];
        rootFolderPaths.forEach(rootFolderPath => {
            __logger.logInfo(
            `Szukam definicji poleceń $rootFolderPath=${rootFolderPath}`);
        const singleHandlerFolders = fs
            .readdirSync(rootFolderPath)
            .filter(x => 
                 x[0] !== '_' && x[0] !== '.' 
            )
            .map(x => path.join(rootFolderPath, x));
        __logger.logInfo(`Found ${singleHandlerFolders.length} folders to check.`);
        for (const singleHandlerFolder of singleHandlerFolders) {
            let fileName = fs.readdirSync(singleHandlerFolder).find(x =>
                x.endsWith('.definition.ts') ||
                x.endsWith('.definition.js')
            );
                let filePath = singleHandlerFolder + "/" + fileName;
                __logger.logInfo(`Looking for file ${fileName}`);
                const command = require(filePath);
                if ('data' in command.definition && 'execute' in command.definition) {
                    foundCommands.set(command.definition.data.name, command.definition);
                    jsonCommands.push(command.definition.data.toJSON());
                    __logger.logInfo(command.definition.data.name + " found");
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        });
        this.LoadCommmandsToClient(client, foundCommands);
        return jsonCommands;
    };

    public static LoadCommmandsToClient(client: Client, commands: Collection<any, any>) 
    {
        client.commands = new Collection();
        commands.forEach((value, key) => {
            client.commands.set(key, value);
            __logger.logInfo(key.name + " set");
        });
    };

    public static async PublishCommands(rest: REST, jsonCommands: any[], clientId: string, guildId: string) 
    {
        try {
            console.log(`Started refreshing ${jsonCommands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: jsonCommands },
            );
            console.log(`Successfully reloaded ${jsonCommands.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    };
}