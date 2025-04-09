export interface IFillTemplateWithDataIntegrationConsumer extends IFillTemplateWithDataIntegrationProvider {}
export interface IFillTemplateWithDataIntegrationProvider extends IFillTemplateWithDataIntegration {}
interface IFillTemplateWithDataIntegration
{
    fillTemplateWithData(templateContent: string, data: Record<string, any>): string;
}