
import { AppModule } from "../../../app.modules/app.module";
import { AppDataInstance } from "./app-data.instance";
import { AppDataModule } from "./app-data.module";
import { Dialect, Sequelize } from "sequelize";
import { TagsAttributes, TagsEntity, TagsModelName } from "../../app.data-model/sch.app/entities/tags.entity";
import { __logger } from "../../../../utils/dc-logger.util";
import { TemplateAttributes, TemplateEntity, TemplateModelName } from "../../app.data-model/sch.app/entities/template.entity";
import { after } from "node:test";

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

    PrepeareTestData(afterTestDataCreation: () => void): Promise<AppDataModule>;
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

    public async PrepeareTestData(afterTestDataCreation: () => void): Promise<AppDataModule>
    {
        await TemplateEntity.create({
            name: 'Dj EQ Rental Offer Template',
            bId: 100, // TODO: przeniesc do configa
            description: 'Szablon oferty wynajmu sprzetu DJ',
            content: `
*ID: {{id}} UPD: {{lastUpdateDate}}*

**Cena:** {{totalPrice}}zł/dzień
**Kaucja zwrotna:** {{depositPrice}}zł
**Dostępność:** {{repeat recievePointAviabilities}}{{recievePointAviability}}({{cities}}) {{/repeat}}
**Kontakt bezpośredni:\n**tel. {{contactPhone}}\ne-mail: {{contactEmail}}

**Dodatkowe informacje: **
{{repeat DeliveryInfos}}{{infoMessage}}{{/repeat}}{{repeat OfferDisscounts}}{{infoMessage}}{{/repeat}}{{repeat OfferInfos}}{{infoMessage}}{{/repeat}}
**Opis:**
{{description}}

Zestaw zawiera:
{{repeat OfferRentItems}}- {{name}}
{{/repeat}}

`,
            userId: 0,
            createdUserId: 0,
        });
        afterTestDataCreation();
        return this as unknown as AppDataModule;
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