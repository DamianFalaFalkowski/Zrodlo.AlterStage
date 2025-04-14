import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../../../../discord/_command-handling-base/base.handler";
import { permission } from "process";

// DOKUMENTAJA POLECEN (/): https://discord.com/developers/docs/interactions/application-commands#contexts


/** Definicja polecenia wygenerowania tresci wiadomosci do platnosci payPal lub blik. */
const commandName: string = 'gen-transfer-msg';
const commandDescription: string = 'Generates a transfer message for specific role (role has to begin with \'+\' sign)';

class GenerateTransferMessageDefinition {
    // TODO: mona te dodać rodzaj produktu (nice to have)

    public static __commandDefinition = {
        name: commandName,
        description: commandDescription,
        type: ApplicationCommandType.ChatInput,
        isEphemeral: true,
        allowedRoles: ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName(commandName)
            .setDescription(commandDescription)
            .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
            .setContexts(InteractionContextType.Guild)
            .addRoleOption((option: any) =>

                option.setName('role-to-buy')
                    .setDescription('The role to buy.')
                    .setRequired(true))
        ,
        async execute(interaction: any) {
            await baseHandlerExecute(
                interaction,
                require(`./${commandName}.command`)
                    .createCommand(interaction, interaction.ephemeral),
                require(`./${commandName}.handler`).handle
            )
        }
    };
}
export const definition = GenerateTransferMessageDefinition.__commandDefinition;