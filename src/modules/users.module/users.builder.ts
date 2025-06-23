import { IOnMessageCreateIntegrationConsumer } from "../../app/app.modules/host.module/integrations/on-message-create.integration";
import { IUsersInstance, UsersInstance } from "./users.instance";

export interface IUsersBuilder extends IUsersInstance
{
    SetUpRegistration(): Promise<IUsersBuilder>;
}

export abstract class UsersBuilder
    extends UsersInstance
    implements IUsersBuilder,
        IOnMessageCreateIntegrationConsumer
{
    public async SetUpRegistration(): Promise<IUsersBuilder> {
        //await this.RegisterCommandHandlers(this.getCommandHandlersFolderPaths()); // TODO: uncomment when ready
        this.SetUpOnMessageCreate();
        this._isRegistrationEnabled = true;
        return this;
    }

    protected abstract RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void;

    protected abstract getCommandHandlersFolderPaths(): [string];

    abstract SetUpOnMessageCreate(): void;
}