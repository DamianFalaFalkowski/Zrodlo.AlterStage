import { ISqlite } from "../app-data.sqlite.instance";

export interface ISaveTagIntegrationOut
{
    getTagName(): string;
}
export interface ISaveTagIntegrationIn extends ISqlite
{
    saveTag(tagName: string): void;
}
export interface ISaveTagIntegration
    extends 
        ISaveTagIntegrationIn, 
            ISqlite
{
}