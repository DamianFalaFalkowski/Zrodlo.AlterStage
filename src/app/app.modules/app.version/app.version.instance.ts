
import { ISaveTagIntegrationOut } from "../../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";
import { ApplicationError } from "../../app.errors/application.error";
import { AppModule } from '../app.module';

interface IVersionInstance  
{
    appVersion: string | null;
    isAppVersionSetUp(): boolean;
}

export abstract class VersionInstance 
    extends AppModule 
    implements 
        IVersionInstance, 
        ISaveTagIntegrationOut
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

    public getTagName(): string {
        return this.appVersion;
    }
}