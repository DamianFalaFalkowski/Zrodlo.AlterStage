import { RentItemSize } from "../../../../data/model/sch.rental/enums/rent-item-size.enum";
import { OfferRentItemRepository } from "../../../../data/model/sch.rental/repositories/offer-rent-item.repository";
import { __logger } from "../../../../utils/dc-logger.util";
import { CreateOfferRentItemCommand } from "./create-offer-rent-item.command";

/** Metoda obsługująca polecenie */
module.exports = {
    async handle(interaction: any, command: CreateOfferRentItemCommand): Promise<void> {
        let createdItem = await OfferRentItemRepository.create(
            interaction.user.id,
            command.ItemName,
            command.BrandName,
            command.ModelName,
            command.RentItemSize as RentItemSize);

        command.Response.AssignResponseData(createdItem.id)
        command.Response.PrepeareSuccessResponseBase();
    }
}