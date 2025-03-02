import { HostBuilder } from "./app-module.host.builder";
import { IHost } from "./app-module.host.instance";

export class HostModule
    extends 
        HostBuilder
    implements 
        IHost
{
    private constructor() {
        super();
    }
    public initialize(): HostModule {
        return HostModule.initialize();
    }
    public static initialize(): HostModule {
        return new HostModule()
    }
}

const hostModule: HostModule = HostModule.initialize();

export default hostModule;