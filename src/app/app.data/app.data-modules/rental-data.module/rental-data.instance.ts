import { Sequelize } from "sequelize";
import { ApplicationError } from "../../../app.errors/application.error";
import { AppDataModule } from "../app-data.module/app-data.module";

export interface IRentalDataChecks
{
   isRentalSchemaSynced(): boolean;
}

export interface IRentalDataInstance extends IRentalDataChecks
{
}
export abstract class SqliteInstance 
    extends AppDataModule
    implements IRentalDataInstance
{
    protected readonly _forceSync: boolean = true;

    
    abstract get context(): Sequelize;
    abstract isContextSetUp(): boolean ;

    protected _isRentalSchemaSynced = false;
    public isRentalSchemaSynced(): boolean {
        return this._isRentalSchemaSynced;
    }
}