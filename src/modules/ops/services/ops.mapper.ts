import { AppHostOperationNames } from '../enums/app-host-ops.enum';
import { CommandAdministrationOperationNames } from '../enums/command-administration-ops.enum';
import { OperationsPrefixes } from '../enums/ops-prefixes.enum';

class OperationsMapper {
    private _fileExtensions: string = '.operation.ts';

    private _prefixes = [
        {key: OperationsPrefixes.AppHost, value:'./../operations/app-host/'},
        {key: OperationsPrefixes.DiscordCommandAdministration , value:'./../app/operations/dc-command-administration/'}
    ];

    private _appHostNames = [
        {key:AppHostOperationNames.Host, value:'app-host'}
    ];

    private _commandAdministrationNames = [
        {key:CommandAdministrationOperationNames.Reload, value:'reload-dc-command'},
        {key:CommandAdministrationOperationNames.Delete, value:'delete-dc-command'}
    ];

    private getOperationNamesEnum(prefixKey :OperationsPrefixes) {
        switch (prefixKey)
        {
            case OperationsPrefixes.AppHost:
                return this._appHostNames;
            case OperationsPrefixes.DiscordCommandAdministration:
                return this._commandAdministrationNames;
            default:
                throw Error(`Nie odnaleziono typu wyliczeniowego dla ${prefixKey}`)
        }
    }

    public GetScriptPath(messageName :string) :string {
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