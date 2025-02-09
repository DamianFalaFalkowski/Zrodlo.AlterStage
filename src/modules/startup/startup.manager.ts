import { ScriptBuilder } from "./startup.builder";
import { StartupInstance } from "./startup.instance";



 enum StartupScripts {
    RunDiscordApp = 1,
    RunCommandsRegistration = 2
}

export class StartupManager {

    private _builder: ScriptBuilder;

    constructor(builder: ScriptBuilder) {
        this._builder = builder;
        console.log('Startup manager created');
    }

    public SetUpScript(script: StartupScripts, instance: StartupInstance) {
        switch (script) {
            case StartupScripts.RunDiscordApp:
                this.RunDiscordApp(instance);
            case StartupScripts.RunCommandsRegistration:
        }
    }

    private RunDiscordApp(instance: StartupInstance) {
        this._builder
            .addSequelizeContext(instance, "", "", "", null)
            .addAfterSyncAction(instance, null);
    }
}