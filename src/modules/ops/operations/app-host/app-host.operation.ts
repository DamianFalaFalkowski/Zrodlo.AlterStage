import dcLoggerUtil from '../../../../app/utils/dc-logger.util';
import { __sleep } from '../../../../app/utils/sleep.util';
import AlterStageAppStartup from '../../../../startup';

module.exports = {
    messageName: '-host-app',

    _failsCount: 0,

    async Execute(...options: string[]){
        try {
            await hostApp();
        }
        catch (e :any){ 
            this._failsCount++;
            dcLoggerUtil.logStringError(`Próba uruchomienia hosta apklikacji zakończona niepowodzeniem!`)
            if(typeof(e) === typeof(Error))
                dcLoggerUtil.logError(e)
            else
            dcLoggerUtil.logStringError(JSON.stringify(e))
            await __sleep(5000);
            await this.Execute(); 
        }
    }
}

async function hostApp() {
    await AlterStageAppStartup.ClientLogin();
}