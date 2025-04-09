import { RentOfferViewModel } from "../view-models/rent-offer.view-model";

export interface IRentalViewModelIntegrationConsumer extends IRentalViewModelIntegrationProvider {}
export interface IRentalViewModelIntegrationProvider extends IRentalViewModelIntegration {}
interface IRentalViewModelIntegration
{
    getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>;
}