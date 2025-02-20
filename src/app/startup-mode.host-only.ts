import __discordClientHostModuleBuilder from "../modules/discord-client/startup-builders/module.discord-client-host.builder";
import dcLoggerUtil from "./utils/dc-logger.util";

// definiuję funkcję do wykanania po zakonczonym logowaniu do klienta 
// (to tutaj powinna znaleść się sprawcza logika trybu)
function callbackFunc() {
   dcLoggerUtil.logInfo("callback is here");
   try {

   } catch (error) {
      console.error("Error in main function response:", error);
   }
   // recurrence for app hosting continuation after error
   callbackFunc();
};


// inicjuję utworzenie modułu klienta discord api i zalogowania się do niego
__discordClientHostModuleBuilder
   .SetUpClient()
   .SetUpRest()
   .ClientLogin(callbackFunc);