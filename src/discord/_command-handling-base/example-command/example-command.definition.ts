import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { ICommandDefinition } from "../base.definition.interface";
import { baseHandlerExecute } from "../base.handler";
import { __logger } from "../../../utils/dc-logger.util";

const commandName: string = 'example-commandm';
const commandDescription: string = 'example command description';

class ExampleDefinition
{
    public static __commandDefinition: ICommandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: true,
        allowedRoles: ['admin', 'rental-manager', 'owner', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription(commandDescription)
            .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
            .setContexts(InteractionContextType.Guild)
            .addStringOption((option: any) =>
                option.setName('example-name')
                    .setDescription('The name of the item.')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('example-with-options')
                    .setDescription('example description')
                    .setRequired(true)
                    .addChoices(
                        { name: 'x1', value: '0' },
                        { name: 'x2', value: '1' }
                    ))
        ,
        async execute(interaction: any) : Promise<void> {
            try {
                if (!interaction.isCommand()) return;
            }
            catch (error) {
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
export const definition = ExampleDefinition.__commandDefinition;