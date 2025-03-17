import { ISqlite } from "../rental-data.instance";

export interface ISaveTagIntegration extends ISqlite
{
    saveTag(tagName: string): void;
}