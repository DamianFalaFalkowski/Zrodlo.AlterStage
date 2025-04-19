import { ChatInputCommandInteraction } from "discord.js";
import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { __logger } from "../../../../utils/dc-logger.util";
import { CreateOfferRentItemResponse } from "./rental-create-offer-rent-item.response";
import { ICommandDefinition } from "../../../../discord/_command-handling-base/base.definition.interface";
import { ItemKindCodes } from "../../../../data/model/sch.rental/enums/item-kind-code.enum";

export class CreateOfferRentItemCommand extends BaseCommand<CreateOfferRentItemResponse> {
    public readonly ItemName: string;
    public readonly BrandName: string;
    public readonly ModelName: string;
    public readonly RentItemSize: string;
    public readonly ItemKindCode: { code: string, name: string };

    /** Konstruktor polecenia. Pobiera wartości z przekazanych pól i waliduje je */
    constructor(interaction: any, definition: ICommandDefinition) {
        super(interaction, new CreateOfferRentItemResponse(definition.isEphemeral), definition);
        this.ItemName = interaction.options.getString('item-name', true);
        this.BrandName = interaction.options.getString('brand-name', true);
        this.ModelName = interaction.options.getString('model-name', true);
        this.RentItemSize = interaction.options.getString('rent-item-size', true);
        this.ItemKindCode = Object.values(ItemKindCodes).find(x => x.code === interaction.options.getString('item-kind', true))!;

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
    createCommand(interaction: ChatInputCommandInteraction) : CreateOfferRentItemCommand
    {
        return new CreateOfferRentItemCommand(
            interaction, 
            require(`./${interaction.commandName}.definition`).definition as ICommandDefinition);
    }
}