import { Ibuilder, IBuilderSequelizeSqLite } from './builder.interfaces/builder.sequelize.sqlite.interface';

 class ScriptBuilder implements Ibuilder, IBuilderSequelizeSqLite<ScriptBuilder> {

    constructor() {

    }
    addSequelizeContext(instance: StartupInstance, database: string, user: string, password: string, options?: any): ScriptBuilder {
        throw new Error('Method not implemented.');
    }
    addAfterSyncAction(instance: StartupInstance, action: any): ScriptBuilder {
        throw new Error('Method not implemented.');
    }


}