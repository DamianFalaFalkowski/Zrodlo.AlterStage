import { APIApplicationCommand, Collection, Routes } from "discord.js";
import dcLoggerUtil from "../../../../.utilities/dc-logger.util";
import { definition } from "../../../messaging.module/handlers/tag-create/tag-create.definition";

module.exports = {
    messageName: 'reload-command',

    _failsCount: 0,

    async Execute(...options: string[]) {
        dcLoggerUtil.logInfo(
            `Rozpoczynam procesowanie polecenia (command):'${options[0]}'.`);

        // utwórz kolekcję a w niej pojedyńcze polecenie do aktualizacji
        let commands = new Collection<string, APIApplicationCommand | any>();
        commands.set(options[0], definition.data);

        try {
            throw new Error("this function is broken, fix it before continuation") 
            // if (!IAlterStageAppStartup.rest)
            //     throw Error("REST is missing!")
            // // wykonaj zapytanie PUT do discord api
            // const data = IAlterStageAppStartup.rest!.put(
            //     Routes.applicationGuildCommands(process.env.CLIENT_ID! as string, process.env.GUILD_ID! as string),
            //     { body: commands.toJSON() }
            // );
            // dcLoggerUtil.logInfo(
            //     `Operacja PUT polecenia (/) ${options[0]} została wykonana.\nRezultat operacji:\n${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            dcLoggerUtil.logError(error as Error);
            dcLoggerUtil.logStringError("Treść błędu:\n" + JSON.stringify(error, null, 2));
            throw error;
        }

    }
}