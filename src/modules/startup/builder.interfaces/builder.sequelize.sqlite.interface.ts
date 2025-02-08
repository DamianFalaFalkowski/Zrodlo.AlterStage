import {StartupInstance} from '../startup.instance';
import {ScriptBuilder} from "../startup.builder";

export interface IBuilderSequelizeSqLite extends StartupInstance {
    addSequelizeContext(instance: StartupInstance, database: string, user: string, password: string, options?: any): ScriptBuilder;

    addAfterSyncAction(instance: StartupInstance, action: any): ScriptBuilder;
}
export default IBuilderSequelizeSqLite;