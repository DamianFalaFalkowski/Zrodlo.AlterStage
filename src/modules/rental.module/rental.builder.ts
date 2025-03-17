import { IRentalViewModelIntegration } from "../../app/app.data/app.data-modules/app-data.sqlite/integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "../../app/app.data/app.data-modules/app-data.sqlite/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegration } from "../../app/app.modules/templates.module/integrations/fill-template-with-data.integration";
import { TemplateModel } from "../../app/app.modules/templates.module/models/template.model";
import { IRentalInstance, RentalInstance } from "./rental.instance";

export interface IRentalBuilder extends IRentalInstance
{
    UpdateRentalChannels(): Promise<AppModule>; // TODO: przenieść do modułu Host
}

export abstract class RentalBuilder
    extends RentalInstance
    implements 
        IRentalBuilder, 
        IRentalViewModelIntegration, 
        IFillTemplateWithDataIntegration
{
    public async UpdateRentalChannels(): Promise<AppModule>
    {
        const viewModels = await this.getAllActiveOffersViewModel();

        return this.As<AppModule>();
    }

    abstract getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>;

    abstract fillTemplateWithData<T>(templateId: TemplateModel, data: T): Promise<string>;
}

