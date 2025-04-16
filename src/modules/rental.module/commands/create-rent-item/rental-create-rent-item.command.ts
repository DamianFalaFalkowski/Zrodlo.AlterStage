import { ChatInputCommandInteraction } from "discord.js";
import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { __logger } from "../../../../utils/dc-logger.util";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { CreateRentItemResponse } from "./rental-create-rent-item.response";
import { RentItemAviablility } from '../../../../data/model/sch.rental/enums/rent-item-aviablility.enum';
import { ItemKindCodes } from '../../../../data/model/sch.rental/enums/item-kind-code.enum';

export class CreateRentItemCommand extends BaseCommand<CreateRentItemResponse> {
    public readonly OfferRentItemId: number;
    public readonly ItemKindCode: {name: string, code: string} | undefined;
    public readonly RentItemAviablility: RentItemAviablility;
    public readonly OnBuyAmountSpend: number = 0;

    /** Konstruktor polecenia. Pobiera wartości z przekazanych pól i waliduje je */
    constructor(interaction: any, definition: ICommandDefinition) {
        super(interaction, new CreateRentItemResponse(definition.isEphemeral), definition);
        this.OfferRentItemId = interaction.options.getInteger('offer-rent-item-id', true);
        this.ItemKindCode = Object.values(ItemKindCodes).find(x => x.code === interaction.options.getString('item-kind', true));
        this.RentItemAviablility = interaction.options.getString('rent-item-aviability', false);
        this.OnBuyAmountSpend = interaction.options.getInteger('on-buy-amount-spent', false);

        this.CheckAuthorisationAndValidityBase();
    }

    /** Metoda do zawarcia dodatkowych sprawdzeń autoryzacji i walidacji. Jest uruchamiana po metodzie CheckAuthorisationAndValidityBase() */
    protected CheckAuthorisationAndValidity(): boolean
    {
        // brak dodatkowych sprawdzen
        return true;
    }
}
module.exports = {
    createCommand(interaction: ChatInputCommandInteraction) : CreateRentItemCommand
    {
        return new CreateRentItemCommand(
            interaction, 
            require(`./${interaction.commandName}.definition`).definition as ICommandDefinition);
    }
}