import { ChatInputCommandInteraction } from "discord.js";
import dcLoggerUtil from "../../../../utils/dc-logger.util";

// TODO: dodać komentarze
// TODO: poprawić logowanie

export const baseHandlerExecute =
   async (interaction: ChatInputCommandInteraction,
      commandModule: any,
      responseModule: any,
      handlerModule: any) => {
      try {
         dcLoggerUtil.logInfo(`Interaction '${interaction.commandName}' execution started!`);
         dcLoggerUtil.logCommand(interaction);
         const command = commandModule.createCommand(interaction, interaction.ephemeral);
         handlerModule.handle(
            interaction,
            command
         );
         dcLoggerUtil.logInfo(`Reply content: ${JSON.stringify({ content: command.Response.Reply.content, components: command.Response.Reply.components, flags: command.Response.Reply.flags })}`)
         await interaction.reply({ content: command.Response.Reply.content, components: command.Response.Reply.components, flags: command.Response.Reply.flags });
      } catch (error) {
         dcLoggerUtil.logError(error as Error);
         throw error;
      }
   }
