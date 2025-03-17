export enum OfferDeliveryActionType 
{
/* 
    DETERMINE_AVIABILITY zawiera:
        - okreslenie dostepnosci osoby do wykonania jakiejś akcji lub sprzętu w określonym przedziale czasowym i miejscu w maksymalnie 24 godziny
        - niewykonanie akcji w okreslonym terminie lub notoryczne braki dostepnosci mogą wpłynąć na usunięcie uczestnika z programu
    * brak rekompensaty
    * akcja wymagana w max 24h


    STATIONARY_... to:
        - określenie akcji jako do wykonania pod adresem punktu odbioru


    SELF_... to:
        - określenie akcji jako do wykonania pod adresem odbioru wskazanym przez klienta
    * rekompensata zgodna z ustalonymi stawkami dostawy w punkcie odbioru


    ...HANDOVER_TO_CUSTOMER zawiera:
        - sprawdzenie kompletnosci zamówienia
        - sprawdzenie zgodnosci uszkodzeń i wypelnienie protokołu zdawczo odbiorczego w 2 kopiach
        - weryfikację ze zdjęciem na discord (o ile dostepne)
        - weryfikację ze zdjeciem w dowodzie osobistym / paszporcie
        - spisanie numeru dowodu osobistego lub numeru paszportu do 2 kopii umowy najmu
        - zebranie wymaganych podpisów klienta na umowie i innych wymaganych dokumentach
    * rekompensatra na wysokości 2,5% wartości najmu netto


    SENDING/RECIEVEING_CONDUCTOR_SHIPMENT zawiera:
        - załoenie plomb na case tak, aby wyjęcie przedmiotów było niemoliwe bez zdjęcia plomby w przypadku wysyłki lub sprawdzenie czy plomby nie zostały zerwane. jeśli którakolwiek z plomb została zerwana lub nie wszystkie kieszenie/zamki są zaplombowane nalezy sprawdzic zgodnosc zawartosci przesylki z okresloną w akcji
        - jeśli przesyłka nie jedzie w dalszą drogę pociągiem - upewnienie się, ze zawartość przesyłki jest zgodna z określoną w akcji
        - nadanie/odbiór przesyłki konduktorskiej z określonej stacji, o okreslonej godzinie i z/do określonego numeru składu
    * rekompensata ...


    MONTAGE zawiera:
        - ...
    * rekompensata ...


    OPERATOR zawiera:
        - ...
    * rekompensata ...


    DEMONTAGE zawiera:
        - ...
    * rekompensata ...


    ...EQUIPMENT_RETURN zawiera:
        - sprawdzenie kompletnosci zwracanego sprzętu
        - sprawdzenie zgodnosci uszkodzeń i wypelnienie protokołu zdawczo odbiorczego w 2 kopiach
        - jesli są nowe uszkodzenia to odnotowanie ich w systemie
        - jesli brak nowych uszkodzeń to zatwierdzenie poprawnego zwrotu
    * rekompensata ...



    /* Akcja dot. określenia dostępności pojedynczego elementu zamówienia w swoim punkcie odbioru w określonym terminie */
    DETERMINE_AVIABILITY_OF_ORDER_ITEM = 100,

    /* Akcja dot. wydania sprzętu z punktu odbioru dla klienta. */
    DETERMINE_AVIABILITY_STATIONARY_HANDOVER_TO_CUSTOMER = 101,

    /* Akcja dot. okreslenia dostepności w sprawie dostarczenia elementu/ów bezpośrednio pod adres odbiorcy w określonym terminie */
    DETERMINE_AVIABILITY_FOR_SELF_HANDOVER_TO_CUSTOMER = 103,

     /* Akcja dot. okreslenia dostepności w sprawie dostarczenia elementu/ów bezpośrednio pod adres odbiorcy z montarzem */
    DETERMINE_AVIABILITY_FOR_SELF_SHIPMENT_WITH_MONTAGE = 104,

     /* Akcja dot. okreslenia dostepności w sprawie dostarczenia elementu/ów bezpośrednio pod adres odbiorcy z montarzem, operowaniem, demontarzem i zwrotem */
    DETERMINE_AVIABILITY_FOR_SELF_SHIPMENT_WITH_MONTAGE_OPERATOR_DEMONTAGE_AND_SELF_RETURN = 105,

    /* Akcja dot. okreslenia dostepności w sprawie odbioru elementu/ów bezpośrednio z pod adresu odbiorcy */
    DETERMINE_AVIABILITY_FOR_SELF_RETURN = 106,

    /* Akcja dot. okreslenia dostepności w sprawie demontarzu i odbioru elementu/ów bezpośrednio z pod adresu odbiorcy */
    DETERMINE_AVIABILITY_FOR_DEMONTAGE_AND_SELF_RETURN = 107,

    /* Akcja dot. określenia dostępności w sprawie odbioru przesyłki konduktorskiej z określonych stacji w konkretnych godzinach */
    DETERMINE_AVIABILITY_FOR_RECEIEVING_CONDUCTOR_SHIPMENT = 101,

    /* Akcja dot. określenia dostępności w sprawie nadania przesyłki konduktorskiej z określonych stacji w konkretnych godzinach */
    DETERMINE_AVIABILITY_FOR_SENDING_CONDUCTOR_SHIPMENT = 102,

    /* Akcja dot. okreslenia dostepnosci w sprawie przyjęcia sprzętu w punkcie odbioru w określonym czasie. */
    DETERMINE_AVIABILITY_FOR_STATIONARY_RETURN = 108,



    COLLECT_AND_HANDOVER_COMPLETED_ORDER_TO_CUSTOMER = 100

    // TODO: uzupełnić ta listę
}