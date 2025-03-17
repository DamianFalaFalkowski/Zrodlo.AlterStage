import { OfferRentItemViewModel } from "./offer-rent-item.view-model";
import { RentOfferEntity } from '../../../app.data-model/sch.rental/rent-offer.entity';
import { RentOffer_OfferRentItem_Hash } from "../../../app.data-model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";

export class RentOfferViewModel
{
    private readonly _baseEntity: RentOfferEntity;
    public get id(): number { return this._baseEntity.id as number; }

    public OfferRentItems?: OfferRentItemViewModel[];

    constructor(entity: RentOfferEntity) {
        this._baseEntity = entity;
    }

    public async IncludeOfferRentItmes(this: RentOfferViewModel)
    : Promise<RentOfferViewModel>  
    {
        this.OfferRentItems = 
            await this._baseEntity.getOfferRentItems(
                new RentOffer_OfferRentItem_Hash());
        return this;
    }
}