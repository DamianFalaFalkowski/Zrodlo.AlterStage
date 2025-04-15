import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../../../../discord/_command-handling-base/base.handler";

const commandName: string = 'create-offer-rent-item';
const commandDescription: string = 'Creates offer rent item';

class CreateOfferRentItemDefinition {

    public static __commandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: false,
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
        async execute(interaction: any) {
            await baseHandlerExecute(
                interaction,
                require(`./${commandName}.command`)
                    .createCommand(interaction, interaction.ephemeral),
                require(`./${commandName}.handler`).handle
            );
        }
    };
}
export const definition = CreateOfferRentItemDefinition.__commandDefinition;