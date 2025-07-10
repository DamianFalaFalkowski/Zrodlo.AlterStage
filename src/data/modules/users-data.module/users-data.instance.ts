import { AppModule } from "../../../app/app.modules/app.module";

/** Nazwa schematu users 
** Nazwa do identyfikacji schematu. Ta nazwa zostanie zastosowana do trworzenia tabel i kluczy obcych w bazie danych. */ 
export const usersSchemaName = 'Users';

/** Interfejs determinujący dostępne sprawdzenia dot. gotowości elementów modułu users-data
** Ten interfejs określa jakie właściwiści bedą odpowiadać za sprawdzanie gotowości poszczególnych elementów modułu users-data. */ 
export interface IUsersDataChecks
{
    /** Czy schemat rental został zsynchronizowany
    ** Określa czy schemat rental został zsynchronizowany z db. */ 
    isDataSchemaSynced: boolean;
}

/** Interfejs determinujący składowe instancji modułu users-data
** Ten interfejs określa jakie właściwiści instancji bedą dostępne do uycia poza modułem. */
export interface IUsersDataInstance
    extends IUsersDataChecks
{}

/** Instancja modułu users-data
** Klasa abstrakcyjna składowej odpowiedzialnej za przetrzymywanie stałych, pól oraz właściwości modułu users-data */
export abstract class UsersDataInstance
    extends AppModule
    implements IUsersDataInstance
{
    protected readonly _forceSync: boolean;

    constructor(shouldForceSync: boolean) {
        super();
        this._forceSync = shouldForceSync;
    }

    private _isDataSchemaSynced = false;
    protected set isDataSchemaSynced(value: boolean) { 
        this._isDataSchemaSynced = value;
    };
    public get isDataSchemaSynced(): boolean {
        return this._isDataSchemaSynced;
    };
}