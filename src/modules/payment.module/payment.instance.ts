import { AppModule } from "../../app/app.modules/app.module";

export interface IPayment
{
    areCommandsSetUp(): boolean;
}

export interface IPaymentInstance
{
    getCommandHandlersFolderPaths(): [string];
}

export abstract class PaymentInstance 
    extends AppModule
    implements IPaymentInstance, IPayment
{
    protected _areCommandsSetUp = false;
    areCommandsSetUp(): boolean {
        return this._areCommandsSetUp;
    }

    private readonly _commandHandlersFolderPaths: [string] = [__dirname + "/commands"];
    public getCommandHandlersFolderPaths(): [string] { return this._commandHandlersFolderPaths; }
}