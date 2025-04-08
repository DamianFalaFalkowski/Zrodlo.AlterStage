import { OfferRentItemEntity } from '../../../model/sch.rental/entities/offer-rent-item.entity';
export class OfferRentItemViewModel
{
    private readonly _baseEntity: OfferRentItemEntity;

    constructor(offerRentItemEntity: OfferRentItemEntity) {
        this._baseEntity = offerRentItemEntity;
    }
    public get name(): string { 
        return this._baseEntity.itemName;
    }
}