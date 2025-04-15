import { ChatInputCommandInteraction } from "discord.js";
import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { __logger } from "../../../../utils/dc-logger.util";
import { CreateOfferRentItemResponse } from "./create-offer-rent-item.response";

export class CreateOfferRentItemCommand extends BaseCommand<CreateOfferRentItemResponse> {
    protected CheckAuthorisationAndValidity(): boolean
    {
        // TODO: sprawdzenie autoryzacji i poprawności
        //throw new Error("Method not implemented.");
    }
    public readonly ItemName: string;
    public readonly BrandName: string;
    public readonly ModelName: string;
    public readonly RentItemSize: string;

    constructor(interaction: any, isEphemeral: boolean, definition: any) {
        try{
            super(interaction, new CreateOfferRentItemResponse(isEphemeral), definition);
            this.ItemName = interaction.options.getString('item-name', true);
            this.BrandName = interaction.options.getString('brand-name', true);
            this.ModelName = interaction.options.getString('model-name', true);
            this.RentItemSize = interaction.options.getString('rent-item-size', true);

            this.CheckAuthorisationAndValidity();
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}
module.exports = {
    createCommand(interaction: ChatInputCommandInteraction, isEphemeral: boolean) : CreateOfferRentItemCommand
    {
        return new CreateOfferRentItemCommand(interaction, isEphemeral, require('./create-offer-rent-item.definition'));
    }
}