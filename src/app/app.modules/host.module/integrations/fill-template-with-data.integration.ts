import { TemplateModel } from "../model/template.model";

export interface IFillTemplateWithDataIntegrationConsumer extends IFillTemplateWithDataIntegration {}
export interface IFillTemplateWithDataIntegrationProvider extends IFillTemplateWithDataIntegration {}
interface IFillTemplateWithDataIntegration
{
    fillTemplateWithData<T>(template: TemplateModel, data: T): Promise<string>;
}