
import { ISaveTagIntegration } from "../rental-data.module/integrations/save-tag.sqlite.integration";
import { AppModule } from "../../../app.modules/app.module";
import { AppDataInstance } from "./app-data.instance";

interface IAppDataBuilder 
{
    setUpAppVersion(major: number, minor: number, patch: number): AppModule;
}
export abstract class AppDataBuilder extends AppDataInstance 
    implements 
        IAppDataBuilder, ISaveTagIntegration
{
    abstract isRentalSchemaSynced(): boolean;
    abstract isAppSchemaSynced(): boolean ;
    abstract isContextSetUp(): boolean;
    abstract saveTag(tagName: string): void;

    private createVersionTag(major: number, minor: number, patch: number): string
    {
        return `${major}.${minor}.${patch}.0}`
    }
    
    public setUpAppVersion(major: number, minor: number, patch: number) {
        this._appVersion = this.createVersionTag(major, minor, patch);
        this.saveTag( this.appVersion );
        return this;
    }
}