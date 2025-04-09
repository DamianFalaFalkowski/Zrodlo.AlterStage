import { AppModule } from "../../../app/app.modules/app.module";


/** Nazwa schematu rental
** Nazwa do identyfikacji schematu. Ta nazwa zostanie zastosowana do trworzenia tabel i kluczy obcych w bazie danych. */ 
export const rentalSchemaName = 'Rental'

/** Interfejs determinujący dostępne prawdzenia dot. gotowości elementów modułu rental-data
** Ten interfejs określa jakie właściwiści bedą odpowiadać za sprawdzanie gotowości poszczególnych elementów modułu rental-data. */ 
export interface IRentalDataChecks
{
    /** Czy schemat rental został zsynchronizowany
    ** Określa czy schemat rental został zsynchronizowany z db. */ 
    isRentalSchemaSynced: boolean;
}

/** Interfejs determinujący składowe instancji modułu rental-data
** Ten interfejs określa jakie właściwiści instancji bedą dostępne do uycia poza modułem. */ 
export interface IRentalDataInstance 
    extends IRentalDataChecks
{}

/** Instancja modułu rental-data 
** Klasa abstrakcyjna składowej odpowiedzialnej za przetrzymywanie stałych, pól oraz właściwości modułu rental-data  */
export abstract class RentalInstance 
    extends AppModule
    implements IRentalDataInstance
{
    protected readonly _forceSync: boolean;

    constructor(shouldForceSync: boolean) {
        super();
        this._forceSync = shouldForceSync;
    }

    private _isRentalSchemaSynced = false;
    protected set isRentalSchemaSynced(value: boolean) { 
        this._isRentalSchemaSynced = value;
    };
    public get isRentalSchemaSynced(): boolean {
        return this._isRentalSchemaSynced;
    };
}