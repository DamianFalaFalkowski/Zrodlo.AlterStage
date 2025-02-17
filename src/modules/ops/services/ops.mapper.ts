import dcLoggerUtil from '../../../app/utils/dc-logger.util';
import { AppHostOperationNames } from '../enums/app-host-ops.enum';
import { CommandAdministrationOperationNames } from '../enums/command-administration-ops.enum';
import { MessageAdministrationNames } from '../enums/message-administration-ops.enum';
import { OperationsPrefixes } from '../enums/ops-prefixes.enum';

class OperationsMapper {
    private _fileExtensions: string = '.operation';

    private _prefixes = [
        {key: OperationsPrefixes.AppHost, value:'./../operations/app-host/'},
        {key: OperationsPrefixes.DiscordCommandAdministration , value:'./../operations/command-administration/'},
        {key: OperationsPrefixes.DiscordMessagesAdministration , value:'./../operations/message-administration/'}
    ];

    private _appHostNames = [
        {key:AppHostOperationNames.Host, value:'app-host'}
    ];

    private _commandAdministrationNames = [
        {key:CommandAdministrationOperationNames.Reload, value:'reload-command'},
        {key:CommandAdministrationOperationNames.Delete, value:'delete-command'}
    ];

    private _messageAdministrationNames = [
        {key:MessageAdministrationNames.FetchChannels, value:'fetch-channels'}
    ];

    private getOperationNamesEnum(prefixKey :OperationsPrefixes) {
        switch (prefixKey)
        {
            case OperationsPrefixes.AppHost:
                return this._appHostNames;
            case OperationsPrefixes.DiscordCommandAdministration:
                return this._commandAdministrationNames;
                case OperationsPrefixes.DiscordMessagesAdministration:
                return this._messageAdministrationNames;
            default:
                throw Error(`Nie odnaleziono typu wyliczeniowego dla ${prefixKey}`)
        }
    }

    public GetScriptPath(messageName :string) :string {
        dcLoggerUtil.logInfo(`Pobieram path dla wiadomosci '${messageName}'.`);
        const prefixKey = this._prefixes.find(x => messageName.startsWith(x.key))?.key;
        if(!prefixKey) 
            throw Error(`Nie odnaleziono prefixu dla polecenia '${messageName}'.`);
        const prefixValue = this._prefixes.find(x => x.key === prefixKey)?.value;
        if(!prefixValue) 
            throw Error(`Ściezka folderu dla prefixu '${prefixKey}' jest pusta.`);
        const operationNames = this.getOperationNamesEnum(prefixKey);
        const operationKey = messageName.slice(prefixKey.length, messageName.length);
        const operationValue = operationNames.find(x => (x.key as string) ===operationKey)?.value;
        return prefixValue + operationValue + this._fileExtensions;
    }
}
export default new OperationsMapper();