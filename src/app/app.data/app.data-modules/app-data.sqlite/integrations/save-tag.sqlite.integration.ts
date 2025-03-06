import { ISqlite } from "../app-data.sqlite.instance";

export interface ISaveTagIntegration extends ISqlite
{
    saveTag(tagName: string): void;
}