import { Sequelize } from "sequelize";
import { AppModule } from "../app.module";
import { ApplicationError } from "../../app.errors/application.error";

/** 
 **  */
export interface IAppDataChecks
{
    isContextSetUp(): boolean;
    isAppSchemaSynced(): boolean;
    isAppVersionSetUp(): boolean;
}

/** 
 **  */
interface IAppDataInstance extends IAppDataChecks
{
    appVersion: string | null;
    context: Sequelize | undefined;
}

/** 
 **  */
export abstract class AppDataInstance
    extends AppModule
    implements
    IAppDataInstance
{
    get context(): Sequelize | undefined { return this._context; }
    protected readonly _forceSync: boolean = true;

    private _context: Sequelize | undefined;
    protected _appVersion: string | undefined;
    protected _isAppSchemaSynced: boolean = false;

    public isContextSetUp(): boolean
    {
        return this._context !== undefined;
    }

    protected setContext(cont: Sequelize)
    {
        this._context = cont;
    }

    public isAppSchemaSynced(): boolean
    {
        return this._isAppSchemaSynced;
    }
    public isAppVersionSetUp(): boolean
    {
        return this._appVersion !== undefined;
    }


    public get appVersion(): string
    {
        return this._appVersion ??
            (() => { throw new ApplicationError("Wersja nie została jeszcze ustawiona"); })();
    }
}