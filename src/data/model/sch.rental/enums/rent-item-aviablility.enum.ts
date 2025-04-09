/** Wartość wyliczeniowa określająca czas dostępności przedmiotu */
export enum RentItemAviablility {
    UNAVALIABLE = 'UNAVALIABLE',
    IMMEDIATELY = 'IMMEDIATELY',
    ONE_OR_TWO_DAYS = 'ONE_OR_TWO_DAYS',
    UP_TO_5_DAYS = 'UP_TO_5_DAYS',
    OVER_5_DAYS = 'OVER_5_DAYS'
}

export function translateRentItemAviabilityToPolish(aviability: RentItemAviablility): string {
    switch (aviability) {
        case RentItemAviablility.UNAVALIABLE:
            return 'Niedostępny';
        case RentItemAviablility.IMMEDIATELY:
            return 'Natychmiastowo';
        case RentItemAviablility.ONE_OR_TWO_DAYS:
            return '1-2 dni';
        case RentItemAviablility.UP_TO_5_DAYS:
            return 'Do 5 dni';
        case RentItemAviablility.OVER_5_DAYS:
            return 'Powyżej 5 dni';
        default:
            return '';
    }
}