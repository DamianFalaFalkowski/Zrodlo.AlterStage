// importuję parametry aplikacji z pliku .env
import dotenv from 'dotenv';
dotenv.config();
import { __logger } from '../utils/dc-logger.util';
import appDataModule from '../app/app.data/app.data-modules/app-data.module/app-data.module';
import { Dialect } from 'sequelize';
import hostModule from '../app/app.modules/host.module/app-module.host.module';
import paymentModule from '../modules/payment.module/payment.module';
import { RentalDataModule } from '../data/modules/rental-data.module/rental-data.module';
import rentalModule, { RentalModule } from '../modules/rental.module/rental.module';
import { UsersDataModule } from '../data/modules/users-data.module/users-data.module';
import { Client, GuildChannel } from 'discord.js';
import { UsersModule } from '../modules/users.module/users.module';




__logger.logInfo('Starting discord chat-bot ...');
__logger.logInfo('\tApp configuration:');
__logger.logInfo('\t\t\tDb: SqLite[Tag, Rental]');
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
         .setUpAppVersion(1, 0, 1);
      hostModule
         .SetUpClient(() => 
         {
            __logger.logInfo("Logowanie OK ! ! !");
            try 
            {
               AppDataModule.InitAppSchema(async () =>
               {
                  AppDataModule.PrepeareTestData(() =>
                  {
                     __logger.logInfo("Dane testowe modułu AppData utworzone ! ! !");
                     let rentalData = RentalDataModule
                        .initializeRental(
                           AppDataModule,
                           (process.env.MODULE_RENTALDATA_FORCESYNC as string) === 'true')
                        .InitSchema(() =>
                        {
                           rentalData.PrepeareTestData(() =>
                           {
                              __logger.logInfo("Dane testowe utworzone ! ! !");
                              rentalModule(rentalData, hostModule, appDataModule(), process.env.OFFER_TEMPLATE_BID as unknown as number, process.env.DJ_EQ_RENTAL_CHANNEL_ID as string).RegisterRentalCommands().UpdateRentalChannels(async () =>
                              {
                                 __logger.logInfo("Rental channels updated ! ! !");
                                 await hostModule
                                    .HandleEventInteractionCreate()
                                    .PublishCommands();
                              });
                           });
                        });
                     let usersData = UsersDataModule
                        .initializeUsers(AppDataModule,
                           (process.env.MODULE_USERSDATA_FORCESYNC as string) === 'true')
                        .InitSchema(() =>
                        {
                           // Logic after Users schema sync
                        });

                     UsersModule.initialize(hostModule, usersData).SetUpRegistration();
                  });
               });
               paymentModule(hostModule)
                  .RegisterPaymentCommands();
               (async () =>
               {

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




