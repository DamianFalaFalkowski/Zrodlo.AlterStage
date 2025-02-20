import { Sequelize } from "sequelize";
import { IHostBuilder } from "../../../module.host.builder";

export interface IEventsBuilder<T extends IHostBuilder> {
    sequelizeContext: Sequelize | null;

    LoadCommands(): T;

    LoadEventHandlers(): T;
}