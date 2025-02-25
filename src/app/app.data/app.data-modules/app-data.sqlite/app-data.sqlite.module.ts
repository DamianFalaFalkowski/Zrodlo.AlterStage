import { AppModule } from "../../../app.modules/app.module";
import { SaveTagIntegration } from "./integrations/save-tag.sqlite.integration";

interface ISqliteDependency
{
    initialize(): AppModule;
}
class SqliteModule extends SaveTagIntegration
{
    private constructor() {
        super();
    }
    saveTag(tagName: string): void {
        throw new Error("Method not implemented.");
    }
    public initialize(): SqliteModule {
        return SqliteModule.initialize();
    }
    public static initialize(): SqliteModule {
        return new SqliteModule()
    }
}
export default SqliteModule;
