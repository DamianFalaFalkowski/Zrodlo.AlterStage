import dcLoggerUtil from '../../../app/utils/dc-logger.util';
import OperationsMapper from './ops.mapper'

class OperationsRouterService {
    public async Push(messageName: string, ...options: string[]){
        const operationScript = require(OperationsMapper.GetScriptPath(messageName.slice(1,messageName.length)));
        await operationScript.Execute(...options);
    }
}
export default new OperationsRouterService();
