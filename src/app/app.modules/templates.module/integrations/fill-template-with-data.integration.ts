import { TemplateModel } from "../models/template.model";

export interface IFillTemplateWithDataIntegration
{
    fillTemplateWithData<T>(template: TemplateModel, data: T): Promise<string>
}