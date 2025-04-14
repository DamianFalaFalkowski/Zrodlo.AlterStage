
import { RentOfferViewModel } from "../../data/modules/rental-data.module/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegrationConsumer } from "../../app/app.modules/host.module/integrations/fill-template-with-data.integration";
import { RentalBuilder } from "./rental.builder";
import { IRental } from "./rental.instance";
import { IRentalViewModelIntegrationProvider } from "../../data/modules/rental-data.module/integrations/get-rent-offers-view-model.integration";
import { IGetTemplateByBidIntegrationConsumer, IGetTemplateByBidIntegrationProvider } from "../../app/app.data/app.data-modules/app-data.module/integrations/get-template-by-bid.integration";
import { IPostThreadInForumChannelIntegrationConsumer, IPostThreadInForumChannelIntegrationProvider } from "../../app/app.modules/host.module/integrations/post-thread-in-forum-channel.integration";
import { IGetClientIntegration } from '../../app/app.modules/host.module/integrations/get-client.host.integration';

interface IRentalDependency<T extends IRentalViewModelIntegrationProvider , U extends IPostThreadInForumChannelIntegrationConsumer | IFillTemplateWithDataIntegrationConsumer | IGetClientIntegration
    , Z extends IGetTemplateByBidIntegrationConsumer>
{
    initialize(sqliteDep: T, hostDep: U, appDataDep: Z, offerTemplateBid: number, djEquipmentRentalChannelId: string): AppModule;
}

export class RentalModule<T extends IRentalViewModelIntegrationProvider , U extends IPostThreadInForumChannelIntegrationConsumer | IFillTemplateWithDataIntegrationConsumer | IGetClientIntegration
    , Z extends IGetTemplateByBidIntegrationConsumer>
    extends RentalBuilder
    implements IRental, IRentalDependency<T, U, Z>
{
    RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void {
        return (this._dependencyHost! as IGetClientIntegration).RegisterCommandHandlers(commandHandlersFolderPaths);
    }
    
    fillTemplateWithData(templateContent: string, data: Record<string, any>): string
    {
        return (this._dependencyHost as IFillTemplateWithDataIntegrationConsumer).fillTemplateWithData(templateContent, data)
    }
    postThreadInForumChannelIfDoesntExist(channelId: string, title: string, content: string, applayTags: string[], imageUrl?: string): Promise<void>{
        return (this._dependencyHost as IPostThreadInForumChannelIntegrationConsumer).postThreadInForumChannelIfDoesntExist(channelId, title, content, applayTags, imageUrl);
    }
    private _dependency: T;
    private _dependencyHost: U;
    private _dependencyAppData: Z;

    private constructor(dependency: T, dependencyHost: U, dependencyAppData: Z, offerTemplateBid: number, djEquipmentRentalChannelId: string)
    {
        super(offerTemplateBid, djEquipmentRentalChannelId);
        this._dependency = dependency;
        this._dependencyHost = dependencyHost;
        this._dependencyAppData = dependencyAppData;
    }

    public async getTemplateContentByBid(bId: number): Promise<string>{
        return (this._dependencyAppData as IGetTemplateByBidIntegrationProvider).getTemplateContentByBid(bId);
    }
    public async getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>
    {
        return await (this._dependency as IRentalViewModelIntegrationProvider).getAllActiveOffersViewModel();
    }
    initialize(sqliteDep: T, dependencyHost: U, dependencyAppData: Z, offerTemplateBid: number, djEquipmentRentalChannelId: string): AppModule
    {
        return RentalModule.initialize(sqliteDep, dependencyHost, dependencyAppData, offerTemplateBid, djEquipmentRentalChannelId);
    }
    public static initialize
        <T extends IRentalViewModelIntegrationProvider , U extends IPostThreadInForumChannelIntegrationConsumer | IFillTemplateWithDataIntegrationConsumer | IGetClientIntegration
    , Z extends IGetTemplateByBidIntegrationConsumer>
    (dependency: T, dependencyHost: U, dependencyApData: Z, offerTemplateBid: number, djEquipmentRentalChannelId: string): RentalModule<T, U, Z> 
    {
        return new RentalModule<T, U, Z>(dependency, dependencyHost, dependencyApData, offerTemplateBid, djEquipmentRentalChannelId);
    }
}

const rentalModule = <T extends IRentalViewModelIntegrationProvider , U extends IPostThreadInForumChannelIntegrationConsumer | IFillTemplateWithDataIntegrationConsumer
    , Z extends IGetTemplateByBidIntegrationConsumer>
    (host: T, dependencyHost: U, dependencyAppData: Z, offerTemplateBid: number, djEquipmentRentalChannelId: string): RentalModule<T,U,Z> => 
{
    return RentalModule.initialize(host, dependencyHost, dependencyAppData, offerTemplateBid, djEquipmentRentalChannelId);
}
export default rentalModule;