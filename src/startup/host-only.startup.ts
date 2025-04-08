// importuję parametry aplikacji z pliku .env
import dotenv from 'dotenv';
dotenv.config();
import {__logger} from '../utils/dc-logger.util';
import appDataModule from '../app/app.data/app.data-modules/app-data.module/app-data.module';
import { Dialect } from 'sequelize';
import hostModule, { HostModule } from '../app/app.modules/host.module/app-module.host.module';
import paymentModule from '../modules/payment.module/payment.module';
import { ForumChannel } from 'discord.js';
import { RentalDataModule } from '../data/modules/rental-data.module/rental-data.module';
import rentalModule from '../modules/rental.module/rental.module';



__logger.logInfo('Starting discord chat-bot ...');
__logger.logInfo('\tApp configuration:');
__logger.logInfo('\t\t\tDb: SqLite[Tag, Rental]')
__logger.logInfo('\t\t\tApp: Version, Host, Payment, Rental');
__logger.logInfo('');

const AppDataModule = appDataModule()
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
      appDataModule()
         .setUpAppVersion(1,0,1);
      hostModule
         .SetUpClient(() => 
         {
            __logger.logInfo("Logowanie OK ! ! !");
            try 
            {
               AppDataModule.InitAppSchema(async () =>
               {
                  let rentalData = RentalDataModule
                     .initializeRental(
                           AppDataModule, 
                           (process.env.MODULE_RENTALDATA_FORCESYNC as string) === 'true')
                     .InitSchema(() => {
                        rentalData.PrepeareTestData(() =>
                        {
                           __logger.logInfo("Dane testowe utworzone ! ! !");
                           rentalModule(rentalData, hostModule, appDataModule(), 100).UpdateRentalChannels(() =>{
                              __logger.logInfo("Rental channels updated ! ! !");
                           });
                        });
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




