import { RentOfferViewModel } from "../../../data/modules/rental-data.module/view-models/rent-offer.view-model";

export interface ICreateOrUpdateOfferInChannelIntegrationConsumer extends ICreateOrUpdateOfferInChannelIntegrationProvider {}
export interface ICreateOrUpdateOfferInChannelIntegrationProvider extends ICreateOrUpdateOfferInChannelIntegration {}
interface ICreateOrUpdateOfferInChannelIntegration
{
    createOrUpdateOfferInChannel(
        channelId: string, offerViewModel: RentOfferViewModel
    ): Promise<void>;
}