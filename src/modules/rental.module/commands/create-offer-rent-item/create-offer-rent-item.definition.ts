import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../../../../discord/_command-handling-base/base.handler";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { __logger } from "../../../../utils/dc-logger.util";

const commandName: string = 'rental-create-offer-rent-item';
const commandDescription: string = 'Creates offer rent item';

class CreateOfferRentItemDefinition
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
                option.setName('item-name')
                    .setDescription('The name of the item.')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('brand-name')
                    .setDescription('The brand name of the item.')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('model-name')
                    .setDescription('The model name of the item.')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('rent-item-size')
                    .setDescription('The size of the item.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Very Small', value: 'V_SMALL' },
                        { name: 'Small', value: 'SMALL' },
                        { name: 'Medium', value: 'MEDIUM' },
                        { name: 'Large', value: 'LARGE' },
                        { name: 'Very Large', value: 'LARGE' }
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
export const definition = CreateOfferRentItemDefinition.__commandDefinition;