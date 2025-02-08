export interface Ibuilder{

}
export interface IBuilderSequelizeSqLite<T extends Ibuilder> extends StartupInstance {
    addSequelizeContext(instance: StartupInstance, database: string, user: string, password: string, options?: any): T;

    addAfterSyncAction(instance: StartupInstance, action: any): T;
}