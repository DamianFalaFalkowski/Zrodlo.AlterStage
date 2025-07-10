import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../../../../discord/_command-handling-base/base.handler";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { __logger } from "../../../../utils/dc-logger.util";

const commandName: string = 'users-get-user-info';
const commandDescription: string = 'Pobiera informacje o uzytkowniku na podstawie jego ID';

class GetUserInfoDefinition
{
    public static __commandDefinition: ICommandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: true,
        allowedRoles: ['admin', 'owner', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription(commandDescription)
            .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
            .setContexts(InteractionContextType.Guild)
            .addStringOption((option: any) =>
                option.setName('user-identifier')
                    .setDescription('Id uzytkownika lub lubliczna nazwa uzytkownika')
                    .setRequired(true))
        ,
        async execute(interaction: any): Promise<void>
        {
            try
            {
                if (!interaction.isCommand()) return;
            }
            catch (error)
            {
                /** Obsługa błędów polecenia */
                __logger.logError(error as Error);
            }
            await baseHandlerExecute(
                interaction,
                require(`./${commandName}.command`)
                    .createCommand(interaction),
                require(`./${commandName}.handler`).handle
            );
        }
    };
}
export const definition = GetUserInfoDefinition.__commandDefinition;