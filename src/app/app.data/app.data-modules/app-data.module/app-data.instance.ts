import { ApplicationError } from "../../../app.errors/application.error";
import { AppModule } from '../../../app.modules/app.module';

interface IAppDataInstance  
{
    appVersion: string | null;
    isAppVersionSetUp(): boolean;
}
export abstract class AppDataInstance 
    extends AppModule 
    implements 
        IAppDataInstance
{
    protected _appVersion: string | undefined;

    public get appVersion(): string
    {
        return this._appVersion ??
            (() => { throw new ApplicationError("Wersja nie została jeszcze ustawiona"); })();
    }

    public isAppVersionSetUp(): boolean {
        return this._appVersion !== undefined;
    }
}