
import { DataTypes, Dialect, Sequelize } from "sequelize";
import { ISqliteInstance, SqliteInstance } from './app-data.sqlite.instance';
import { SqliteModule } from "./app-data.sqlite.module";
import { TagsAttributes, TagsModelName, TagsEntity } from '../../app.data-model/sch.app/tags.model'
import { __logger } from "../../../../utils/dc-logger.util";
import { OfferRentItemAttributes, OfferRentItemEntity, OfferRentItemModelName } from "../../app.data-model/sch.rental/offer-rent-item.model";
import { RentItemAttributes, RentItemEntity, RentItemModelName } from "../../app.data-model/sch.rental/rent-item.model";
import { RentItem_OfferRentItem_Hash, RentItemToOfferRentItemModelName } from "../../app.data-model/sch.rental/hash-tables/rent-item-to-offer-rent-item.hash-model";
import { RecievePointAttributes, RecievePointEntity, RecievePointModelName } from "../../app.data-model/sch.rental/recieve-point.model";
import { RentItemDamageAttributes, RentItemDamageEntity, RentItemDamageModelName } from "../../app.data-model/sch.rental/rent-item-damage.model";
import { RentOrderAttributes, RentOrderEntity, RentOrderModelName } from '../../app.data-model/sch.rental/rent-order.model';
import { RentItem_RentOrder_Hash, RentItemToRentOrderModelName } from "../../app.data-model/sch.rental/hash-tables/rent-item-to-rent-order.hash-model";
import { AddressAttributes, AddressEntity, AddressModelName } from "../../app.data-model/sch.rental/address.model";
import { CustomerDiscountHistoryAttributes, CustomerDiscountHistoryEntity, CustomerDiscountHistoryModelName } from "../../app.data-model/sch.rental/customer-discount-history.model";
import { CustomerAttributes, CustomerEntity, CustomerModelName } from "../../app.data-model/sch.rental/customer.model";
import { DeliveryInfoAttributes, DeliveryInfoEntity, DeliveryInfoModelName } from "../../app.data-model/sch.rental/delivery-info.model";
import { OfferDiscountAttributes, OfferDiscountEntity, OfferDiscountModelName } from "../../app.data-model/sch.rental/offer-discount.model";
import { OfferInfoAttributes, OfferInfoEntity, OfferInfoModelName } from "../../app.data-model/sch.rental/offer-info.model";
import { OrderDeliveryActionAttributes, OrderDeliveryActionEntity, OrderDeliveryActionModelName } from "../../app.data-model/sch.rental/order-delivery-action.model";
import { OrderDeliveryAttributes, OrderDeliveryEntity, OrderDeliveryModelName } from "../../app.data-model/sch.rental/order-delivery.model";
import { RentOfferAttributes, RentOfferEntity, RentOfferModelName } from "../../app.data-model/sch.rental/rent-offer.model";

export interface ISqliteBuilder 
   extends ISqliteInstance 
{
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
   implements ISqliteBuilder 
{

// 0. SET UP CONNECTION
   public SetDbConnection(
      databaseName: string,
      userName: string,
      password: string,
      host: string,
      dialect: Dialect,
      logging: boolean,
      storage: string): SqliteModule 
   {
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

// I. APP SCHEMA
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
      TagsEntity.sync({ force: this._forceSync });
      return this.As<SqliteModule>();
   }

// II. RENTAL SCHEMA
   public InitRentalSchema(afterRentalSchemaSync: () => void): SqliteModule 
   {
      const schemaName = 'Rental'

//--> 1. INIT DATA MODELS
      AddressEntity.init(
         AddressAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + AddressModelName }
      );
      CustomerDiscountHistoryEntity.init(
         CustomerDiscountHistoryAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + CustomerDiscountHistoryModelName }
      );
      CustomerEntity.init(
         CustomerAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + CustomerModelName }
      );
      DeliveryInfoEntity.init(
         DeliveryInfoAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + DeliveryInfoModelName }
      );
      OfferDiscountEntity.init(
         OfferDiscountAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + OfferDiscountModelName }
      );
      OfferInfoEntity.init(
         OfferInfoAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + OfferInfoModelName }
      );
      OfferRentItemEntity.init(
         OfferRentItemAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + OfferRentItemModelName }
      );
      OrderDeliveryActionEntity.init(
         OrderDeliveryActionAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + OrderDeliveryActionModelName }
      );
      OrderDeliveryEntity.init(
         OrderDeliveryAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + OrderDeliveryModelName }
      );
      RecievePointEntity.init(
         RecievePointAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + RecievePointModelName }
      );
      RentItemDamageEntity.init(RentItemDamageAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + RentItemDamageModelName }
      );
      RentItemEntity.init(RentItemAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + RentItemModelName }
      );
      RentOfferEntity.init(
         RentOfferAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + RentOfferModelName }
      )
      RentOrderEntity.init(
         RentOrderAttributes,
         { sequelize: this._context!, modelName: schemaName + '_' + RentOrderModelName }
      )
      __logger.logInfo(schemaName + ' initialized');

//--> 2. INIT HASH TABLES
      RentItem_OfferRentItem_Hash.init(
         {
            RentalRentItemId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentItemEntity,
                  key: 'id',
               },
            },
            RentalOfferRentItemId: {
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
      RentItem_RentOrder_Hash.init(
         {
            RentalRentItemId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentItemEntity,
                  key: 'id',
               },
            },
            RentalRentOrderId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOrderEntity,
                  key: 'id',
               },
            }
         },
         {
            sequelize: this._context!,
            modelName: schemaName + '_' + RentItemToRentOrderModelName,
         }
      );

