declare type GetInitializer<M extends AppModule, D extends AppModule, I> = M extends D ? I : never;

export abstract class AppModule {
   public As<T extends AppModule>():T{ 
      return this as unknown as T; 
   }

   /**
 * 
 * @param base M to moduł do wytworzenia, D to moduł zapewniający zaleności dla M
 * @returns 
 */
   public getModuleInitializer<M extends this, D extends AppModule, I>(this: M, dependency: D, c: { new (parentModule: D): I }): GetInitializer<typeof this, typeof dependency, typeof c>
   {
      type ttt = GetInitializer<typeof this, typeof dependency, typeof c>; 
      return new c(this as unknown as D) as ttt;
   }
}

