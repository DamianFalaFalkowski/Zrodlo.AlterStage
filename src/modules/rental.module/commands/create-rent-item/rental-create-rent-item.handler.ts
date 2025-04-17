import { RentItemRepository } from "../../../../data/model/sch.rental/repositories/rent-item.repository";
import { __logger } from "../../../../utils/dc-logger.util";
import { CreateRentItemCommand } from "./rental-create-rent-item.command";

/** Metoda obsługująca polecenie */
module.exports = {
    async handle(interaction: any, command: CreateRentItemCommand): Promise<void> {
        let createdItem = await RentItemRepository.createWithExistingOfferRentItemId(
            interaction.user.id as number,
            command.OfferRentItemId,
            command.RentItemAviablility,
            command.OnBuyAmountSpend);

        command.Response.AssignResponseData(createdItem.id);
        command.Response.PrepeareSuccessResponseBase();
    }
}