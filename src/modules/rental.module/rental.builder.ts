import { RentOfferViewModel } from "../../data/modules/rental-data.module/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegrationConsumer } from "../../app/app.modules/host.module/integrations/fill-template-with-data.integration";
import { IRentalInstance, RentalInstance } from "./rental.instance";
import { ICreateOrUpdateOfferInChannelIntegrationProvider } from "./integrations/create-or-update-offer-in-channel.integration";

export interface IRentalBuilder extends IRentalInstance
{
    UpdateRentalChannels(afterUpdateRentalChannels: () => void): Promise<AppModule>; // TODO: przenieść do modułu Host
}

export abstract class RentalBuilder
    extends RentalInstance
    implements 
        IRentalBuilder, 
        IFillTemplateWithDataIntegrationConsumer,
        ICreateOrUpdateOfferInChannelIntegrationProvider
{
    public async createOrUpdateOfferInChannel(channelId: string, offerViewModel: RentOfferViewModel): Promise<void>
    {
        let templateContent = await this.getTemplateContentByBid(this._offerTemplateBid);
        let content = this.fillTemplateWithData(templateContent, offerViewModel);
        await this.postThreadInForumChannelIfDoesntExist(channelId, offerViewModel.title, content,offerViewModel.applayTags, offerViewModel.imageUrl);
    }
    abstract postThreadInForumChannelIfDoesntExist(channelId: string, title: string, content: string, applayTags: string[],imageUrl?: string,): Promise<void>;
    public async UpdateRentalChannels(afterUpdateRentalChannels: () => void): Promise<AppModule>
    {
        const viewModels = await this.getAllActiveOffersViewModel();
        viewModels.forEach(async element => {
            await this.createOrUpdateOfferInChannel(this.DjEquipmentRentalChannelId, element);
        });
        afterUpdateRentalChannels();
        return this.As<AppModule>();
    }

    abstract getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>;

    abstract fillTemplateWithData(templateContent: string, data: Record<string, any>): string;

    abstract getTemplateContentByBid(bId: number): Promise<string>;
}

