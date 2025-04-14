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
                        { name: 'Small', value: 'S' },
                        { name: 'Medium', value: 'M' },
                        { name: 'Large', value: 'L' },
                        { name: 'Extra Large', value: 'XL' },
                        { name: 'Extra Extra Large', value: 'XXL' }
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