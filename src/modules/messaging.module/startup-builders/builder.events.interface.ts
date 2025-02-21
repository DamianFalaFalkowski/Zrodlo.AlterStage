import { Sequelize } from "sequelize";
import { IHostBuilder } from "../../../.app/app.modules/host-module/app-module.host.builder";

export interface IEventsBuilder<T extends IHostBuilder> {
    sequelizeContext?: Sequelize;

    LoadCommands(): T;

    LoadEventHandlers(): T;
}