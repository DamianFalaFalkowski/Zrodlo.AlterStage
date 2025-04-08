import { RentalDataBuilder } from "./rental-data.builder";
import { IRentalViewModelIntegrationProvider } from "./integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "./view-models/rent-offer.view-model";
import { Sequelize } from 'sequelize';
import { IGetContextIntegrationProvider } from '../../../app/app.data/app.data-modules/app-data.module/integrations/get-context.integration';
import { IAppDataChecks } from '../../../app/app.data/app.data-modules/app-data.module/app-data.instance';
import { RentOfferRepository } from "../../model/sch.rental/repositories/rent-offer.repository";
import { IPostThreadInForumChannelIntegrationConsumer } from "../../../app/app.modules/host.module/integrations/post-thread-in-forum-channel.integration";

interface IRentalDataModuleDependency
{
    initializeRental(
        dependency: 
            IGetContextIntegrationProvider | 
            IAppDataChecks |
            IPostThreadInForumChannelIntegrationConsumer, 
        shouldForceSync: boolean): RentalDataModule
}
export class RentalDataModule 
    extends 
        RentalDataBuilder 
    implements IRentalDataModuleDependency,
        // providing
        IRentalViewModelIntegrationProvider
{
    private _dependency: IGetContextIntegrationProvider | IAppDataChecks | IPostThreadInForumChannelIntegrationConsumer
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
