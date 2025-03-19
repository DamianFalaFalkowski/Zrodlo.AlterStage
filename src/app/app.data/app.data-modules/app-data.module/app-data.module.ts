import { Sequelize } from 'sequelize';
import { AppModule } from '../../../app.modules/app.module';
import { ISaveTagIntegrationProvider } from '../rental-data.module/integrations/save-tag.sqlite.integration';
import { AppDataBuilder } from "./app-data.builder";
import { IAppDataChecks } from './app-data.instance';
import { IGetContextIntegrationProvider } from './integrations/get-context.integration';
import { ApplicationError } from '../../../app.errors/application.error';

interface IAppDataDependency
{
   initialize(major: number, minor: number, patch: number): AppModule
}
export class AppDataModule
   extends
      AppDataBuilder
   implements IAppDataDependency, 
      // providing
      ISaveTagIntegrationProvider,
      IGetContextIntegrationProvider
{
   public constructor() {
      super();
   }
   public async saveTag(tagName: string): Promise<void> 
   {
         await super.saveTag(tagName);
   }
   GetContext(): Sequelize
   {
      if(!this.isContextSetUp())
         throw new ApplicationError('Kontekst nie został ustawiony');
      return this.context!;
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
