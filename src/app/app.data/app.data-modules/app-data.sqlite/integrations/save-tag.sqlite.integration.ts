import { SqliteBuilder } from "../app-data.sqlite.builder";
import { ISqlite } from "../app-data.sqlite.instance";

export interface ISaveTagIntegrationOut
{
    getTagName(): string;
}
export interface ISaveTagIntegrationIn extends ISqlite
{
    saveTag(tagName: string): void;
}
export abstract class SaveTagIntegration extends SqliteBuilder
    implements ISaveTagIntegrationIn, ISqlite
{
    isContextSetUp(): boolean {
        throw new Error("Method not implemented.");
    }
    saveTag(tagName: string): void {
        throw new Error("Method not implemented.");
    }
}