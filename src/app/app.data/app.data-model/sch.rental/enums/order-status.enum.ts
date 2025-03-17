/* Określa status zamówienia */
export enum OrderStatus
{
    /** Zamówienie zostało utworzone. Utworzenie zamówienia następuje gdy uytkownik doda przynajmniej jedną rzecz do 'koszyka' */
    CREATED = 'CREATED',

    /* Zamówienie zostało złożone. Zamówienie zostaje złożone gdy użytkownik zatwierdzi koszyk. */
    PLACED = 'PLACED',

    // TODO: dodać tabelę przetrzymujące informacje o aktualizacjach potrzebnych do akceptacji zamówienia przez PO
    /* Zamówienie wymaga aktualizacji. Zamówienie złozne przez klienta wymaga aktualizacji poniewaz punkt odbioru nie jest w stanie go zrealizować lub zamówienie zawiera błąd. Szczegółowe informacje dot. powodu problemu z realizacją powinny być opisane w encji zamówienia. */
    UPDATE_REQUESTED = 'UPDATE_REQUESTED',

    /* Zamówienie zostało zaakceptowane. Zamówienie zostało zaakceptowane przez punkt odbioru i przekazane do realizacji. */
    ACCEPTED = 'ACCEPTED',

    /* Zamówienie zostało dostarczone. Zamówienie zostało dostarczone do klienta. */
    DELIVERED = 'DELIVERED',

    /* Zamówienie zostało zwrócone do punktu odbioru. */
    RETURNED = 'RETURNED',

    /* Zamówienie zostało zakończone. Rozliczenie pomiędzy punktem odbioru a klientem zostało zrealizowane. */
    FINALIZED = 'FINALIZED',

    /* Zamówienie zostało odrzucone. Zamówienie zostało odrzucone przez punkt odbioru. */
    REJECTED = 'REJECTED',

    /* Zamówienie zostało anulowane. Zamówienie zostało anulowane przez klienta. */
    CANCELLED = 'CANCELLED',

    /* Zamówienie wygasło. Zamówienie wygasło ponieważ nie zostało złozone w określonym czasie. */
    EXPIRED = 'EXPIRED'
}