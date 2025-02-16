import { Client, GatewayIntentBits, REST } from 'discord.js';
import dotenv from 'dotenv';
import dcLogger from './app/utils/dc-logger';

    class altStg {
        private static readonly appVersion = '1.0.0.0-alpha.1';
        private static readonly intends = [
            	GatewayIntentBits.Guilds,
            	GatewayIntentBits.GuildMessages,
            	GatewayIntentBits.MessageContent,
            	GatewayIntentBits.GuildMembers, 
            	GatewayIntentBits.GuildModeration,
            	GatewayIntentBits.MessageContent,
            	GatewayIntentBits.AutoModerationExecution,
            	GatewayIntentBits.DirectMessagePolls,
            	GatewayIntentBits.DirectMessageReactions,
            	GatewayIntentBits.DirectMessageTyping
            ] ;

        public static __setUpApplication() {
            if (this.appSetUp) return;
            this.appSetUp = true;

            try {
                dcLogger.logInfo(
                    `~ ~ ~ Setting up AlterStage - discord server integration application (version: ${this.appVersion}) ~ ~ ~`);
                dotenv.config();
                this._alterStageAppGlobals = {
                    rest: this.__setUpRest(),
                    client: new Client({ intents: this.intends }),
                    appVersion: this.appVersion
                };
                return this._alterStageAppGlobals;
            }
            catch (e: Error | any) {
                dcLogger.logStringError(
                    "Aplikacja napotkała problewm podczas rozruchu...");
                dcLogger.logError(e as Error);
                this.appSetUp = false;
                return;
            }
        }
        private static  appSetUp: boolean = false;

        private static __setUpRest(): REST {
            return new REST().setToken(process.env.TOKEN as string);
        }

        private static _alterStageAppGlobals: any;
        
        public static get alterStageAppGlobals() {
            return this._alterStageAppGlobals ?? this.__setUpApplication();
        }
    }

export default altStg.__setUpApplication();
export const __rest = altStg.alterStageAppGlobals?.rest!;
export const __client :Client = altStg.alterStageAppGlobals?.client!;
export const __appVersion = altStg.alterStageAppGlobals?.appVersion!;
