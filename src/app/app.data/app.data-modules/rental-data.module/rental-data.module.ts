import { RentOfferRepository } from '../../app.data-model/sch.rental/repositories/rent-offer.repository';
import { RentalDataBuilder } from "./rental-data.builder";
import { IRentalViewModelIntegration } from "./integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "./view-models/rent-offer.view-model";
import { Sequelize } from 'sequelize';
import { IGetContextIntegrationProvider } from '../app-data.module/integrations/get-context.integration';
import { IAppDataChecks } from '../app-data.module/app-data.instance';

interface IRentalDataModuleDependency
{
    initializeRental(
        dependency: 
            IGetContextIntegrationProvider | 
            IAppDataChecks, 
        shouldForceSync: boolean): RentalDataModule
}
export class RentalDataModule 
    extends 
        RentalDataBuilder 
    implements IRentalDataModuleDependency,
        // providing
        IRentalViewModelIntegration
{
    private _dependency: IGetContextIntegrationProvider | IAppDataChecks
    private constructor(appData: IGetContextIntegrationProvider, shouldForceSync: boolean) {
        super(shouldForceSync);
        this._dependency = appData;
    }
    GetContext(): Sequelize
    {
        return (this._dependency as IGetContextIntegrationProvider).GetContext();
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

    public initializeRental(appData: IGetContextIntegrationProvider, shouldForceSync: boolean): RentalDataModule {
        return RentalDataModule.initializeRental(appData, shouldForceSync);
    }
    public static initializeRental(appData: IGetContextIntegrationProvider, shouldForceSync: boolean): RentalDataModule {
        return new RentalDataModule(appData, shouldForceSync)
    }
}
