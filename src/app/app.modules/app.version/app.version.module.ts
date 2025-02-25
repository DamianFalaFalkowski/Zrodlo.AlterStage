import { AppModule } from "../app.module";
import { VersionBuilder } from "./app.version.builder";
import { SaveTagIntegration } from "../../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";
import { ISqlite } from "../../app.data/app.data-modules/app-data.sqlite/app-data.sqlite.instance";

interface IVersionDependency<M extends SaveTagIntegration> 
{
   initialize(dependingOnModule: M, major: number, minor: number, patch: number): AppModule
}
class VersionModule<M extends SaveTagIntegration>
   extends
      VersionBuilder
   implements
      IVersionDependency<M>,
      ISqlite 
{
   private _dependency: M | undefined;
   private constructor(dependency: M) {
      super();
      this._dependency = dependency;
   }
   public initialize(dependency: M): VersionModule<M> | AppModule {
      return new VersionModule(dependency)
   }
   public static build<M extends SaveTagIntegration>(dependency: M): AppModule {
      return new VersionModule(dependency);
   }
   isContextSetUp(): boolean {
      return this._dependency!.isContextSetUp();
   }
   saveTag(tagName: string): void {
      this._dependency!.saveTag(tagName);
   }
}
export default VersionModule;