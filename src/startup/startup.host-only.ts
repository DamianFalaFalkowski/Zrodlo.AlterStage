import dotenv from 'dotenv';
import dcLoggerUtil from '../utils/dc-logger.util';
import versionModule from '../app/app.modules/app.version/app.version.module';
import sqliteModule from '../app/app.data/app.data-modules/app-data.sqlite/app-data.sqlite.module';
import { Dialect } from 'sequelize';
import hostModule from '../app/app.modules/host-module/app-module.host.module';

// importuję parametry aplikacji z pliku .env
dotenv.config();

// odczytuję konfigurację modułów
// TODO:


// definiuję funkcję do wykanania po zakonczonym logowaniu do klienta 
// (to tutaj powinna znaleść się sprawcza logika trybu)
function onClientLoginCallback() {
   dcLoggerUtil.logInfo("Logowanie OK ! ! !");
   try { 
      // definiuje co ma isę zadziewć po zalogowaniu do klienta
         // TagsRepository.sync();
         //.LoadEventHandlers()
         //.LoadCommands()
         ;
      
   } catch (error: Error | any) {
       
   } finally{
   }
   // recurrence for app hosting continuation after error
};
// inicjuję utworzenie modułu klienta discord api i zalogowania się do niego
//__hostInstance.CreateInstance(onClientLoginCallback);

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
   .SetUpClient(onClientLoginCallback)
   .SetUpRest()
   .ClientLogin();
