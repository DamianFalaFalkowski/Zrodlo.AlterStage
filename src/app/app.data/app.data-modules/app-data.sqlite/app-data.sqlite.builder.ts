
import { DataTypes, Dialect, Sequelize } from "sequelize";
import { ISqliteInstance, SqliteInstance } from './app-data.sqlite.instance';
import { SqliteModule } from "./app-data.sqlite.module";
import { TagsAttributes, TagsModelName, TagsEntity } from '../../app.data-model/sch.app/tags.model'
import { __logger } from "../../../../utils/dc-logger.util";
import { OfferRentItemAttributes, OfferRentItemEntity, OfferRentItemModelName } from "../../app.data-model/sch.rental/offer-rent-item.model";
import { RentItemAttributes, RentItemEntity, RentItemModelName } from "../../app.data-model/sch.rental/rent-item.model";
import { RentItemToOfferRentItemEntity, RentItemToOfferRentItemModelName } from "../../app.data-model/sch.rental/hash-tables/rent-item-to-offer-rent-item.model";
import { RecievePointAttributes, RecievePointEntity, RecievePointModelName } from "../../app.data-model/sch.rental/recieve-point.model";


export interface ISqliteBuilder extends ISqliteInstance {
   SetDbConnection(
      databaseName: string,
      userName: string,
      password: string,
      host: string,
      dialect: string,
      logging: boolean,
      storage: string
   ): SqliteModule;

   InitAppSchema(afterAppSchemaSync: () => void): SqliteModule;
   InitRentalSchema(afterRentalSchemaSync: () => void): SqliteModule;
}
export abstract class SqliteBuilder
   extends SqliteInstance
   implements ISqliteBuilder {
   public SetDbConnection(
      databaseName: string,
      userName: string,
      password: string,
      host: string,
      dialect: Dialect,
      logging: boolean,
      storage: string): SqliteModule {
      this._context = new Sequelize(
         databaseName,
         userName,
         password,
         {
            host: host,
            dialect: dialect,
            logging: logging,
            storage: storage
         }
      );
      return this as unknown as SqliteModule;
   }

   public InitAppSchema(afterAppSchemaSync: () => void): SqliteModule {
      const schemaName = 'App'
      TagsEntity.init(
         TagsAttributes,
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + TagsModelName
         }
      );
      TagsEntity.afterSync(() => {
         this._isAppSchemaSynced = true;
         __logger.logInfo('App schema synchronized');
         afterAppSchemaSync();
      });
      TagsEntity.sync({ force: true });
      return this.As<SqliteModule>();
   }

   InitRentalSchema(afterRentalSchemaSync: () => void): SqliteModule 
   {
      const schemaName = 'Rental'

      RecievePointEntity.init(RecievePointAttributes,
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + RecievePointModelName,
         }
      );
      OfferRentItemEntity.init(OfferRentItemAttributes,
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + OfferRentItemModelName,
         }
      );
      RentItemEntity.init(RentItemAttributes,
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + RentItemModelName,
         }
      );

      RentItemToOfferRentItemEntity.init(
         {
            rentItemId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentItemEntity,
                  key: 'id',
               },
            },
            offerRentItemId: {
               type: DataTypes.INTEGER,
               references: {
                  model: OfferRentItemEntity,
                  key: 'id',
               },
            }
         },
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + RentItemToOfferRentItemModelName,
         }
      );


      OfferRentItemEntity.belongsToMany(RentItemEntity,
         { through: RentItemToOfferRentItemEntity })
      RentItemEntity.belongsToMany(OfferRentItemEntity,
         { through: RentItemToOfferRentItemEntity })

      RentItemEntity.hasMany(RecievePointEntity, 
         { foreignKey: 'homeRecievePointId', });
      RecievePointEntity.belongsTo(RentItemEntity);


      RentItemEntity.afterSync(() => {
         __logger.logInfo('Rental_RentItem table synchronized');
         RentItemToOfferRentItemEntity.sync({ force: !true });
      });
      OfferRentItemEntity.afterSync(() => {
         __logger.logInfo('Rental_OfferRentItem table synchronized');
         RentItemEntity.sync({ force: !true });
      });
      RecievePointEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + RecievePointModelName + ' table synchronized');
         OfferRentItemEntity.sync({ force: !true });
      })

      RentItemToOfferRentItemEntity.afterSync(() => {
        __logger.logInfo(schemaName + '_' +RentItemToOfferRentItemModelName+' table synchronized');
        this._isRentalSchemaSynced = true;
        __logger.logInfo(schemaName + ' schema synchronized');
        afterRentalSchemaSync();
      });


      RecievePointEntity.sync({ force: !true });
      return this.As<SqliteModule>();
   }
}