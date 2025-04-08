
import { RentOfferViewModel } from "../../data/modules/rental-data.module/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegrationConsumer } from "../../app/app.modules/host.module/integrations/fill-template-with-data.integration";
import { RentalBuilder } from "./rental.builder";
import { IRental } from "./rental.instance";
import { IRentalViewModelIntegration } from "../../data/modules/rental-data.module/integrations/get-rent-offers-view-model.integration";

interface IRentalDependency<T extends 
    IRentalViewModelIntegration 
    | IFillTemplateWithDataIntegrationConsumer>
{
    initialize(sqliteDep: T, offerTemplateName: string): AppModule;
}

export class RentalModule<T extends IRentalViewModelIntegration | IFillTemplateWithDataIntegrationConsumer>
    extends RentalBuilder
    implements IRental, IRentalDependency<T>
{
    fillTemplateWithData(templateContent: string, data: Record<string, any>): string
    {
        return (this._dependency as IFillTemplateWithDataIntegrationConsumer).fillTemplateWithData(templateContent, data)
    }
    private _dependency: T;

    private constructor(dependency: T, offerTemplateName: string)
    {
        super(offerTemplateName);
        this._dependency = dependency;
    }
    public async getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>
    {
        return await (this._dependency as IRentalViewModelIntegration).getAllActiveOffersViewModel();
    }
    initialize(sqliteDep: T, offerTemplateName: string): AppModule
    {
        return RentalModule.initialize(sqliteDep, offerTemplateName);
    }
    public static initialize
        <T extends IRentalViewModelIntegration | IFillTemplateWithDataIntegrationConsumer>
    (dependency: T, offerTemplateName: string): RentalModule<T> 
    {
        return new RentalModule<T>(dependency, offerTemplateName)
    }
}