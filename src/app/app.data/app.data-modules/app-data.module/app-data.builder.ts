
import { AppModule } from "../../../app.modules/app.module";
import { AppDataInstance } from "./app-data.instance";
import { AppDataModule } from "./app-data.module";
import { Dialect, Sequelize } from "sequelize";
import { TagsAttributes, TagsEntity, TagsModelName } from "../../app.data-model/sch.app/entities/tags.entity";
import { __logger } from "../../../../utils/dc-logger.util";
import { TemplateAttributes, TemplateEntity, TemplateModelName } from "../../app.data-model/sch.app/entities/template.entity";

export const appSchemaName = 'App';

interface IAppDataBuilder 
{
    setUpAppVersion(major: number, minor: number, patch: number): AppModule;

    SetDbConnection(
        databaseName: string,
        userName: string,
        password: string,
        host: string,
        dialect: string,
        logging: boolean,
        storage: string
    ): AppDataModule;

    InitAppSchema(afterAppSchemaSync: () => void): AppDataModule;
}
export abstract class AppDataBuilder extends AppDataInstance
    implements
    IAppDataBuilder
{
    protected async saveTag(tagName: string): Promise<void> {
        await TagsEntity.create({
                        name: tagName,
                        description: 'version tag',
                        userId: 0,
                        createdUserId: 0
                    });
    }

    /** 
    ** 0. SET UP CONNECTION */
    public SetDbConnection(
        databaseName: string,
        userName: string,
        password: string,
        host: string,
        dialect: Dialect,
        logging: boolean,
        storage: string): AppDataModule
    {
        this.setContext(new Sequelize(
            databaseName,
            userName,
            password,
            {
                host: host,
                dialect: dialect,
                logging: logging,
                storage: storage
            }
        ));
        return this as unknown as AppDataModule;
    }
    /** 
    ** I. APP SCHEMA */
    public InitAppSchema(afterAppSchemaSync: () => void): AppDataModule
    {
        const schemaName = 'App';
        TagsEntity.init(
            TagsAttributes,
            {
                sequelize: this.context!,
                modelName: schemaName + '_' + TagsModelName
            }
        );
        TemplateEntity.init(
            TemplateAttributes,
            {
                sequelize: this.context!,
                modelName: schemaName + '_' + TemplateModelName
            }
        );
        TemplateEntity.afterSync(() =>
        {
            TagsEntity.sync({ force: this._forceSync });
        });
        TagsEntity.afterSync(() =>
        {
            this._isAppSchemaSynced = true;
            __logger.logInfo('App schema synchronized');
            afterAppSchemaSync();
        });
        TemplateEntity.sync({ force: this._forceSync });
        return this.As<AppDataModule>();
    }
    private createVersionTag(major: number, minor: number, patch: number): string
    {
        return `${major}.${minor}.${patch}.0}`;
    }

    public setUpAppVersion(major: number, minor: number, patch: number)
    {
        this._appVersion = this.createVersionTag(major, minor, patch);
        this.saveTag(this.appVersion);
        return this;
    }
}