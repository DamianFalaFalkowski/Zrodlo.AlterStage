/* Określa status zamówienia */
export enum OrderStatus
{
    /* Zamówienie zostało utworzone. Utworzenie zamówienia następuje gdy uytkownik doda przynajmniej jedną rzecz do 'koszyka' */
    CREATED = 0,

    /* Zamówienie zostało złożone. Zamówienie zostaje złożone gdy użytkownik zatwierdzi koszyk. */
    PLACED = 10,

    /* Zamówienie wymaga aktualizacji. Zamówienie złozne przez klienta wymaga aktualizacji poniewaz punkt odbioru nie jest w stanie go zrealizować lub zamówienie zawiera błąd. Szczegółowe informacje dot. powodu problemu z realizacją powinny być opisane w encji zamówienia. */
    UPDATE_REQUESTED = 20,

    /* Zamówienie zostało zaakceptowane. Zamówienie zostało zaakceptowane przez punkt odbioru i przekazane do realizacji. */
    ACCEPTED = 30,

    /* Zamówienie zostało dostarczone. Zamówienie zostało dostarczone do klienta. */
    DELIVERED = 40,

    /* Zamówienie zostało zwrócone do punktu odbioru. */
    RETURNED = 50,

    /* Zamówienie zostało zakończone. Rozliczenie pomiędzy punktem odbioru a klientem zostało zrealizowane. */
    FINALIZED = 50,

    /* Zamówienie zostało odrzucone. Zamówienie zostało odrzucone przez punkt odbioru. */
    REJECTED = -1,

    /* Zamówienie zostało anulowane. Zamówienie zostało anulowane przez klienta. */
    CANCELLED = -2,

    /* Zamówienie wygasło. Zamówienie wygasło ponieważ nie zostało złozone w określonym czasie. */
    EXPIRED = -3
}