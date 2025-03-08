import { RentItemAviablility } from "./enums/rent-item-aviablility.enum";
import { BaseEntity } from "../_base/_base-entity.model";
import { OfferRentItemEntity } from './offer-rent-item.model';
import { RecievePointEntity } from "./recieve-point.model";
import { RentItemDamageEntity } from './rent-item-damage.model';
import { RentOrderEntity } from "./rent-order.model";
import { DataTypes, Identifier } from "sequelize";
import { ApplicationError } from "../../../app.errors/application.error";
import { RentItem_OfferRentItem_Hash } from "./hash-tables/rent-item-to-offer-rent-item.hash-model";
import { RentItem_RentOrder_Hash } from "./hash-tables/rent-item-to-rent-order.hash-model";

export const RentItemModelName = 'RentItems'
/** Reprezentacja pojedyńczego fizycznego wystąpienia przedmiotu wynajmu. */
export class RentItemEntity extends BaseEntity
{
    /** Unikalny alfa-numeryczny kod przedmiotu wynajmu. Kody umieszczane są na naklejce w celu ułatwienia identyfikacji. 
     * TODO: utworzyć serwis do generowania kodów
    */
    declare code: string;
    /** Unikalny numeryczny kod przedmiotu wynajmu. Jest jednocześnie cyfrowym zapisem kodu kreskowego umieszczonego na naklejce w celu ułatwienia identyfikacji.
     * TODO: utworzyć serwis do generowania barcodów
    */
    declare barcodeNumber: string;
    /** Flaga określająca czy ten przedmiot jest aktualnie wystawiony do wynajmu przez właściciela. Wartością tej flagi moze sterować tylko własciciel przedmiotu. 
     * TODO: zaimplementować polecenie do ustawiania dostępnosci przez wlasciciela.
    */
    declare isDeclaredAvialible: boolean;
    /** Flaga określająca czy przedmiot jest aktualnie uszkodzony. Ta flaga jest ustawiana po aktualizacji uszkodzeń dot. przedmiotu na ich podstawie (jeśli istnieje przynajmniej jedno uszkodzenie to podnieś flagę)
     * TODO: zaimplementować polecenie do usuwania/dodawania uszkodzeń przez właściciela
     */
    declare isDamaged: boolean;
    /** Flaga określająca czy przedmiot jest aktualnie wynajmowany. 
     * TODO: napisać funkcjonalność obsługującą tą flagę
    */
    declare isRented: boolean;

    /** Całkowity zysk wygenerowany przez ten przedmiot. Ta wartość jest doliczana tylko dla przedmiotów głównych oferty. W przypadku wielu głównych przedmiotów zarobiona wartość jest dzielona po równo. Wartość numeryczna określana w polskich złotych.*/
    declare totalAmountEarned: number;
    /** Koszt poniesiony podczas zakupu. Ta wartość jest określana przez właściciela i nie jest wymagana i właściciel moze ją ustawić w dowolnym momencie.
     * TODO: dodać funkcjonalność do aktualizacji tej wartosci.
    */
    declare onBuyAmountSpent?: number;
    /** Całkowity koszt poniesiony z tytułu napraw tego przedmiotu. */
    declare totalAmountSpentOnRepairs: number;

    /** Szacowany czas dostępności przedmiotu w jego domowym punkcie odbioru. To czas który jest potrzebny punktowi odbioru do przygotowania i udostępnienia przedmiotu. */
    declare rentItemAviabilityInHomeRecievePoint: RentItemAviablility;

    /** Identyfikator domowego punktu odbioru przedmiotu wynajmu*/
    declare RentalRecievePointId: Identifier;
    /** Odpytuje bazę i zwraca obiekt domowego punktu odbioru. */
    public async getRecievePoint(): Promise<RecievePointEntity> {
        const rp = await RecievePointEntity.findByPk(this.RentalRecievePointId);
        if (rp !== undefined && rp !== null) return rp;
        throw new ApplicationError(`Required foreginKey 'RentalRecievePointId' with value '${this.RentalRecievePointId} has no corresponding 'RecievePoint' entity.'`);
    }

    /** Odpytuje bazę i zwraca wszystkie przedmioty wynajmu określone w ofertach dla których ten przedmiot jest fizycznym wystąpieniem. */
    public async getOfferRentItems(): Promise<OfferRentItemEntity[]>
    { 
        const offerRentItemIds = (await RentItem_OfferRentItem_Hash.findAll({
            where: { rentItemId: this.id }
        })).filter(x => x.RentalOfferRentItemId);
        return await OfferRentItemEntity.findAll({
            where: { id: { in: offerRentItemIds} }
        });
    }
    /** Odpytuje bazę i zwraca wszystkie uszkodzenia zarejestrowane dla tego przedmiotu. */
    public async getDamages(): Promise<RentItemDamageEntity[]>
    {
        return await RentItemDamageEntity.findAll({
             where: { 'rentItemId': this.id }
        });
    }
    /** Odpytuje bazę i zwraca wszystkie zlecenia w których brał lub bierze udział ten przedmiot. */
    public async getRentOrders(): Promise<RentOrderEntity[]>
    {
        const rentItemIds = (await RentItem_RentOrder_Hash.findAll({
            where: { RentalRentItemId:  this.id }
        })).filter(x => x.RentalRentItemId);
        return await RentOrderEntity.findAll({
            where: { id: { in: rentItemIds} }
        });
    }
}

export const RentItemAttributes = 
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    barcodeNumber: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },
    isAvaliable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isDamaged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isRented: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    totalAmountEarned: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    onBuyAmountSpent: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    totalAmountSpentOnRepairs: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    rentItemAviabilityInHomeRecievePoint: {
        type: DataTypes.ENUM(...Object.values(RentItemAviablility)),
        allowNull: false
    },
    homeRecievePointId: {
       type: DataTypes.INTEGER,
       allowNull: false, 
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
    // from base
}