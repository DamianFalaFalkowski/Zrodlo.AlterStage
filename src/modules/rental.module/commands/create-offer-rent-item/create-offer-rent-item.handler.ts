import { RentItemSize } from "../../../../data/model/sch.rental/enums/rent-item-size.enum";
import { OfferRentItemRepository } from "../../../../data/model/sch.rental/repositories/offer-rent-item.repository";
import { __logger } from "../../../../utils/dc-logger.util";
import { CreateOfferRentItemCommand } from "./create-offer-rent-item.command";

module.exports = {
     handle(interaction: any, command: CreateOfferRentItemCommand) {
        try {
            OfferRentItemRepository.create(
                interaction.user.id,
                command.ItemName,
                command.BrandName,
                command.ModelName,
                command.RentItemSize as RentItemSize);

            command.Response.PrepeareSuccessResponseBase('');
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}