import { IRentalViewModelIntegration } from "../../app/app.data/app.data-modules/app-data.sqlite/integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "../../app/app.data/app.data-modules/app-data.sqlite/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IRentalInstance, RentalInstance } from "./rental.instance";

export interface IRentalBuilder extends IRentalInstance
{
    UpdateRentalChannels(): Promise<AppModule>;
}

export abstract class RentalBuilder
    extends RentalInstance
    implements IRentalBuilder, IRentalViewModelIntegration
{
    public async UpdateRentalChannels(): Promise<AppModule>
    {
        const viewModels = await this.getAllActiveOffersViewModel();

        return this.As<AppModule>();
    }

    abstract getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>
}

