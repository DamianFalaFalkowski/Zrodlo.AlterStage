import { IAppDataChecks } from "../../app-data.module/app-data.instance";

export interface ISaveTagIntegrationProvider extends ISaveTagIntegration {}
export interface ISaveTagIntegrationConsumer extends ISaveTagIntegration {}
interface ISaveTagIntegration
{
    saveTag(tagName: string): void;
}