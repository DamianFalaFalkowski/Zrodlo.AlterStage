
import { RentOfferEntity } from '../../../model/sch.rental/entities/rent-offer.entity';
import { RentOffer_OfferRentItem_Hash } from "../../../model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { OfferRentItemViewModel } from './offer-rent-item.view-model';

export class RentOfferViewModel
{
    private readonly _baseEntity: RentOfferEntity;
    public get title(): string { return this._baseEntity.name as string; }
    public get imageUrl(): string { return ""; }
    public get applayTags(): string[] { return [""]; }
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