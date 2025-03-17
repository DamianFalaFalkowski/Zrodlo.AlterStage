import { RentItemAviablility } from './enums/rent-item-aviablility.enum';
import { BaseEntity } from "../_base/_base.entity";
import { OfferRentItemEntity } from './offer-rent-item.entity';
import { OfferDiscountEntity } from './offer-discount.entity';
import { OfferInfoEntity } from './offer-info.entity';
import { RecievePointEntity } from './recieve-point.entity';
import { OrderDeliveryEntity } from './order-delivery.entity';
import { BelongsToMany, DataTypes, HasMany, Model, ModelStatic } from 'sequelize';
import { RentOffer_RentOrder_Hash } from './hash-tables/rent-offer-to-rent-order.hash-entity';
import { BaseHashEntity } from '../_base/_base.hash-entity';
import { RentOrderEntity } from './rent-order.entity';
import { RentOffer_OfferRentItem_Hash } from './hash-tables/rent-offer-to-offer-rent-item.hash-entity';
import { RentOffer_RecievePoint_Hash } from './hash-tables/rent-order-to-recieve-point.hash-entity';
import { RentOffer_OfferDiscount_Hash } from './hash-tables/rent-offer-to-offer-discount.hash-entity';

export const RentOfferModelName = 'RentOffers'

// TODO: rozkminić czy rabaty powinny byc naliczane zawsze od kwoty bazowej czy kazdy rabat powinien byc naliczany od kwoty po poprzednim rabacie?
export class RentOfferEntity 
    extends BaseEntity 
{
    // TODO: prsawdopodobnie brakuje czesci pol - sprawdzic to
    // TODO: dodać opisy
    public readonly entityName: string = RentOfferModelName;

    declare name: string;
    declare description: string;
    declare totalPrice: number;
    declare totalDepositPrice: number;
/** czy aktywna
** Określa czy oferta jest aktualnie w ofercie */
    declare isActive: boolean;

// TODO: zaimplementowac gettery

/**
** Oferty wchodzące w skład zlecenia najmu. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getOfferRentItems(repository: RentOffer_OfferRentItem_Hash): Promise<OfferRentItemEntity[]>
    {
        return (await repository.getRelated(OfferRentItemEntity, this.id)) as unknown as OfferRentItemEntity[];
    }

/**
** Punkty odbioru świadczące tą ofertę najmu. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getRecievePoints(repository: RentOffer_RecievePoint_Hash) : Promise<RecievePointEntity[]>
    {
        return (await repository.getRelated(RecievePointEntity, this.id)) as unknown as RecievePointEntity[];
    }

/**
** Punkty odbioru świadczące tą ofertę najmu. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getOfferDiscounts(repository: RentOffer_OfferDiscount_Hash) : Promise<OfferDiscountEntity[]>
    {
        return (await repository.getRelated(OfferDiscountEntity, this.id)) as unknown as OfferDiscountEntity[];
    }

/** Pobierz infortmacje o ofercie.
** Pobiera wszystkie dostępne informacje dot. oferty
** Zwraca: Promise<OfferInfoEntity[] | null>
** Relacja 1-[..] */ 
    public async getOfferInfos(): Promise<OfferInfoEntity[] | null>
    {
        return await OfferInfoEntity.findAll(
            { where: { RentalOfferRentItemId: this.id } });
    }

/**
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getRentOrders<RentOrderEntity>(repository: RentOffer_RentOrder_Hash)
        : Promise<RentOrderEntity[]>
    {
        return (await repository.getRelated(RentOrderEntity, this.id)) as unknown as RentOrderEntity[];
    }
}

export const RentOfferAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    // (dodaj tutaj klucze obce, jeśli są potrzebne)

    // columns
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    totalDepositPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },

    // from base
    createdAt: {
        type: DataTypes.DATE,
        secondaryKey: true,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    updatedDiscordUserId: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};