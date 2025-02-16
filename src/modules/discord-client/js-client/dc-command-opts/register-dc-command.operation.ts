import { APIApplicationCommand, Collection, Routes } from 'discord.js';
import dcLogger from '../../../../app/utils/dc-logger.util';
import AlterStageAppStartup from '../../../../startup';

export class DiscordCommandOperations {
    public static async ProceedOperation_ReloadCommand(dcCommandDefinitionFilePath: string) {      

        // pobierz moduł z definicją polecenia (/) aplikacji
        const definition = require(dcCommandDefinitionFilePath);
        dcLogger.logInfo(
            `Rozpoczynam procesowanie operacji '${definition.data.name}'.`);//\nDefinicja operacji:\n${JSON.stringify(definition, null, 2)}`);

        // utwórz kolekcję a w niej pojedyńcze polecenie do aktualizacji
        let commands = new Collection<string, APIApplicationCommand>();
        commands.set(definition.data.commandName, definition.data as APIApplicationCommand);
    

            try {
                if(!AlterStageAppStartup.rest)
                    throw Error("REST is missing!")
                // wykonaj zapytanie PUT do discord api
                const data = await AlterStageAppStartup.rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID! as string, process.env.GUILD_ID! as string),
                    { body: commands.toJSON() }
                );
                dcLogger.logInfo(
                    `Operacja PUT polecenia (/) ${definition.data.name} została wykonana.`);//\nRezultat operacji:\n${JSON.stringify(data, null, 2)}`);
            } catch (error) {
                dcLogger.logError(error as Error);
                dcLogger.logStringError("Treść błędu:\n" + JSON.stringify(error, null, 2));
                throw error;
            }
        
    }
}