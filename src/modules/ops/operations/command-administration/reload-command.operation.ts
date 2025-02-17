import { APIApplicationCommand, Collection, Routes } from "discord.js";
import dcLoggerUtil from "../../../../app/utils/dc-logger.util";
import AlterStageAppStartup from '../../../../startup';

module.exports = {
    messageName: 'reload-command',

    _failsCount: 0,

    async Execute(...options: string[]) {
        // pobierz moduł z definicją polecenia (/) aplikacji
        const definition = require(`../../../../app/messaging/handlers/${options[0]}/${options[0]}.definition`);
        dcLoggerUtil.logInfo(
            `Rozpoczynam procesowanie operacji '${definition.data.name}'.`);//\nDefinicja operacji:\n${JSON.stringify(definition, null, 2)}`);

        // utwórz kolekcję a w niej pojedyńcze polecenie do aktualizacji
        let commands = new Collection<string, APIApplicationCommand>();
        commands.set(definition.data.commandName, definition.data as APIApplicationCommand);

        try {
            if (!AlterStageAppStartup.rest)
                throw Error("REST is missing!")
            // wykonaj zapytanie PUT do discord api
            const data = await AlterStageAppStartup.rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID! as string, process.env.GUILD_ID! as string),
                { body: commands.toJSON() }
            );
            dcLoggerUtil.logInfo(
                `Operacja PUT polecenia (/) ${definition.data.name} została wykonana.`);//\nRezultat operacji:\n${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            dcLoggerUtil.logError(error as Error);
            dcLoggerUtil.logStringError("Treść błędu:\n" + JSON.stringify(error, null, 2));
            throw error;
        }

    }
}