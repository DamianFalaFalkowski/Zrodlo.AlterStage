import { RentOfferViewModel } from "../view-models/rent-offer.view-model";


export interface IRentalViewModelIntegration
{
    getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>;
}