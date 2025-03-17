import { Sequelize } from "sequelize";
import { AppModule } from "../../../app.modules/app.module";
import { ApplicationError } from "../../../app.errors/application.error";

export interface ISqlite
{
   isContextSetUp(): boolean;

   isAppSchemaSynced(): boolean;
   isRentalSchemaSynced(): boolean;
}

//TODO: GLOBAL - Ustrukturyzować działanie i odpowiedzialnosci instancji, buildera, modułu i integracji


export interface ISqliteInstance extends ISqlite
{
   context: Sequelize | undefined;
}
export abstract class SqliteInstance 
    extends AppModule 
        implements ISqliteInstance
{
    protected readonly _forceSync: boolean = true;

    protected _context: Sequelize | undefined;
    public get context(): Sequelize{
        return this._context ??
            (() => { throw new ApplicationError("Kontekst bazy danych nie został jeszcze utworzony."); })();
    }
    public isContextSetUp(): boolean {
        return this.context !== undefined;
    }

    protected _isAppSchemaSynced: boolean = false;
    public isAppSchemaSynced(): boolean {
        return this._isAppSchemaSynced;
    }

    protected _isRentalSchemaSynced = false;
    public isRentalSchemaSynced(): boolean {
        return this._isRentalSchemaSynced;
    }
}