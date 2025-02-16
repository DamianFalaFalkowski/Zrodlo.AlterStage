import { client } from '../../../..';
//const definition = require('/Users/damianfalkowski/Documents/Source/Zrodlo.AlterStage/Zrodlo.AlterStage.DiscordAppTs/src/app/dc-messaging/handlers/gen-transfer-msg/gen-transfer-msg.definition');
import { APIApplicationCommand, Collection, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import dcLogger from '../../../../utils/dc-logger';

export async function ProceedOperation(commandScriptDefinition: any) {
    const definition = require(commandScriptDefinition);

    const token = process.env.TOKEN!;
    const guildId = process.env.GUILD_ID!;
    const clientId = process.env.CLIENT_ID!;
    // Construct and prepare an instance of the REST module


    let ab = definition;
    if (ab)
        console.log(JSON.stringify(ab, null, 2));
    
    client.commands = new Collection();
    client.commands.set(definition.commandName, definition);
    const rest = new REST().setToken(token);

    // and deploy your commands!
    await (async () => {
        try {
            console.log(`Started refreshing ${definition.commandName} application (/) command.`);
            let commands = new Collection<string, APIApplicationCommand>();
            client.commands.forEach(element => {
                commands.set(element.data.name, element.data as APIApplicationCommand);
            });
            
            commands
                .forEach((v,k) => {                       
                    let opts = v.options?.copyWithin(v.options.length, 0);
                    dcLogger.logInfo("___cmd:__"+JSON.stringify(v));
                    dcLogger.logInfo("___opts:__"+JSON.stringify(opts));
                });
            commands
                .toJSON()
                .forEach((v,k) => {                       
                    let opts = v.options?.copyWithin(v.options.length, 0);
                    dcLogger.logInfo("___cmd2:__"+JSON.stringify(v));
                    dcLogger.logInfo("___opts2:__"+JSON.stringify(opts));
                });
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId as string, guildId as string),
                { 
                    body: commands.toJSON(),
                }
            );
            console.log(data);
            console.log(JSON.stringify(data, null, 2));
            

            console.log(`Successfully reloaded ${definition.commandName} application (/) command`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
            console.log(JSON.stringify(error, null, 2));
        }
    })();
}