import { DiscordCommandOperations } from "../../../modules/discord-client/js-client/dc-command-opts/register-dc-command.operation";
import { OpsResult } from "../../../modules/ops/model/ops-result";
import dcLogger from "../../utils/dc-logger.util";

/**
 * Klasa konsumera odpowiedzialnego za konsumpcję operacji zarządzających poleceniami na serwerze discord.
 * ADN-TODO: Tymczasowo pelni rolę metody triggerującej późniejsze polecenia, w przyszłości powinna działać generycznie przechwytując operacje o konkretnym prefiksie i uruchamiać równie generyczną metodę ProceedOperation
 */
export class DcCommandsAdministrationOptsConsumer {

    /** Sciezka prowadzaca do folderu z poleceniami serwera discord */
    protected static _dcCommandHandlersPath :string = "../../../../app/dc-messaging/handlers";

    /**
     * Metoda obsługująca rejestrację pojedyńczego polecenia na serwerze discord.
     * @param commandName unikalna nazwa polecenia
     * @returns rezultat wykonania operacji 
     */
    public static async RegisterCommand(commandName: string): Promise<OpsResult> {
            try {
                await DiscordCommandOperations.ProceedOperation_ReloadCommand(`${DcCommandsAdministrationOptsConsumer._dcCommandHandlersPath}/${commandName}/${commandName}.definition`);
                return new OpsResult().CompleteOps(true);
            }
            catch (e: Error | any) {
                dcLogger.logError(e);
                return new OpsResult().CompleteOps(false);
            }
    }
}

