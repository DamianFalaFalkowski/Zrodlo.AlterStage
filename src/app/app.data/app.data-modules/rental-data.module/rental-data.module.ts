import { RentOfferRepository } from '../../app.data-model/sch.rental/repositories/rent-offer.repository';
import { SqliteBuilder } from "./rental-data.builder";
import { IRentalDataChecks } from "./rental-data.instance";
import { IRentalViewModelIntegration } from "./integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "./view-models/rent-offer.view-model";
import { Sequelize } from 'sequelize';
import { AppDataModule } from '../app-data.module/app-data.module';

interface IRentalDataDependency
{
   initializeRental(appData: AppDataModule): RentalDataModule
}
export class RentalDataModule 
    extends 
        SqliteBuilder 
    implements 
        IRentalViewModelIntegration,
        IRentalDataChecks,
        IRentalDataDependency
{
    private _dependency: AppDataModule
    get context(): Sequelize
    {
        return this._dependency.context!;
    }
    isContextSetUp(): boolean
    {
        throw new Error('Method not implemented.');
    }
    private constructor(appData: AppDataModule) {
        super();
        this._dependency = appData;
    }
    public async getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>
    {
        const activeOffersEntities = await RentOfferRepository.getAllActiveWithRelations();
        let activeOffersViewModels: RentOfferViewModel[] = [];
        for (let index = 0; index < activeOffersEntities.length; index++) {
            const offerEntity = activeOffersEntities[index];
            activeOffersViewModels.push(
                await (new RentOfferViewModel(offerEntity)).IncludeOfferRentItmes()
            );
        }
        return activeOffersViewModels;
    }

    public initializeRental(appData: AppDataModule): RentalDataModule {
        return RentalDataModule.initializeRental(appData);
    }
    public static initializeRental(appData: AppDataModule): RentalDataModule {
        return new RentalDataModule(appData)
    }
}

const rentalDataModule = (appData: AppDataModule):RentalDataModule => {
    return RentalDataModule.initializeRental(appData);
}
export default rentalDataModule;
