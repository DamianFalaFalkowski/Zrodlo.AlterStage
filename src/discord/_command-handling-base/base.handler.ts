import { ChatInputCommandInteraction } from "discord.js";
import { __logger } from "../../utils/dc-logger.util";
import { BaseCommandResponse } from "./base.response";

// TODO: dodać komentarze
// TODO: poprawić logowanie

export const baseHandlerExecute =
   async (interaction: ChatInputCommandInteraction,
         command: any,
         handlerMethod: any): Promise<void> => 
      {
      try {
         __logger.logInfo(
            `Interaction '${interaction.commandName}' execution started!`);
         __logger.logCommand(interaction);

         await handlerMethod(
            interaction,
            command
         );

         __logger.logInfo(
            `Reply content: ${JSON.stringify({ content: command.Response.Reply.content, components: command.Response.Reply.components, flags: command.Response.Reply.flags })}`)

         await interaction.reply({ content: command.Response.Reply.content, components: command.Response.Reply.components, flags: command.Response.Reply.flags });

      } catch (error: any) {
         __logger.logError(error as Error);
         (command.Response as BaseCommandResponse).PepeareFailureResponseBase(error.message);
      }
   }
