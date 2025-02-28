import { SqliteBuilder } from "./app-data.sqlite.builder";
import { ISqlite } from "./app-data.sqlite.instance";
import { ISaveTagIntegration } from "./integrations/save-tag.sqlite.integration";

export class SqliteModule 
    extends 
        SqliteBuilder 
    implements 
        ISaveTagIntegration, 
        ISqlite
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

const sqliteModule: SqliteModule = SqliteModule.initialize();

export default sqliteModule;
