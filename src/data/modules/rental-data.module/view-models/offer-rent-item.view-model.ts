import { OfferRentItemEntity } from '../../../model/sch.rental/entities/offer-rent-item.entity';
export class OfferRentItemViewModel
{

    constructor(offerRentItemEntity: OfferRentItemEntity) {
        this.name = offerRentItemEntity.itemName;
    }
    public name: string;
}