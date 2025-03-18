import { AppModule } from '../../../app.modules/app.module';
import { ISaveTagIntegration } from '../rental-data.module/integrations/save-tag.sqlite.integration';
import { AppDataBuilder } from "./app-data.builder";
import { IAppDataChecks } from './app-data.instance';

interface IAppDataDependency
{
   initialize(major: number, minor: number, patch: number): AppModule
}
export class AppDataModule
   extends
      AppDataBuilder
   implements
      IAppDataDependency, IAppDataChecks, ISaveTagIntegration
{
   public constructor() {
      super();
   }
   public static initialize(): AppDataModule {
      return new AppDataModule()
   }
   public initialize(): AppDataModule {
      return new AppDataModule();
   }
}

const appDataModule = (): AppDataModule => 
{ 
   return AppDataModule.initialize();
};
export default appDataModule;
