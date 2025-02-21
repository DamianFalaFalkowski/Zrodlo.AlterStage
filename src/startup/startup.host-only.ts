import dotenv from 'dotenv';
import __hostInstance from '../.app/app.modules/host-module/app-module.host.builder';
import dcLoggerUtil from '../utils/dc-logger.util';
import { IHostBuilder } from '../.app/app.modules/host-module/app-module.host.builder';



// importuję parametry aplikacji z pliku .env
dotenv.config();
// odczytuję konfigurację modułów
// TODO:



// definiuję funkcję do wykanania po zakonczonym logowaniu do klienta 
// (to tutaj powinna znaleść się sprawcza logika trybu)
function onClientLoginCallback(): IHostBuilder {
   dcLoggerUtil.logInfo("Logowanie OK ! ! !");
   try { 
      // TagsRepository.sync();
      __hostInstance
         //.LoadEventHandlers()
         //.LoadCommands()
         ;
      
   } catch (error) {
      console.error("Error in main function response:", error);
   } finally{
      
   }
   // recurrence for app hosting continuation after error
};

// inicjuję utworzenie modułu klienta discord api i zalogowania się do niego
__hostInstance.CreateInstance(onClientLoginCallback, );