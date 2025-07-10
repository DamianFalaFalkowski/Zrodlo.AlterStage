import { Message } from 'discord.js';

export interface IOnMessageCreateIntegrationConsumer extends IOnMessageCreateIntegrationProvider {}
export interface IOnMessageCreateIntegrationProvider extends IOnMessageCreateIntegration {}
interface IOnMessageCreateIntegration
{
    SetUpOnMessageCreate(handle: (message: Message) => void): void;
}