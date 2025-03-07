export abstract class AppModule {
   public As<T extends AppModule>():T{ 
      return this as unknown as T; 
   }
}

