import { AppModule } from "../../../app.modules/app.module";
import { SqliteBuilder } from "./app-data.sqlite.builder";

interface ISqliteDependency
{
    initialize(): AppModule;
}
class SqliteModule extends SqliteBuilder implements ISqliteDependency
{
    private constructor() {
        super();
    }
    public initialize(): AppModule {
        return SqliteModule.initialize();
    }
    public static initialize(): SqliteModule | AppModule {
        return new SqliteModule()
    }
}
export default SqliteModule;
