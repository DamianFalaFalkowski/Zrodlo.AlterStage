import { Sequelize } from "sequelize";

export interface IGetContextIntegrationProvider extends IGetContextIntegration {}
export interface IGetContextIntegrationConsumer extends IGetContextIntegration {}
interface IGetContextIntegration
{
    GetContext(): Sequelize;
}