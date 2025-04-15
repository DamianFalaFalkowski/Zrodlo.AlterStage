import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../base.handler";

const commandName: string = 'example';
const commandDescription: string = 'example description';

class ExampleDefinition {

    public static __commandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: false,
        allowedRoles: ['admin', 'owner', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription(commandDescription)
            .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
            .setContexts(InteractionContextType.Guild)
            .addStringOption((option: any) =>
                option.setName('example-name')
                    .setDescription('example description')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('example-with-options-name')
                    .setDescription('example with options')
                    .setRequired(true)
                    .addChoices(
                        { name: 'example', value: '0' },
                        { name: 'e2', value: '1' },
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
export const definition = ExampleDefinition.__commandDefinition;