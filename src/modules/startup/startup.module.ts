import { StartupInstance } from './startup.instance';
import {ScriptBuilder} from './startup.builder';
import {StartupManager } from './startup.manager';

 class MultiStartupModule {
    private static _startupModule: MultiStartupModule;

    private _instances: Map<string, StartupInstance>;

    private _manager: StartupManager;

    private constructor() {
        this._manager = new StartupManager(new ScriptBuilder());
        this._instances = new Map<string, StartupInstance>();
        console.log('Startup module created');
    }

    public static getInstance(): MultiStartupModule {
        if (!MultiStartupModule._startupModule) {
            MultiStartupModule._startupModule = new MultiStartupModule();
        }
        return MultiStartupModule._startupModule;
    }

    public CreateInstance(name: string): void {

    }
};

export default MultiStartupModule;


