
import { RentOfferEntity } from '../../../model/sch.rental/entities/rent-offer.entity';
import { RentOffer_OfferRentItem_Hash } from "../../../model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { OfferRentItemViewModel } from './offer-rent-item.view-model';

export class RentOfferViewModel
{
    private readonly _baseEntity: RentOfferEntity;
    public get isTrue(): boolean { return true; }
    public get title(): string { return this._baseEntity.name as string; }
    public get imageUrl(): string { return 'https://discord.com/channels/1333153060930846781/1356470516369719466/1356470516369719466'; }
    public get applayTags(): string[] { return ['1335377426850516992']; }
    public get id(): number { return this._baseEntity.id as number; }

    public OfferRentItems?: OfferRentItemViewModel[];

    constructor(entity: RentOfferEntity) {
        this._baseEntity = entity;
    }

    public async IncludeOfferRentItmes(this: RentOfferViewModel)
    : Promise<RentOfferViewModel>  
    {
        this.OfferRentItems = [];
        let offerItems =await this._baseEntity.getOfferRentItems(
            new RentOffer_OfferRentItem_Hash());
        offerItems.forEach(x => { this.OfferRentItems!.push(new OfferRentItemViewModel(x)); });
        return this;
    }
}