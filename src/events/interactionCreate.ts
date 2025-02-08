import { ChatInputCommandInteraction, Events, MessageFlags, Interaction, Integration, CommandInteraction, BaseInteraction, ApplicationCommandType, MessageContextMenuCommandInteraction, ContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: any) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(`An error of type ${error.name} occured.\n ${error.message}`);
			} else {
				console.error('An unknown error occurred.');
			}
			console.error(error);
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