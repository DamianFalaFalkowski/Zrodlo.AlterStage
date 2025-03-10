import { Client } from "discord.js";
import { PaymentBuilder } from "./module.payment.builder";
import { IPayment } from "./module.payment.instance";
import { IGetClientIntegration as IGetClientIntegration } from "../../app/app.modules/host.module/integrations/get-client.host.integration";
import { AppModule } from "../../app/app.modules/app.module";

interface IPaymentDependency<T extends IGetClientIntegration>
{
    initialize(dependingOnModule: T): AppModule;
}

export class PaymentModule<T extends IGetClientIntegration>
    extends PaymentBuilder
    implements IPayment, IPaymentDependency<T>
{
    private _dependency: T | undefined;

    RegisterCommandHandlers(commandHandlersFolderPaths: [string]): void {
        return this._dependency!.RegisterCommandHandlers(commandHandlersFolderPaths);
    }

    private constructor(dependency: T) {
        super();
        this._dependency = dependency;
    }

    public initialize(dependency: T): PaymentModule<T> {
        return PaymentModule.initialize(dependency);
    }
    public static initialize<T extends IGetClientIntegration>(dependency: T): PaymentModule<T> {
        return new PaymentModule<T>(dependency)
    }
}

const paymentModule = <T extends IGetClientIntegration>(host: T): PaymentModule<T> => 
{
    return PaymentModule.initialize(host);
} 

export default paymentModule;