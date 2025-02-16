import { Events, MessageFlags } from 'discord.js';
import { client } from '../../../run-commands-registration-script';
import dcLogger from '../../../utils/dc-logger';

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction: any) {
		dcLogger.logInfo(`Interaction '${interaction.commandName}' recieved!`);

		// check interaction
		if (!interaction.isChatInputCommand()) return;

		// get and check commands
		const command = client.commands.get(interaction.commandName) as any;
		if (!command) {
			dcLogger.logStringError(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// wyklonuje ligikę zapytanmia i wysyła odpowiedz
		try {
			await command.execute(interaction);
		} 
		// w razie niepowodzenia informuje respondenta o statusie.
		catch (error: any) {
			if (error instanceof Error) {
				dcLogger.logStringError(`An error of type ${error.name} occured.\n ${error.message}`);
			} else {
				dcLogger.logStringError('An unknown error occurred.');
			}
			
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};


// module.exports = {
// 	name: Events.InteractionCreate,
// 	async execute(interaction: any) {
// 		console.info(`InteractionCreate event fired. CommandName: ${interaction.commandName}`);
// 		if (!interaction.isChatInputCommand()) return;

// 		const command = interaction.client.commands.get(interaction.commandName);
// 		if (!command) {
// 			console.error(`No command matching ${interaction.commandName} was found.`);
// 			return;
// 		}
// 		console.info(`Command ${command.name} found for ${interaction.commandName} interaction.`);
// let xx = (interaction as CommandInteraction);
// 		try {
// 			switch ((interaction as CommandInteraction).commandType) {
// 				case ApplicationCommandType.ChatInput:
// 					await (command as CommandDefinition).execute(interaction as ChatInputCommandInteraction);
// 					break;
// 				case ApplicationCommandType.Message:
// 					await command.execute(interaction as MessageContextMenuCommandInteraction);
// 					break;
// 				case ApplicationCommandType.PrimaryEntryPoint:
// 					await command.execute(interaction as ContextMenuCommandInteraction);
// 					break;
// 				case ApplicationCommandType.User:
// 					await command.execute(interaction as UserContextMenuCommandInteraction);
// 					break;
// 				default:
// 					throw new Error(`Unsupported interaction type: ${typeof interaction}`);
// 			}
// 		} catch (error: unknown) {
// 			if (error instanceof Error) {
// 				console.error(`An error of type ${error.name} occured.\n ${error.message}`);
// 			} else {
// 				console.error('An unknown error occurred.');
// 			}
// 			console.error(error);
// 			if (interaction.replied || interaction.deferred) {
// 				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
// 			} else {
// 				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
// 			}
// 		}
// 	},
// };