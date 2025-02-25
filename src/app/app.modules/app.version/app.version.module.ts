import { AppModule } from '../app.module';
import { VersionBuilder } from "./app.version.builder";
import { SaveTagIntegration } from "../../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";
import { ISqlite } from "../../app.data/app.data-modules/app-data.sqlite/app-data.sqlite.instance";

interface IVersionDependency<T extends SaveTagIntegration> 
{
   initialize(dependingOnModule: T, major: number, minor: number, patch: number): AppModule
}
class VersionModule<T extends SaveTagIntegration>
   extends
      VersionBuilder
   implements
      IVersionDependency<T>,
      ISqlite 
{
   private _dependency: T | undefined;
   public constructor(dependency: T) {
      super();
      this._dependency = dependency;
   }
   public initialize(dependency: T): VersionModule<T> {
      return new VersionModule(dependency)
   }
   isContextSetUp(): boolean {
      return this._dependency!.isContextSetUp();
   }
   saveTag(tagName: string): void {
      this._dependency!.saveTag(tagName);
   }
}
const versionModule = <D extends SaveTagIntegration>(data : D): VersionModule<D> => { return (new VersionModule<D>(data))};
export default versionModule;
