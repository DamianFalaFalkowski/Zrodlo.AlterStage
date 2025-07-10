import { AppModule } from "../../app/app.modules/app.module";

export interface IUsers
{
    isRegistrationEnabled(): boolean;
}

export interface IUsersInstance
{

}

export abstract class UsersInstance
    extends AppModule
    implements IUsersInstance, IUsers
{
    protected _isRegistrationEnabled = false;

    isRegistrationEnabled(): boolean
    {
        return this._isRegistrationEnabled;
    }

    protected constructor()
    {
        super();
    }

    private readonly _commandHandlersFolderPaths: [string] = [__dirname + "/commands"];
    protected getCommandHandlersFolderPaths(): [string] { return this._commandHandlersFolderPaths; }
}