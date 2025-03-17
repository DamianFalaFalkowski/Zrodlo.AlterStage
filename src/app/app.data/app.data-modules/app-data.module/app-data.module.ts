import { AppModule } from '../../../app.modules/app.module';
import { AppDataBuilder } from "./app-data.builder";

import { ISqlite } from "../rental-data.module/rental-data.instance";
import { ISaveTagIntegration } from '../rental-data.module/integrations/save-tag.sqlite.integration';

interface IAppDataDependency<T extends ISaveTagIntegration> 
{
   initialize(dependingOnModule: T, major: number, minor: number, patch: number): AppModule
}
class AppDataModule<T extends ISaveTagIntegration>
   extends
      AppDataBuilder
   implements
      IAppDataDependency<T>,
      ISqlite 
{
   private _dependency: T | undefined;
   private constructor(dependency: T) {
      super();
      this._dependency = dependency;
   }
   isAppSchemaSynced(): boolean {
      return this._dependency!.isAppSchemaSynced();
   }
   isRentalSchemaSynced(): boolean {
      return this._dependency!.isRentalSchemaSynced();
   }
   public static initialize<T extends ISaveTagIntegration>(dependency: T): AppDataModule<T> {
      return new AppDataModule(dependency)
   }
   public initialize<T extends ISaveTagIntegration>(dependency: T): AppDataModule<T> {
      return new AppDataModule(dependency)
   }
   isContextSetUp(): boolean {
      return this._dependency!.isContextSetUp();
   }
   saveTag(tagName: string): void {
      this._dependency!.saveTag(tagName);
   }
}

const appDataModule = <D extends ISaveTagIntegration>(data : D): AppDataModule<D> => 
{ 
   return AppDataModule.initialize(data);
};
export default appDataModule;
