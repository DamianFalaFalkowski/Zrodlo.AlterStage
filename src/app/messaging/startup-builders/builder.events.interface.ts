import { Sequelize } from "sequelize";
import { IHostBuilder } from "../../../module.host.builder";

export interface IEventsBuilder<T extends IHostBuilder> {
    sequelizeContext?: Sequelize;

    LoadCommands(): T;

    LoadEventHandlers(): T;
}