import dotenv from 'dotenv';
import dcLoggerUtil from '../utils/dc-logger.util';
import versionModule from '../app/app.modules/app.version/app.version.module';
import sqliteModule from '../app/app.data/app.data-modules/app-data.sqlite/app-data.sqlite.module';
import { Dialect } from 'sequelize';
import hostModule from '../app/app.modules/host-module/app-module.host.module';
import paymentModule from '../modules/payment.module/module.payment.module';

// importuję parametry aplikacji z pliku .env
dotenv.config();

const data = sqliteModule
   .SetDbConnection(
      process.env.DATABASE_NAME as string,
      process.env.DATABASE_USER as string,
      process.env.DATABASE_PASSWORD as string,
      process.env.DATABASE_PASSWORD as string,
      process.env.DATABASE_DIALECT as Dialect,
      false,
      process.env.DATABASE_STORAGE as string)
   .InitRepositories();

versionModule(data)
   .setUpAppVersion(1,0,1);

hostModule
   .SetUpClient(() => {
      dcLoggerUtil.logInfo("Logowanie OK ! ! !");
      try 
      { 
         // definiuje co ma isę zadziewć po zalogowaniu do klienta
         paymentModule(hostModule)
            .RegisterPaymentCommands();
         (async () => {
            await hostModule
               .HandleEventInteractionCreate()
               .PublishCommands();
         })();
      } catch (error: Error | any) 
      // TODO: handle
      {
      } finally
      {
         // TODO: handle
      }
      })
   .SetUpRest()
   .ClientLogin();


