import { ChatInputCommandInteraction } from "discord.js";
import dcLoggerUtil from "../../../utils/dc-logger.util";

// TODO: dodać komentarze
// TODO: poprawić logowanie

export const baseHandlerExecute =
   async (interaction: ChatInputCommandInteraction,
      commandModule: NodeJS.Require,
      responseModule: NodeJS.Require) => {
      try {
         dcLoggerUtil.logInfo(`Interaction '${interaction.commandName}' execution started!`);
         dcLoggerUtil.logCommand(interaction);
         const reply = require('./gen-transfer-msg.handler').handle(
            interaction,
            commandModule,
            responseModule);
         dcLoggerUtil.logInfo(`Reply content: ${JSON.stringify({ content: reply.content, components: reply.components, flags: reply.flags })}`)
         await interaction.reply({ content: reply.content, components: reply.components, flags: reply.flags });
      } catch (error) {
         dcLoggerUtil.logError(error as Error);
         throw error;
      }
   }
