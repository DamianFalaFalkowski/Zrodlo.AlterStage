import { TagsEntity } from "../../app.data-model/sch.app/tags.entity";
import { RentOffer_OfferRentItem_Hash } from "../../app.data-model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { RentOfferEntity } from "../../app.data-model/sch.rental/rent-offer.entity";
import { RentOfferRepository } from '../../app.data-model/sch.rental/repositories/rent-offer.repository';
import { SqliteBuilder } from "./rental-data.builder";
import { ISqlite } from "./rental-data.instance";
import { IRentalViewModelIntegration } from "./integrations/get-rent-offers-view-model.integration";
import { ISaveTagIntegration } from "./integrations/save-tag.sqlite.integration";
import { RentOfferViewModel } from "./view-models/rent-offer.view-model";

export class SqliteModule 
    extends 
        SqliteBuilder 
    implements 
        ISaveTagIntegration,
        IRentalViewModelIntegration,
        ISqlite
{
    private constructor() {
        super();
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

    async saveTag(tagName: string): Promise<void> {
        await TagsEntity.create({
                        name: tagName,
                        description: 'version tag',
                        userId: 0,
                        createdUserId: 0
                    });
    }
    public initialize(): SqliteModule {
        return SqliteModule.initialize();
    }
    public static initialize(): SqliteModule {
        return new SqliteModule()
    }
}

const sqliteModule: SqliteModule = SqliteModule.initialize();

export default sqliteModule;
