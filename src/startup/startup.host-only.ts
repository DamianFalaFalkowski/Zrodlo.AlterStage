import dotenv from 'dotenv';
import __hostInstance from '../app/app.modules/host-module/app-module.host.builder';
import dcLoggerUtil from '../utils/dc-logger.util';
import SqliteModule from '../app/app.data/app.data-modules/app-data.sqlite/app-data.sqlite.module';
import { AppModule } from '../app/app.modules/app.module';
import VersionModule from '../app/app.modules/app.version/app.version.module';
import { SaveTagIntegration } from '../app/app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration';
import versionModule from '../app/app.modules/app.version/app.version.module';

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

const data = SqliteModule
   .initialize().As<SqliteModule>()
   .SetDbConnection('','','','','sqlite',false,'').As<SqliteModule>();

versionModule(data).initialize().setUpAppVersion()
