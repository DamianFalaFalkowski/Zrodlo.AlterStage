// importuję parametry aplikacji z pliku .env
import dotenv from 'dotenv';
dotenv.config();
import {__logger} from '../utils/dc-logger.util';
import versionModule from '../app/app.modules/app-version.module/app.version.module';
import sqliteModule from '../app/app.data/app.data-modules/app-data.sqlite/app-data.sqlite.module';
import { Dialect } from 'sequelize';
import hostModule from '../app/app.modules/host.module/app-module.host.module';
import paymentModule from '../modules/payment.module/payment.module';

__logger.logInfo('Starting discord chat-bot ...');
__logger.logInfo('\tApp configuration:');
__logger.logInfo('\t\t\tDb: SqLite[Tag, Rental]')
__logger.logInfo('\t\t\tApp: Version, Host, Payment');
__logger.logInfo('');

const data = sqliteModule
   .SetDbConnection(
      process.env.DATABASE_NAME as string,
      process.env.DATABASE_USER as string,
      process.env.DATABASE_PASSWORD as string,
      process.env.DATABASE_PASSWORD as string,
      process.env.DATABASE_DIALECT as Dialect,
      false,
      process.env.DATABASE_STORAGE as string)
   .InitAppSchema(() => 
   { 
      versionModule(data)
         .setUpAppVersion(1,0,1);
      hostModule
         .SetUpClient(() => 
         {
            __logger.logInfo("Logowanie OK ! ! !");
            try 
            {
               data.InitRentalSchema(() =>
               {
                  data.PrepeareTestData_Rental(() =>
                  {
                     __logger.logInfo("Dane testowe utworzone ! ! !");
                  });
               });
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
   });




