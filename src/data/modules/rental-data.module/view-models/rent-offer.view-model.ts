
import { OfferRentItemEntity } from '../../../model/sch.rental/entities/offer-rent-item.entity';
import { RentOfferEntity } from '../../../model/sch.rental/entities/rent-offer.entity';
import { RentOffer_OfferRentItem_Hash } from "../../../model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { OfferRentItemViewModel } from './offer-rent-item.view-model';

export class RentOfferViewModel
{
    private readonly _baseEntity: RentOfferEntity;
    public get title(): string { return this._baseEntity.name as string; }
    public get totalPrice(): number { return this._baseEntity.totalPrice; }
    public get depositPrice(): number { return this._baseEntity.totalDepositPrice; }
    public get imageUrl(): string | undefined { return this._baseEntity.imageUrl; }
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
        let offerItems =(await this._baseEntity.getOfferRentItems(
            new RentOffer_OfferRentItem_Hash()));
        for (let index = 0; index < offerItems.length; index++) {
            this.OfferRentItems.push(new OfferRentItemViewModel((offerItems[index] as unknown as OfferRentItemEntity[])[0]));
        }
        return this;
    }
}