//--> 3. CONFIGURE DB RELATIONS
      // EXAMPLE: one-to-one relation
      // declare foreignKey of DeliveryInfo in RecievePoint
      DeliveryInfoEntity.hasOne(RecievePointEntity);
      RecievePointEntity.belongsTo(DeliveryInfoEntity);

      // EXAMPLE: one-to-many relation
      // declare foreignKey of (home)RecievePoint in RentItem, recieve point has many RentItems
      RecievePointEntity.hasMany(RentItemEntity);
      RentItemEntity.belongsTo(RecievePointEntity);
      
      RentItemEntity.hasMany(RentItemDamageEntity);
      RentItemDamageEntity.belongsTo(RentItemEntity)
      
      RecievePointEntity.hasMany(RentOrderEntity);
      RentOrderEntity.belongsTo(RecievePointEntity);
      
      CustomerEntity.hasMany(RentOrderEntity);
      RentOrderEntity.belongsTo(CustomerEntity);

      OrderDeliveryEntity.hasMany(RentOrderEntity);
      RentOrderEntity.belongsTo(OrderDeliveryEntity);

      RentOrderEntity.hasMany(RentItemDamageEntity);
      RentItemDamageEntity.belongsTo(RentOrderEntity);

      RentOrderEntity.hasMany(CustomerDiscountHistoryEntity);
      CustomerDiscountHistoryEntity.belongsTo(RentOrderEntity);

      // EXAMPLE: many-to-many relation
      OfferRentItemEntity.belongsToMany(RentItemEntity,
         { through: RentItem_OfferRentItem_Hash });
      RentItemEntity.belongsToMany(OfferRentItemEntity,
         { through: RentItem_OfferRentItem_Hash });

      RentOrderEntity.belongsToMany(RentItemEntity,
         { through: RentItem_RentOrder_Hash });
      RentItemEntity.belongsToMany(RentOrderEntity,
         { through: RentItem_RentOrder_Hash });

      __logger.logInfo(schemaName + ' relations set');

//--> 4. SYNC MODEL WITH DB
      RentItem_OfferRentItem_Hash.afterSync(() => {
        __logger.logInfo(schemaName + '_' +RentItemToOfferRentItemModelName+' table synchronized');
        this._isRentalSchemaSynced = true;
        __logger.logInfo(schemaName + ' schema synchronized');
        afterRentalSchemaSync();
      });
      RentItem_RentOrder_Hash.afterSync(() => {
         __logger.logInfo(schemaName + '_' +RentItemToRentOrderModelName+' table synchronized');
         RentItem_OfferRentItem_Hash.sync({ force: this._forceSync });
      });

      RentOfferEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +OrderDeliveryActionModelName+' table synchronized');
         RentItem_RentOrder_Hash.sync({ force: this._forceSync });
      })
      OrderDeliveryActionEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +OrderDeliveryActionModelName+' table synchronized');
         RentItem_RentOrder_Hash.sync({ force: this._forceSync });
      });
      DeliveryInfoEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +DeliveryInfoModelName+' table synchronized');
         OrderDeliveryActionEntity.sync({ force: this._forceSync });
      });
      RentItemDamageEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +RentItemDamageModelName+' table synchronized');
         DeliveryInfoEntity.sync({ force: this._forceSync });
      });
      RentItemEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +RentItemModelName+' table synchronized');
         RentItemDamageEntity.sync({ force: this._forceSync });
      });
      OfferRentItemEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + OfferRentItemModelName + ' table synchronized');
         RentItemEntity.sync({ force: this._forceSync });
      });
      CustomerDiscountHistoryEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +CustomerDiscountHistoryModelName+' table synchronized');
         OfferRentItemEntity.sync({ force: this._forceSync });
      });
      RentOrderEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +RentOrderModelName+' table synchronized');
         CustomerDiscountHistoryEntity.sync({ force: this._forceSync });
      });
      OrderDeliveryEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +OrderDeliveryModelName+' table synchronized');
         RentOrderEntity.sync({ force: this._forceSync });
      });
      CustomerEntity.afterSync(() => {
         __logger.logInfo(schemaName + '_' +CustomerModelName+' table synchronized');
         OrderDeliveryEntity.sync({ force: this._forceSync });
      });
      OfferInfoEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + OfferInfoModelName + ' table synchronized');
         CustomerEntity.sync({ force: this._forceSync });
      });
      OfferDiscountEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + RentOfferModelName + ' table synchronized');
         OfferInfoEntity.sync({ force: this._forceSync });
      });
      RentOfferEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + RentOfferModelName + ' table synchronized');
         OfferDiscountEntity.sync({ force: this._forceSync });
      });
      RecievePointEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + RecievePointModelName + ' table synchronized');
         RentOfferEntity.sync({ force: this._forceSync });
      });
      AddressEntity.afterSync(() => {
         __logger.logInfo(
            schemaName + '_' + AddressModelName + ' table synchronized');
         RecievePointEntity.sync({ force: this._forceSync });
      });
      AddressEntity.sync({ force: this._forceSync });

//--> 5. RETURN MODULE WITH RENTAL SCHEMA
      return this.As<SqliteModule>();
   }
}