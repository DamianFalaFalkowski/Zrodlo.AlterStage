import { IRentalDataInstance } from "../../app/app.data/app.data-modules/rental-data.module/rental-data.instance";
import { IRentalViewModelIntegration } from "../../app/app.data/app.data-modules/rental-data.module/integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "../../app/app.data/app.data-modules/rental-data.module/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { IFillTemplateWithDataIntegration } from "../../app/app.modules/templates.module/integrations/fill-template-with-data.integration";
import { TemplateModel } from "../../app/app.modules/templates.module/models/template.model";
import { RentalBuilder } from "./rental.builder";
import { IRental } from "./rental.instance";

interface IRentalDependency<T extends 
    IRentalViewModelIntegration 
    | IFillTemplateWithDataIntegration>
{
    initialize(sqliteDep: T, offerTemplateName: string): AppModule;
}

export class RentalModule<T extends IRentalViewModelIntegration | IFillTemplateWithDataIntegration>
    extends RentalBuilder
    implements IRental, IRentalDependency<T>
{
    fillTemplateWithData<T>(template: TemplateModel, data: T): Promise<string>
    {
        return (this._dependency as IFillTemplateWithDataIntegration).fillTemplateWithData(template, data)
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
        <T extends IRentalViewModelIntegration | IFillTemplateWithDataIntegration>
    (dependency: T, offerTemplateName: string): RentalModule<T> {
            return new RentalModule<T>(dependency, offerTemplateName)
        }
}

const rentalModule = <T extends IRentalViewModelIntegration>(data: T, offerTemplateName: string): RentalModule<T> =>
{
    return RentalModule.initialize(data, offerTemplateName);
}