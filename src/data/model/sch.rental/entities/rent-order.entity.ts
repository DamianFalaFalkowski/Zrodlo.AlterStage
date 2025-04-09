import { DataTypes, FindOptions, Identifier, INTEGER, ModelStatic } from "sequelize";
import { AddressEntity } from "./address.entity";
import { CustomerDiscountHistoryEntity } from "./customer-discount-history.entity";
import { CustomerEntity } from "./customer.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderDeliveryEntity } from "./order-delivery.entity";
import { RentItemDamageEntity } from "./rent-item-damage.entity";
import { RentOfferEntity } from "./rent-offer.entity";
import { RecievePointEntity } from "./recieve-point.entity";
import { RentOffer_RentOrder_Hash } from "../hash-tables/rent-offer-to-rent-order.hash-entity";
import { RentItem_RentOrder_Hash } from "../hash-tables/rent-item-to-rent-order.hash-entity";
import { RentItemEntity } from "./rent-item.entity";
import { BaseEntity } from "../../../../app/app.data/app.data-model/_base/_base.entity";
import { propertyOf } from "../../../../utils/type-properties.util";

export const RentOrderModelName = 'RentOrders'

/** 
 * * Reprezentacja zlecenia najmu */
export class RentOrderEntity extends BaseEntity 
{
/** ....
** .... */ 
    public readonly entityName: string = RentOrderModelName;

/** Status zlecenia najmu/** ....
** .... */ 
    declare status: OrderStatus;

/** Aktualna zapłacona kwota za zlecenie najmu, bez kaucji/** ....
** .... */ 
    declare currentPayedAmount: number;

/** Całkowita kwota nalezna za zlecenie, bez kaucji i po uwzględnieniu rabatów. Wartość 'null' moze występować tylko dla statusu CREATED /** ....
** .... */ 
    declare totalCost?: number;

/** Całkowita zrabatowana kwota /** ....
** .... */ 
    declare discountAmount: number;

/** Procent VAT /** ....
** .... */ 
    declare taxPercent?: number;

/** Wartość podatku VAT w złotówkach /** ....
** .... */ 
    declare taxAmount?: number;

/** Całkowita kwota depozytu za przedmioty najmu w zleceniu /** ....
** .... */ 
    declare depositeAmount?: number;

/** Aktualna wartość przetrzymywanej kaucji. Kaucja w pierwszej kolejnosci opłaca naprawy, następnie najem a pozostała kwota powinna być zwrócona na konto klienta. /** ....
** .... */ 
    declare currentOnHoldDepositeAmount: number;

/** Aktualna wartość zwróconego depozytu (bez uwzględnienia rekompensat za uszkodzenia i kosztu najmu) /** ....
** .... */ 
    declare depositeReturnedAmount: number;

/** Całkowity koszt naprawy uszkodzeń /** ....
** .... */ 
    declare damagesFixingCost?: number;

/** Wartość znizki udzielonej dla kaucji 
** .... */ 
    declare dipositeDiscountAmount?: number;

/** Data i godzina zaplanowanego początku najmu 
** .... */ 
    declare rentPeriodFrom?: Date;

/** Data i godzina zaplanowanego końca najmu 
** .... */ 
    declare rentPeriodUntil?: Date;

/** Flaga określająca czy zlecenie zawiera usługę dostawy 
** .... */ 
    declare hasDelivery?: boolean;

/** Data i godzina po której najwczesniej mozna dostarczyć zamówienie do miejsca docelowego  
** .... */ 
    declare deliveryAfter?: Date;

/** Flaga określająca czy zlecenie zawiera usługę obsługi sprzętu  
** .... */ 
    declare hasOperator?: boolean;

/** Ilość zamówionego czasu obsługi sprzętu wyrazona w godzinach  
** .... */ 
    declare operatorRequestedHours?: number;

/** Ilość dokupionego czasu obsługi sprzętu wyrazona w godzinach  
** .... */ 
    declare operatorExtraHours?: number;

/** Flaga określająca czy zlecenie zawiera usługę montarzu sprzętu  
** .... */ 
    declare hasMontage?: boolean;

/** Flaga określająca czy zlecenie zawiera usługę demontarzu sprzętu  
** .... */ 
    declare hasDemontage?: boolean;

/** Flaga określająca czy przedmioty najmu zostały zwrócone/odebrane od klienta */
    declare areItemsReturned: boolean;

/** Flaga określająca czy płatność za najem, naprawę uszkodzen i usługi została zrealizowana  
** .... */ 
    declare isPaymentDone: boolean;

/** Flagsa określająca czy depozyt został w całości zwrócony klientowi 
** ....  
** .... */ 
    declare isDepositeReturned: boolean;

// TODO: metody wyciągające kolekcje i brakujące opisy

/** Flaga określająca czy płatność za najem, naprawę uszkodzen i usługi została zrealizowana  
** .... 
*? Relacja [..]-1
*? FK   */ 

