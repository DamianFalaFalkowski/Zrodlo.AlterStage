import { Sequelize } from "sequelize";
import { AppModule } from "../../../app.modules/app.module";
import { ApplicationError } from "../../../app.errors/application.error";

export interface ISqlite
{
   isContextSetUp(): boolean;
   isDatabaseSynced(): boolean;
   isTableInitialized(tableName: string): boolean;
   
}
export interface ISqliteInstance extends ISqlite
{
   context: Sequelize | undefined;
   initializedTables: string[];
}
export abstract class SqliteInstance extends AppModule implements ISqliteInstance
{
    protected _isDatabaseSynced: boolean = false;
    public isDatabaseSynced(): boolean {
        throw new Error("Method not implemented.");
    }

    private _initializedTables: string[] = [];
    public get initializedTables(): string[] { return this._initializedTables; }
    public isTableInitialized(tableName: string): boolean {
        return this.initializedTables.includes(tableName);
    }

    protected _context: Sequelize | undefined;
    public get context(): Sequelize{
        return this._context ??
            (() => { throw new ApplicationError("Kontekst bazy danych nie został jeszcze utworzony."); })();
    }
    public isContextSetUp(): boolean {
        return this.context !== undefined;
    }
}