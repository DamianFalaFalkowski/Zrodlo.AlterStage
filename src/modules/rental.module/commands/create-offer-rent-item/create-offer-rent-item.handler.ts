import { __logger } from "../../../../utils/dc-logger.util";
import { CreateOfferRentItemCommand } from "./create-offer-rent-item.command";

module.exports = {
     handle(interaction: any, command: CreateOfferRentItemCommand) {
        try {
            // TODO: obsługa handlera

            command.Response.PrepeareSuccessResponseBase('');
        } catch (error) {
            __logger.logError(error as Error);
            throw error;
        }
    }
}