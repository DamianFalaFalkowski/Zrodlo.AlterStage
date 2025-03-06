import { ISaveTagIntegration } from "../../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";
import { AppModule } from "../app.module";
import { VersionInstance } from "./app.version.instance";

interface IVersionBuilder 
{
    setUpAppVersion(major: number, minor: number, patch: number): AppModule;
}
export abstract class VersionBuilder extends VersionInstance 
    implements 
        IVersionBuilder, ISaveTagIntegration
{
    abstract isDatabaseSynced(): boolean ;
    abstract isTableInitialized(tableName: string): boolean ;
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