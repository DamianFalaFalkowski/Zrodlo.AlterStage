import { ISqliteInstance } from "../../app/app.data/app.data-modules/app-data.sqlite/app-data.sqlite.instance";
import { IRentalViewModelIntegration } from "../../app/app.data/app.data-modules/app-data.sqlite/integrations/get-rent-offers-view-model.integration";
import { RentOfferViewModel } from "../../app/app.data/app.data-modules/app-data.sqlite/view-models/rent-offer.view-model";
import { AppModule } from "../../app/app.modules/app.module";
import { RentalBuilder } from "./rental.builder";
import { IRental } from "./rental.instance";

interface IRentalDependency<T extends IRentalViewModelIntegration>
{
    initialize(sqliteDep: T): AppModule;
}

export class RentalModule<T extends IRentalViewModelIntegration>
    extends RentalBuilder
    implements IRental, IRentalDependency<T>
{
    private _sqliteDep: T;

    private constructor(sqliteDep: T)
    {
        super();
        this._sqliteDep = sqliteDep;
    }
    public async getAllActiveOffersViewModel(): Promise<RentOfferViewModel[]>
    {
        return await this._sqliteDep!.getAllActiveOffersViewModel();
    }
    initialize(sqliteDep: T): AppModule
    {
        return RentalModule.initialize((sqliteDep));
    }
    public static initialize<T extends IRentalViewModelIntegration>(dependency: T): RentalModule<T> {
            return new RentalModule<T>(dependency)
        }
}

const rentalModule = <T extends IRentalViewModelIntegration>(data: T): RentalModule<T> =>
{
    return RentalModule.initialize(data)
}