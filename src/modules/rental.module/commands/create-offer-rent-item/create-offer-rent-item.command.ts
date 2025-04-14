import { BaseCommand } from "../../../../discord/_command-handling-base/base.command";
import { CreateOfferRentItemResponse } from "./create-offer-rent-item.response";

export class CreateOfferRentItemCommand extends BaseCommand<CreateOfferRentItemResponse> {
    protected CheckAuthorisationAndValidity(): boolean
    {
        throw new Error("Method not implemented.");
    }
    public readonly ItemName: string;
    public readonly BrandName: string;
    public readonly ModelName: string;
    public readonly RentItemSize: string;

    constructor(interaction: any, isEphemeral: boolean, definition: any) {
        super(interaction, new CreateOfferRentItemResponse(isEphemeral), definition);
        this.ItemName = interaction.options.getString('item-name', true);
        this.BrandName = interaction.options.getString('brand-name', true);
        this.ModelName = interaction.options.getString('model-name', true);
        this.RentItemSize = interaction.options.getString('rent-item-size', true);

        this.CheckAuthorisationAndValidity();
    }
}