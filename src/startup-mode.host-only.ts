
import dotenv from 'dotenv';
import dcLoggerUtil from "./app/utils/dc-logger.util";
import { IHostBuilder } from './module.host.builder';
import { TagsRepository } from './model/tags.model';


const appConfiguration: string[] = [];

// pobieram instancję hosta aplikacji
const __hostInstance: IHostBuilder = require('./module.host.builder').default;

// importuję parametry aplikacji
dotenv.config();

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
      return __hostInstance;
   }
   // recurrence for app hosting continuation after error
};

// inicjuję utworzenie modułu klienta discord api i zalogowania się do niego
__hostInstance.CreateInstance(onClientLoginCallback);