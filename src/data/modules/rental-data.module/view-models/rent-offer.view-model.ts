import { RentOfferEntity } from '../../../model/sch.rental/entities/rent-offer.entity';
import { RentOffer_OfferRentItem_Hash } from "../../../model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { OfferRentItemViewModel } from './offer-rent-item.view-model';
import { translateRentItemAviabilityToPolish } from '../../../model/sch.rental/enums/rent-item-aviablility.enum';
import { RentOffer_RecievePoint_Hash } from '../../../model/sch.rental/hash-tables/rent-offer-to-recieve-point.hash-entity';
import { RecievePointEntity } from '../../../model/sch.rental/entities/recieve-point.entity';

export class RentOfferViewModel
{
    private readonly _baseEntity: RentOfferEntity;
    public get title(): string { return this._baseEntity.name as string; }
    public get totalPrice(): number { return this._baseEntity.totalPrice; }
    public get depositPrice(): number { return this._baseEntity.totalDepositPrice; }
    public get standardDeliveryPrice(): number { return 20; } // TODO: uzupełnić prawdziwymi danymi
    public get imageUrl(): string | undefined { return this._baseEntity.imageUrl; }
    public get applayTags(): string[] { return ['1335377426850516992']; } // TODO: obsługa tagów
    public get id(): number { return this._baseEntity.id as number; }
    public get contactPhone(): string { return this.HomeRecievePoint!.phoneNumber; }
    public get contactEmail(): string { return this.HomeRecievePoint!.email; }
    public get description(): string { return this._baseEntity.description; }

    public get lastUpdateDate(): Date { return this._baseEntity.updatedAt ?? this._baseEntity.createdAt; }

    public DeliveryInfos?: Array<{ infoMessage: string; }>; // TODO: wypełnić danymi
    public OfferDisscounts?: Array<{ infoMessage: string; }>; // TODO: wypełnić danymi (odłozone na pozniej)
    public OfferInfos?: Array<{ infoMessage: string; }>;
    public OfferRentItems?: OfferRentItemViewModel[];
    public HomeRecievePoint?: RecievePointEntity;
    public recievePointAviabilities?: Array<{
        recievePointAviability: string,
        cities: string;
    }>;

    constructor(entity: RentOfferEntity)
    {
        this._baseEntity = entity;
    }

    public async IncludeRecievePointsAviabilities(this: RentOfferViewModel): Promise<RentOfferViewModel>  
    {
        this.recievePointAviabilities = new Array<{
            recievePointAviability: string,
            cities: string;
        }>();
        let recievePoints = await this._baseEntity.getRecievePoints(new RentOffer_RecievePoint_Hash());

        for (let index = 0; index < recievePoints.length; index++)
        {
            let rpe = await RecievePointEntity.findByPk(recievePoints[index].id);
            let di = await rpe!.getDeliveryInfo();
            let avblties = this.recievePointAviabilities.find(x => x.recievePointAviability == translateRentItemAviabilityToPolish(di.baseRentItemsAviability));
            if (avblties)
            {
                avblties.cities += `, ${(await rpe!.getAddress()).city})}`;
                continue;
            }
            this.recievePointAviabilities.push({
                recievePointAviability: translateRentItemAviabilityToPolish(di.baseRentItemsAviability),
                cities: (await rpe!.getAddress()).city
            });
        }
        return this;
    }

    public async IncludeOfferInfos(this: RentOfferViewModel)
        : Promise<RentOfferViewModel>  
    {
        this.OfferInfos = [];
        let offerInfos = await this._baseEntity.getOfferInfos();
        for (let index = 0; index < offerInfos!.length; index++)
        {
            this.OfferInfos.push({ infoMessage: offerInfos![index].infoMessage });
        }
        return this;
    }

    public async IncludeOfferRentItmesAndHomeRecievePoint(this: RentOfferViewModel)
        : Promise<RentOfferViewModel>  
    {
        this.OfferRentItems = [];
        let offerItems = await this._baseEntity.getOfferRentItems(
            new RentOffer_OfferRentItem_Hash());
        this.HomeRecievePoint = (await RecievePointEntity.findByPk(offerItems.find(x => x.isMainRentItem)?.id)) ?? undefined;
        for (let index = 0; index < offerItems.length; index++)
        {
            this.OfferRentItems.push(new OfferRentItemViewModel(offerItems[index]));
        }
        return this;
    }
}