export interface IPostThreadInForumChannelIntegrationConsumer extends IPostThreadInForumChannelIntegration {}
export interface IPostThreadInForumChannelIntegrationProvider extends IPostThreadInForumChannelIntegration {}
interface IPostThreadInForumChannelIntegration
{
    postThreadInForumChannel(channelId: string, title: string, content: string, imageUrl: string, applayTags: string[]): Promise<void>;
}