
import dotenv from 'dotenv';
import dcLoggerUtil from "./app/utils/dc-logger.util";
import __hostInstance from './module.host.builder';

// importuję parametry aplikacji
dotenv.config();

// definiuję funkcję do wykanania po zakonczonym logowaniu do klienta 
// (to tutaj powinna znaleść się sprawcza logika trybu)
function callbackFunc(): void {
   dcLoggerUtil.logInfo("callback is here");
   try { 
         
      //TagsRepository.sync();
   } catch (error) {
      console.error("Error in main function response:", error);
   }
   // recurrence for app hosting continuation after error
};

// inicjuję utworzenie modułu klienta discord api i zalogowania się do niego
__hostInstance.CreateInstance(callbackFunc);