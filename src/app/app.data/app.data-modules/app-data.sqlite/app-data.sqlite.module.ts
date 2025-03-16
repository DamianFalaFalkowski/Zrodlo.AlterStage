import { TagsEntity } from "../../app.data-model/sch.app/tags.entity";
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
    
    async saveTag(tagName: string): Promise<void> {
        await TagsEntity.create({
                        name: tagName,
                        description: 'version tag',
                        userId: 0,
                        createdUserId: 0
                    });
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
