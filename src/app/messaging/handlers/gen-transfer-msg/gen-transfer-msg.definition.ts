import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../_command-handling-base/base.handler";

// DOKUMENTAJA POLECEN (/): https://discord.com/developers/docs/interactions/application-commands#contexts
/** Definicja polecenia wygenerowania tresci wiadomosci do platnosci payPal lub blik. */
export class Definition_GenerateTransferMessageCommand {
    // TODO: mona te dodać rodzaj produktu (nice to have)

    public static __commandDefinition = {
        name: 'gen-transfer-msg',
        description: 'Generates a transfer message for specific role (role has to begin with \'+\' sign)',
        type: ApplicationCommandType.ChatInput,
        isEphemeral: true,
        allowedRoles: ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'],
        data: new SlashCommandBuilder()
            .setName('gen-transfer-msg')
            .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
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
                require('./gen-transfer-msg.command'),
                require('./gen-transfer-msg.response')
            )
        }
    };
}

/** Modół fantomowy (udający/kopiuącyj) rzeczywisty obiekt - biorący udział w operacji. obiekt przeznaczony tylko do odczytu aby umoliwić . */
// Aktualnie zakomentowany, bo nie wiadomo czy wgl będzie potrzebny...
// module.exports = {
//     name: Definition_GenerateTransferMessageCommand.__commandDefinition.name,
//     description: Definition_GenerateTransferMessageCommand.__commandDefinition.description,
//     type: Definition_GenerateTransferMessageCommand.__commandDefinition.type,
//     isEphemeral: Definition_GenerateTransferMessageCommand.__commandDefinition.isEphemeral,
//     allowedRoles: Definition_GenerateTransferMessageCommand.__commandDefinition.allowedRoles,
//     data: Definition_GenerateTransferMessageCommand.__commandDefinition.data,
//     execute(interaction: ChatInputCommandInteraction) { Definition_GenerateTransferMessageCommand.__commandDefinition.execute(interaction); }
// };