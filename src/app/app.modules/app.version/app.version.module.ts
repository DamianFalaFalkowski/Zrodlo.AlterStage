import { AppModule } from '../app.module';
import { VersionBuilder } from "./app.version.builder";
import { ISaveTagIntegration } from "../../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";
import { ISqlite } from "../../app.data/app.data-modules/app-data.sqlite/app-data.sqlite.instance";

interface IVersionDependency<T extends ISaveTagIntegration> 
{
   initialize(dependingOnModule: T, major: number, minor: number, patch: number): AppModule
}
class VersionModule<T extends ISaveTagIntegration>
   extends
      VersionBuilder
   implements
      IVersionDependency<T>,
      ISqlite 
{
   private _dependency: T | undefined;
   private constructor(dependency: T) {
      super();
      this._dependency = dependency;
   }
   isTableInitialized(tableName: string): boolean {
      return this._dependency!.isTableInitialized(tableName);
   }
   isDatabaseSynced(): boolean {
      return this._dependency!.isDatabaseSynced();
   }
   public static initialize<T extends ISaveTagIntegration>(dependency: T): VersionModule<T> {
      return new VersionModule(dependency)
   }
   public initialize<T extends ISaveTagIntegration>(dependency: T): VersionModule<T> {
      return new VersionModule(dependency)
   }
   isContextSetUp(): boolean {
      return this._dependency!.isContextSetUp();
   }
   saveTag(tagName: string): void {
      this._dependency!.saveTag(tagName);
   }
}

const versionModule = <D extends ISaveTagIntegration>(data : D): VersionModule<D> => 
{ 
   return VersionModule.initialize(data);
};
export default versionModule;
