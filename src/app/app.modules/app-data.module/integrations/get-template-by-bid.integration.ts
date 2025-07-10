export interface IGetTemplateByBidIntegrationConsumer extends IGetTemplateByBidIntegrationProvider {}
export interface IGetTemplateByBidIntegrationProvider extends IGetTemplateByBidIntegration {}
interface IGetTemplateByBidIntegration
{
    getTemplateContentByBid(bId: number): Promise<string>;
}