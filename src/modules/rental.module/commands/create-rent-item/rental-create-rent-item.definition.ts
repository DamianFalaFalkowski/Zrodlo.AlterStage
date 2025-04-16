import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { baseHandlerExecute } from "../../../../discord/_command-handling-base/base.handler";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { __logger } from "../../../../utils/dc-logger.util";
import { RentItemAviablility, translateRentItemAviabilityToPolish } from "../../../../data/model/sch.rental/enums/rent-item-aviablility.enum";
import { ItemKindCodes } from "../../../../data/model/sch.rental/enums/item-kind-code.enum";

const commandName: string = 'rental-create-rent-item';
const commandDescription: string = 'Tworzy nowy przedmiot do wynajęcia.';

/** Tą operację mogą wykonać jedynie właściciele punktu odbioru. */
class CreateRentItemDefinition
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
            .addIntegerOption((option: any) =>
                option.setName('offer-rent-item-id')
                    .setDescription('Id elementu oferty najmu z którym ma być powiązany nowy element.')
                    .setRequired(true))
            .addStringOption((option: any) =>
                option.setName('item-kind')
                    .setDescription('Rodzaj elementu.')
                    .setRequired(true)
                    .addChoices(
                        Object.values(ItemKindCodes).map((itemKind) => ({
                            name: itemKind.name,
                            value: itemKind.code
                        }))
                    ))
            .addStringOption((option: any) =>
                option.setName('rent-item-aviability')
                    .setDescription('Dostępność elementu (opcjonalne). Nieuzupełnienie uzyje dostępności z punktu odbioru')
                    .setRequired(false)
                    .addChoices(
                        { 
                            name: translateRentItemAviabilityToPolish(RentItemAviablility.IMMEDIATELY), 
                            value: RentItemAviablility.IMMEDIATELY as string
                        },
                        { 
                            name: translateRentItemAviabilityToPolish(RentItemAviablility.ONE_OR_TWO_DAYS), 
                            value: RentItemAviablility.ONE_OR_TWO_DAYS as string
                        },
                        { 
                            name: translateRentItemAviabilityToPolish(RentItemAviablility.UP_TO_5_DAYS), 
                            value: RentItemAviablility.UP_TO_5_DAYS as string
                        },
                        { 
                            name: translateRentItemAviabilityToPolish(RentItemAviablility.OVER_5_DAYS), 
                            value: RentItemAviablility.OVER_5_DAYS as string
                        }
                    ))
            .addIntegerOption((option: any) =>
                option.setName('on-buy-amount-spent')
                    .setDescription('Koszt zakupu elementu (opcjonalne).')
                    .setRequired(false))
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
export const definition = CreateRentItemDefinition.__commandDefinition;