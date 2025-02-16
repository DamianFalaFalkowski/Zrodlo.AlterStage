import { ProceedOperation } from "../../../modules/discord-client/js-client/dc-command-handlers/register-command.operation";
import { OpsResult } from "../../../modules/ops/model/ops-result";
import dcLogger from "../../../utils/dc-logger";

export function RegisterCommand(commandName: string, commandModulePath: string | null = "../../../../app/dc-messaging/handlers"): OpsResult {
    try {
        ProceedOperation(`${commandModulePath}/${commandName}/${commandName}.definition`);
    }
    catch (e :Error | any) {
        dcLogger.logError(e);//.logToFile((e as Error).message);
        return (new OpsResult()).CompleteOps(false);
    }
    return (new OpsResult()).CompleteOps(true);
}