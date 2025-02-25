import { SaveTagIntegration } from "../app.data/app.data-modules/app-data.sqlite/integrations/save-tag.sqlite.integration";

export abstract class AppModule {
   public As<T extends AppModule>():T{ 
      return this as unknown as T; 
   }
}

