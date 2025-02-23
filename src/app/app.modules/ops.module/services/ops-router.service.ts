import OperationsMapper from './ops.mapper'

export default class __operationsRouterService {
    public async Push(messageName: string, ...options: string[]){
        const operationScript = require(OperationsMapper.GetScriptPath(messageName.slice(1,messageName.length)));
        await operationScript.Execute(...options);
    }
}
