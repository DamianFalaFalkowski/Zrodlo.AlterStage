import { IAppDataChecks } from "../../app-data.module/app-data.instance";

export interface ISaveTagIntegration extends IAppDataChecks
{
    saveTag(tagName: string): void;
}