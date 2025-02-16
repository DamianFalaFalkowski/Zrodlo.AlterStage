import { Sequelize } from 'sequelize';
import fs from 'node:fs';
import path from 'node:path';
import "./type-mappings/client-type-map.js";
import { log } from 'node:console';
import { FindCommandHandlersUtil } from './app/utils/find-command-handlers-definitions.util.js';
import dcLogger from './app/utils/dc-logger.js';
import AlterStageAppStartup from './startup';

// Zdefiniowanie polaczenia z baza danych
// export const sequelizeContext = new Sequelize('database', 'user', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	// SQLite only
// 	storage: 'database.sqlite',
// }); 
// sequelizeContext.afterSync(() => log('Database synchronized'));

// if(!AlterStageAppStartup.client)
// 	throw Error("Client is missing");

// FindCommandHandlersUtil.LoadCommmandsToClient(AlterStageAppStartup.client, path.join(__dirname, 'app/dc-messaging/handlers'));

// // Read event handlers from the events directory
// const eventsPath = path.join(__dirname, 'app/dc-messaging/events');
// const eventFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));

// for (const file of eventFiles) {
// 	const filePath = path.join(eventsPath, file);
// 	const event = require(filePath);
// 	if (event.once) {
// 		AlterStageAppStartup.client.once(event.name, (...args) => event.execute(...args));
// 	} else {
// 		AlterStageAppStartup.client.on(event.name, (...args) => event.execute(...args));
// 	}
// 	dcLogger.logInfo(`Exevution of event ${event.name} has been added`);
// }

// // Login to Discord with your app's token
// AlterStageAppStartup.client.login(process.env.TOKEN);