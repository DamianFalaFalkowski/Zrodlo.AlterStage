// export interface IAlterStageModuleBuilder {
//     appVersion: string | null;
//     setUpAppVersion(): AlterStageModuleBuilder;
// }

// export class AlterStageModuleBuilder 
//     implements IAlterStageModuleBuilder,
//         IDiscordRestBuilder,
//         IDiscordClientBuilder,
//         IBuilderSequelizeSqLite,
//         IBuilderDiscordEvents
// {
//     // TODO: przeniesc logikę metod do odseperownmych klas tak jak w przypadku discord rest i discord client

//     public appVersion: string | null = null;
//     public rest: REST | null = null;    
//     public client: Client<boolean> | null = null;
//     public sequelizeContext: Sequelize | null = null;

//     constructor() {
//     }

//     SetUpRest(): AlterStageModuleBuilder {
//         this.rest = DiscordRestBuilder.SetUpRest()
//         return this;      
//     }

//     InitRepositories(): AlterStageModuleBuilder {
//         dcLogger.logInfo("Inicjalizuję repozytoria...");
//         if(!this.sequelizeContext)
//             throw Error("DB context is missing!")
        
//         // konfiguracja modelu bazy
//         TagsRepository.init(
//             {
//                 name: {
//                     type: DataTypes.STRING,
//                     allowNull: false,
//                 },
//                 description: DataTypes.STRING,
//                 userId: { type: DataTypes.NUMBER, allowNull: false},
//                 createdUserId: { type: DataTypes.NUMBER, allowNull: false},
//             },
//             {
//                 sequelize: this.sequelizeContext, // We need to pass the connection instance
//                 modelName: 'Tags', // We need to choose the model name
//             }
//         );
//         return this;
//     }

//     LoadCommands(): AlterStageModuleBuilder {
//         dcLogger.logInfo("Rejestruję polecenia...");
//         if(!this.client)
//             throw Error("Client is missing");
//         FindCommandHandlersUtil.LoadCommmandsToClient(this.client, path.join(__dirname, 'app/messaging/handlers'));
//         return this;
//     }

//     async ClientLogin() : Promise<AlterStageModuleBuilder> 
//     { return await DiscordClientBuilder.ClientLogin(this); }
        

//     LoadEventHandlers(): AlterStageModuleBuilder {
//         dcLogger.logInfo("Rejestruję event handlery...");
//         if(!this.client)
//             throw Error("Client is missing");
//         // Read event handlers from the events directory
//         const eventsPath = path.join(__dirname, 'app/messaging/events');
//         const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));
        
//         for (const file of eventFiles) {
//             const filePath = path.join(eventsPath, file);
//             const event = require(filePath);
//             if (event.once) {
//                 this.client.once(event.name, (...args) => event.execute(...args));
//             } else {
//                 this.client.on(event.name, (...args) => event.execute(...args));
//             }
//             dcLogger.logInfo(`Exevution of event ${event.name} has been added`);
//         }
//         return this;
//     }
    
//     public SetDbConnection( // TODO: przeniesc do .env
//         databaseName: 'database', 
//         userName: 'user', 
//         password: 'password',
//         host: 'localhost', 
//         dialect: 'sqlite', 
//         logging: false, 
//         storage: 'database.sqlite')
//     : AlterStageModuleBuilder {
//         dcLogger.logInfo("Nawiązuję połączenie z bazą danych...");
//             this.sequelizeContext = new Sequelize(databaseName, userName, password, {
//                 host: host,
//                 dialect: dialect,
//                 logging: logging,
//                 storage: storage,
//             }); 
//             this.sequelizeContext.afterSync(() => dcLogger.logInfo('Database synchronized'));
//             return this;
//     }

//     public setUpAppVersion() : AlterStageModuleBuilder{
//         dcLogger.logInfo("Ustawiam wersję aplikacji...");
//         this.appVersion = process.env.VERSION as string;
//         return this;
//     }

//     public SetUpClient() :AlterStageModuleBuilder 
//     { return DiscordClientBuilder.SetUpClient(this); }