export interface IPostThreadInForumChannelIntegrationConsumer extends IPostThreadInForumChannelIntegration {}
export interface IPostThreadInForumChannelIntegrationProvider extends IPostThreadInForumChannelIntegration {}
interface IPostThreadInForumChannelIntegration
{
    postThreadInForumChannelIfDoesntExist(channelId: string, title: string, content: string, applayTags: string[], imageUrl?: string): Promise<void>;
}