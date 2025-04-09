import { IGetClientIntegration as IGetClientIntegration } from "../../app/app.modules/host.module/integrations/get-client.host.integration";
import { IPaymentInstance, PaymentInstance } from "./payment.instance";
import { AppModule } from "../../app/app.modules/app.module";

export interface IPaymentBuilder extends IPaymentInstance
{
    RegisterPaymentCommands(): AppModule;
}

export abstract class PaymentBuilder 
    extends PaymentInstance 
    implements IPaymentBuilder, IGetClientIntegration
{
    abstract RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void;

    public RegisterPaymentCommands(): AppModule
    {
        this.RegisterCommandHandlers(this.getCommandHandlersFolderPaths());
        this._areCommandsSetUp = true;
        return this;
    }
}