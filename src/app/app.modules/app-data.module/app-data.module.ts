import { Sequelize } from 'sequelize';
import { AppDataBuilder } from "./app-data.builder";
import { IGetContextIntegrationProvider } from './integrations/get-context.integration';

import { IGetTemplateByBidIntegrationProvider } from './integrations/get-template-by-bid.integration';
import { ISaveTagIntegrationProvider } from '../../../data/modules/rental-data.module/integrations/save-tag.sqlite.integration';
import { AppModule } from '../app.module';
import { TemplateEntity } from '../../app.data/sch.app/entities/template.entity';
import { ApplicationError } from '../../app.errors/application.error';


interface IAppDataDependency
{
   initialize(major: number, minor: number, patch: number): AppModule;
}
export class AppDataModule
   extends
   AppDataBuilder
   implements IAppDataDependency,
   // providing
   ISaveTagIntegrationProvider,
   IGetContextIntegrationProvider,
   IGetTemplateByBidIntegrationProvider
{
   public constructor()
   {
      super();
   }
   public async getTemplateContentByBid(bId: number): Promise<string>
   {
      return (await TemplateEntity.findOne({
         where: {
            bid: bId
         }
      }))?.content ?? '';
   }
   public async saveTag(tagName: string): Promise<void> 
   {
      await super.saveTag(tagName);
   }
   GetContext(): Sequelize
   {
      if (!this.isContextSetUp())
         throw new ApplicationError('Kontekst nie został ustawiony');
      return this.context!;
   }
   public static initialize(): AppDataModule
   {
      return new AppDataModule();
   }
   public initialize(): AppDataModule
   {
      return new AppDataModule();
   }
}

const appDataModule = (): AppDataModule => 
{
   return AppDataModule.initialize();
};
export default appDataModule;