    declare RentalRecievePointId: Identifier;
    public async getRecievePoint(): Promise<RecievePointEntity>
    {
        return this.getOwnedEntity<RecievePointEntity>(
            RecievePointEntity, 
            this.RentalRecievePointId, 
            propertyOf<RentOrderEntity>('RentalRecievePointId'));
    };

/** .... 
** .... 
*? Relacja [..]-1
*? FK   */ 
    declare RentalCustomerId: Identifier;
    public async getCustomer(): Promise<CustomerEntity> {
        return this.getOwnedEntity(CustomerEntity, 
            this.RentalCustomerId, 
            propertyOf<RentOrderEntity>('RentalCustomerId'));
    };

/** .... 
** .... 
*? Relacja [..]-1*/ 
    declare RentalOrderDeliveryId: number;
    public async getOrderDelivery(): Promise<OrderDeliveryEntity> 
    {
        return await this.getOwnedEntity(
            OrderDeliveryEntity, 
            this.RentalOrderDeliveryId, 
            propertyOf<RentOrderEntity>('RentalOrderDeliveryId'));
    };

/**
** OK 
*? Relacja 1-[..] */ 
    public async getItemDamages(): Promise<RentItemDamageEntity[] | null>
    {
        return await RentItemDamageEntity.findAll(
            { where: { RentalOfferRentItemId: this.id } });
    }

/**
** Oferty wchodzące w skład zlecenia najmu. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getRentOffers<RentOfferEntity>(repository: RentOffer_RentOrder_Hash)
        : Promise<RentOfferEntity[]>
    {
        return (await repository.getRelated(RentOfferEntity, this.id)) as unknown as RentOfferEntity[];
    }

/**
** Elementy oferty wchodzące w skład zlecenia. 
* ? Relacja [..]-[..]
* ? ZWERYFIKOWAĆ DZIAŁANIE */
    public async getRentItems<RentItemEntity>(repository: RentItem_RentOrder_Hash)
        : Promise<RentItemEntity[]>
    {
        return (await repository.getRelated(RentItemEntity, this.id)) as unknown as RentItemEntity[];
    }

/**
** OK 
*? Relacja 1-[..] */ 
    public async getAppliedDiscounts(): Promise<CustomerDiscountHistoryEntity[] | null>
    {
        return await CustomerDiscountHistoryEntity.findAll(
            { where: { RentalCustomerDiscountHistoryd: this.id } });
    }
}



export const RentOrderAttributes = {
    // pk
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // fks
    RentalRecievePointId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalOrderDeliveryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // columns
    status: {
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
        defaultValue: OrderStatus.CREATED
    },
    currentPayedAmount: {
        type: DataTypes.DECIMAL, // TODO: PILNE! wszystkie zmienne związane z finansami powinny uzywać typu DECIMAL w db
        allowNull: false,
        defaultValue: 0
    },
    totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    discountAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    taxPercent: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    taxAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    depositeAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    currentOnHoldDepositeAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    depositeReturnedAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    damagesFixingCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    dipositeDiscountAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    rentPeriodFrom: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    rentPeriodUntil: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    hasDelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    deliveryAfter: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    hasOperator: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    operatorRequestedHours: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    operatorExtraHours: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    hasMontage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    hasDemontage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    areItemsReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isPaymentDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDepositeReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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