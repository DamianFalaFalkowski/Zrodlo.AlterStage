import { RentOfferViewModel } from "../../data/modules/rental-data.module/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegrationConsumer } from "../../app/app.modules/host.module/integrations/fill-template-with-data.integration";
import { IRentalInstance, RentalInstance } from "./rental.instance";
import { IRentalViewModelIntegration } from "../../data/modules/rental-data.module/integrations/get-rent-offers-view-model.integration";

export interface IRentalBuilder extends IRentalInstance
{
    UpdateRentalChannels(): Promise<AppModule>; // TODO: przenieść do modułu Host
}

export abstract class RentalBuilder
    extends RentalInstance
    implements 
        IRentalBuilder, 
        IRentalViewModelIntegration, 
        IFillTemplateWithDataIntegrationConsumer
{
    public async UpdateRentalChannels(): Promise<AppModule>
    {
        const viewModels = await this.getAllActiveOffersViewModel();

        return this.As<AppModule>();
    }

    abstract getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>;

    abstract fillTemplateWithData(templateContent: string, data: Record<string, any>): string;
}

