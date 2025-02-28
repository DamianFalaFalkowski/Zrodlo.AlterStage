import { Sequelize } from "sequelize";
import { AppModule } from "../../../app.modules/app.module";
import { ApplicationError } from "../../../app.errors/application.error";

export interface ISqlite
{
   isContextSetUp(): boolean;
}
export interface ISqliteInstance extends ISqlite
{
   context: Sequelize | undefined;
}
export abstract class SqliteInstance extends AppModule implements ISqliteInstance
{
    protected _context: Sequelize | undefined;
    public get context(): Sequelize{
        return this._context ??
            (() => { throw new ApplicationError("Kontekst bazy danych nie został jeszcze utworzony."); })();
    }
    public isContextSetUp(): boolean {
        return this.context !== undefined;
    }
}