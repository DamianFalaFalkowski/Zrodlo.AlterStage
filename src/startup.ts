import { Client } from 'discord.js';
import dotenv from 'dotenv';
import dcLogger from './app/utils/dc-logger';
import { AlterStageModuleBuilder } from './startup.builder';

class AlterStageAppStartup {
    private static readonly appVersion = '1.0.0.0-alpha.1'; // TODO: przeniesc do .env


    public static __setUpApplication(): AlterStageModuleBuilder {
        if (this.appSetUp) return new AlterStageModuleBuilder();
        this.appSetUp = true;

        try {
            dcLogger.logInfo(
                `~ ~ ~ Setting up AlterStage - discord server integration application (version: ${this.appVersion}) ~ ~ ~`);
            dotenv.config();
            this._alterStageAppGlobals =
                new AlterStageModuleBuilder()                    
                    .setUpAppVersion()
                    .SetUpRest()
                    .SetUpClient()
                    .SetDbConnection('database', 'user',
                        'password', 'localhost', 'sqlite',
                        false, 'database.sqlite')
                        .InitRepositories()
                    .LoadCommands()
                    .LoadEventHandlers();;
            return this._alterStageAppGlobals;
        }
        catch (e: Error | any) {
            dcLogger.logStringError(
                "Aplikacja napotkała problewm podczas rozruchu...");
            dcLogger.logError(e as Error);
            this.appSetUp = false;
            return new AlterStageModuleBuilder();
        }
    }
    private static appSetUp: boolean = false;

    private static _alterStageAppGlobals: AlterStageModuleBuilder;

    public static get alterStageAppGlobals(): AlterStageModuleBuilder {
        return this._alterStageAppGlobals ?? this.__setUpApplication();
    }
}

export default AlterStageAppStartup.__setUpApplication();
//export const __rest = AlterStageAppStartup.alterStageAppGlobals?.rest!;
//export const __client: Client = AlterStageAppStartup.alterStageAppGlobals?.client!;
//export const __appVersion = AlterStageAppStartup.alterStageAppGlobals?.appVersion!;
