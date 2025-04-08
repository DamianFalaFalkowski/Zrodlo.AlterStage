
import { DataTypes, Sequelize} from "sequelize";
import { IRentalDataInstance, RentalInstance, rentalSchemaName } from './rental-data.instance';
import { RentalDataModule } from "./rental-data.module";
import { __logger } from "../../../utils/dc-logger.util";
import { RentItemAttributes, RentItemEntity, RentItemModelName } from "../../model/sch.rental/entities/rent-item.entity";
import { RecievePointAttributes, RecievePointEntity, RecievePointModelName } from '../../model/sch.rental/entities/recieve-point.entity';
import { RentItem_RentOrder_Hash, RentItemToRentOrderModelName } from "../../model/sch.rental/hash-tables/rent-item-to-rent-order.hash-entity";
import { CustomerAttributes, CustomerEntity, CustomerModelName } from "../../model/sch.rental/entities/customer.entity";

import { OrderDeliveryAttributes, OrderDeliveryEntity, OrderDeliveryModelName } from "../../model/sch.rental/entities/order-delivery.entity";
import { RentOfferAttributes, RentOfferEntity, RentOfferModelName } from "../../model/sch.rental/entities/rent-offer.entity";
import { RentOffer_OfferDiscount_Hash, RentOfferToOfferDiscountModelName } from '../../model/sch.rental/hash-tables/rent-offer-to-offer-discount.hash-entity';
import { RentOffer_RentOrder_Hash, RentOfferToRentOrderModelName } from "../../model/sch.rental/hash-tables/rent-offer-to-rent-order.hash-entity";
import { RentOffer_OfferRentItem_Hash, RentOfferToOfferRentItemEntityName } from "../../model/sch.rental/hash-tables/rent-offer-to-offer-rent-item.hash-entity";
import { RentOffer_RecievePoint_Hash, RentOfferToRecievePointName } from "../../model/sch.rental/hash-tables/rent-order-to-recieve-point.hash-entity";
import { AddressRepository } from "../../model/sch.rental/repositories/address.repository";
import { RentItemAviablility } from "../../model/sch.rental/enums/rent-item-aviablility.enum";
import { RentItemSize } from "../../model/sch.rental/enums/rent-item-size.enum";
import { OfferRentItemRepository } from "../../model/sch.rental/repositories/offer-rent-item.repository";
import { RentItemDamageAttributes, RentItemDamageEntity, RentItemDamageModelName } from "../../model/sch.rental/entities/rent-item-damage.entity";
import { IGetContextIntegrationConsumer } from "../../../app/app.data/app.data-modules/app-data.module/integrations/get-context.integration";
import { RentOrderAttributes, RentOrderEntity, RentOrderModelName } from "../../model/sch.rental/entities/rent-order.entity";
import { RecievePointRepository } from "../../model/sch.rental/repositories/recieve-point.repository";
import { RentOfferRepository } from "../../model/sch.rental/repositories/rent-offer.repository";
import { RentItemRepository } from "../../model/sch.rental/repositories/rent-item.repository";
import { AddressAttributes, AddressEntity, AddressModelName } from "../../model/sch.rental/entities/address.entity";
import { CustomerDiscountHistoryAttributes, CustomerDiscountHistoryEntity, CustomerDiscountHistoryModelName } from "../../model/sch.rental/entities/customer-discount-history.entity";
import { DeliveryInfoAttributes, DeliveryInfoEntity, DeliveryInfoModelName } from "../../model/sch.rental/entities/delivery-info.entity";
import { OfferDiscountAttributes, OfferDiscountEntity, OfferDiscountModelName } from "../../model/sch.rental/entities/offer-discount.entity";
import { OfferInfoAttributes, OfferInfoEntity, OfferInfoModelName } from "../../model/sch.rental/entities/offer-info.entity";
import { OfferRentItemAttributes, OfferRentItemEntity, OfferRentItemModelName } from "../../model/sch.rental/entities/offer-rent-item.entity";
import { OrderDeliveryActionAttributes, OrderDeliveryActionEntity, OrderDeliveryActionModelName } from "../../model/sch.rental/entities/order-delivery-action.entity";
import { AppModule } from "../../../app/app.modules/app.module";


/** ....
** .... */ 
export interface IRentalDataBuilder 
   extends IRentalDataInstance 
{
/** ....
** .... */ 
   InitSchema(afterRentalSchemaSync: () => void): RentalDataModule;

   PrepeareTestData(afterTestDataCreation: () => void): Promise<RentalDataModule>;
}


/** ....
** .... */ 
export abstract class RentalDataBuilder
   extends RentalInstance
   implements IRentalDataBuilder,
      // consuming
      IGetContextIntegrationConsumer
{
   abstract GetContext(): Sequelize

   async PrepeareTestData(afterTestDataCreation: () => void): Promise<RentalDataModule>
   {
      // Punkty odbioru (rezem z adresami)
      let addressOne = await AddressRepository.create(0, 'city2', 'street', 'house', 'postalCode');
      //let baseRecievePointDeliveryInfo = await DeliveryInfoRepository.create(0, 'na terenie Warszawy', true,RentItemAviablility.IMMEDIATELY, true, true,true, false, false, false, false, false, 300, 30, 2, undefined, 20, 20);
      let recievePointOne = await RecievePointRepository.create(0, addressOne.id, 0, 'fala studio RP', '513762535', 'panda.zrodlo@gmail.com', 'pierwszy testowy punkt odbioru', 'Damian', 'Falkowski', 1024238253060145193, 'falalala_wav', 'WAW', true);

      // Oferty
      let offerOne = await RentOfferRepository.create(0, 'Pioneer XDJ-700', 'Pojedyńczy multi-player XDJ-700', 100, 400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwSo1PUhaSJoaGMQN40sR_jBHjHl3xBN3DA&s');

      // Utworzenie przedmiotów fizycznych i umieszczenie ich w ofertach
      let rentItemOne = await RentItemEntity.findOne({ 'where': { 'code': 'WAW1_MPLA1'}});
      if(rentItemOne === null) {
         rentItemOne = await RentItemRepository.createWithNewOfferRentItem(0, 'Pioneer XDJ-700 multi-player', 'Pioneer', 'XDJ-700', RentItemSize.MEDIUM, recievePointOne, 'MPLA', 1010010001, RentItemAviablility.IMMEDIATELY);
         await OfferRentItemRepository.attachToRentOffer(await rentItemOne.getOfferRentItem(), offerOne.id, true);
      }
      let rentItemTwo = await RentItemEntity.findOne({ 'where': { 'code': 'WAW1-RCA2'}});
      if(rentItemTwo === null) {
         rentItemTwo = await RentItemRepository.createWithNewOfferRentItem(0, 'Kabel RCA 1,5m', '', 'Chinch 1.5m', RentItemSize.SMALL, recievePointOne, 'RCA', 1010010002, RentItemAviablility.IMMEDIATELY);
         await OfferRentItemRepository.attachToRentOffer(await rentItemTwo.getOfferRentItem(), offerOne.id, false);
      }
      let rentItemThree = await RentItemEntity.findOne({ 'where': { 'code': 'WAW1-ETH3'}});
      if(rentItemThree === null) {
         rentItemThree = await RentItemRepository.createWithNewOfferRentItem(0, 'Kabel Ethernet 1m', '', 'Ethernet 1.5m', RentItemSize.SMALL, recievePointOne, 'ETH', 1010010003, RentItemAviablility.IMMEDIATELY);
         await OfferRentItemRepository.attachToRentOffer(await rentItemThree.getOfferRentItem(), offerOne.id, false);
      }

      let offerItems = await offerOne.getOfferRentItems((await RentOffer_OfferRentItem_Hash.findOne({ 'where': { 'RentalRentOfferId': offerOne.id} }))!);

      afterTestDataCreation();
      return this as unknown as RentalDataModule;
   }

/** Uruchamia operacje inicializacji bazy danych.
** II. RENTAL SCHEMA */ 
   public InitSchema(afterRentalSchemaSync: () => void): RentalDataModule 
   {
   //--> 1. INIT DATA MODELS
      AddressEntity.init(
         AddressAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + AddressModelName }
      );
      CustomerDiscountHistoryEntity.init(
         CustomerDiscountHistoryAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + CustomerDiscountHistoryModelName }
      );
      CustomerEntity.init(
         CustomerAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + CustomerModelName }
      );
      DeliveryInfoEntity.init(
         DeliveryInfoAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + DeliveryInfoModelName }
      );
      OfferDiscountEntity.init(
         OfferDiscountAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + OfferDiscountModelName }
      );
      OfferInfoEntity.init(
         OfferInfoAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + OfferInfoModelName }
      );
      OfferRentItemEntity.init(
         OfferRentItemAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + OfferRentItemModelName }
      );
      OrderDeliveryActionEntity.init(
         OrderDeliveryActionAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + OrderDeliveryActionModelName }
      );
      OrderDeliveryEntity.init(
         OrderDeliveryAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + OrderDeliveryModelName }
      );
      RecievePointEntity.init(
         RecievePointAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + RecievePointModelName }
      );
      RentItemDamageEntity.init(RentItemDamageAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + RentItemDamageModelName }
      );
      RentItemEntity.init(RentItemAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + RentItemModelName }
      );
      RentOfferEntity.init(
         RentOfferAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + RentOfferModelName }
      )
      RentOrderEntity.init(
         RentOrderAttributes,
         { sequelize: this.GetContext(), modelName: rentalSchemaName + '_' + RentOrderModelName }
      )


   //--> 2. INIT HASH TABLES
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
            },
            // from base
            createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: new Date()
            },
            updatedAt: {
               type: DataTypes.DATE,
               allowNull: true
            },
         },
         {
            sequelize: this.GetContext(),
            modelName: rentalSchemaName + '_' + RentItemToRentOrderModelName,
         }
      );
      RentOffer_OfferDiscount_Hash.init(
         {
            RentalRentOfferId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOfferEntity,
                  key: 'id',
               },
            },
            RentalOfferDiscountId: {
               type: DataTypes.INTEGER,
               references: {
                  model: OfferDiscountEntity,
                  key: 'id',
               },
            },
            // from base
            createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: new Date()
            },
            updatedAt: {
               type: DataTypes.DATE,
               allowNull: true
            },
         },
         {
            sequelize: this.GetContext(),
            modelName: rentalSchemaName + '_' + RentOfferToOfferDiscountModelName,
         }
      );
      RentOffer_RentOrder_Hash.init(
         {
            RentalRentOfferId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOfferEntity,
                  key: 'id',
               },
            },
            RentalRentOrderId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOrderEntity,
                  key: 'id',
               },
            },
            // from base
            createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: new Date()
            },
            updatedAt: {
               type: DataTypes.DATE,
               allowNull: true
            },
         },
         {
            sequelize: this.GetContext(),
            modelName: rentalSchemaName + '_' + RentOfferToRentOrderModelName,
         }
      );
      RentOffer_OfferRentItem_Hash.init(
         {
            RentalRentOfferId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOfferEntity,
                  key: 'id',
               },
            },
            RentalOfferRentItemId: {
               type: DataTypes.INTEGER,
               references: {
                  model: OfferRentItemEntity,
                  key: 'id',
               },
            },
            // from base
            createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: new Date()
            },
            updatedAt: {
               type: DataTypes.DATE,
               allowNull: true
            },
         },
         {
            sequelize: this.GetContext(),
            modelName: rentalSchemaName + '_' + RentOfferToOfferRentItemEntityName,
         }
      );
      RentOffer_RecievePoint_Hash.init(
         {
            RentalRentOfferId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RentOfferEntity,
                  key: 'id',
               },
            },
            RentalRecievePointId: {
               type: DataTypes.INTEGER,
               references: {
                  model: RecievePointEntity,
                  key: 'id',
               },
            },
            // from base
            createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: new Date()
            },
            updatedAt: {
               type: DataTypes.DATE,
               allowNull: true
            },
         },
         {
            sequelize: this.GetContext(),
            modelName: rentalSchemaName + '_' + RentOfferToRecievePointName,
         }
      );
      __logger.logInfo(rentalSchemaName + ' initialized');


   //--> 3. CONFIGURE DB RELATIONS

// * 1.Address has 1.RecievePoint, RecievePoint owns Address.FK
      AddressEntity.hasOne(RecievePointEntity);
      RecievePointEntity.belongsTo(AddressEntity);

// * 1.AddressEntity has 1.CustomerEntity, CustomerEntity owns AddressEntity.FK
      AddressEntity.hasOne(CustomerEntity);
      CustomerEntity.belongsTo(AddressEntity);

// * 1.OrderDelivery has 1.RentOrder, RentOrder owns OrderDelivery.FK
// ! ta relacja nie jest aktualnie zaimplementowana, nalezy upewnić się czy jest potrzebna
      OrderDeliveryEntity.hasOne(RentOrderEntity);
      RentOrderEntity.belongsTo(OrderDeliveryEntity);


// * 1.RecievePoint has [].RentItem, RecievePoint owns RentItem.FK
      RecievePointEntity.hasMany(RentItemEntity);
      RentItemEntity.belongsTo(RecievePointEntity);

// * 1.RentItemEntity has [].RentItemDamages, RentItemDamage owns RentOrder.FK
      RentItemEntity.hasMany(RentItemDamageEntity);
      RentItemDamageEntity.belongsTo(RentItemEntity)
      
// * 1.RecievePoint has [].RentOrders, RentOrder owns RecievePoint.FK
      RecievePointEntity.hasMany(RentOrderEntity);
      RentOrderEntity.belongsTo(RecievePointEntity);
      
// * 1.Customer has [].RentOrders, RentOrder owns Customer.FK
      CustomerEntity.hasMany(RentOrderEntity);
      RentOrderEntity.belongsTo(CustomerEntity);

// * 1.RentOrder has [].RentItemDamages, RentItemDamage owns RentOrder.FK
      RentOrderEntity.hasMany(RentItemDamageEntity);
      RentItemDamageEntity.belongsTo(RentOrderEntity);

// * 1.RentOrder has [].CustomerDiscountHistory, CustomerDiscountHistory owns RentOrder.FK
      RentOrderEntity.hasMany(CustomerDiscountHistoryEntity);
      CustomerDiscountHistoryEntity.belongsTo(RentOrderEntity);

// * 1.Customer has [].CustomerDiscountHistory, CustomerDiscountHistory owns RentOrder.FK
      CustomerEntity.hasMany(CustomerDiscountHistoryEntity);
      CustomerDiscountHistoryEntity.belongsTo(CustomerEntity);

// * 1.OfferDiscount has [].CustomerDiscountHistory, CustomerDiscountHistory owns RentOrder.FK
      OfferDiscountEntity.hasMany(CustomerDiscountHistoryEntity);
      CustomerDiscountHistoryEntity.belongsTo(OfferDiscountEntity);

// * 1.RentOffer has [].OfferInfo, OfferInfo owns RentOffer.FK
      RentOfferEntity.hasMany(OfferInfoEntity);
      OfferInfoEntity.belongsTo(RentOfferEntity);

// * 1.OfferRentOffer has [].RentItem, RentItem owns OfferRentItem.FK
      OfferRentItemEntity.hasMany(RentItemEntity);
      RentItemEntity.belongsTo(OfferRentItemEntity);

// ! TODO: na razie kompletność i poprawność nie będzie realizowana. najpierw chcę obsłuyć operacje na strukturze z pominięciem funkcjonalności dostawy 
      RecievePointEntity.hasMany(OrderDeliveryActionEntity);
      OrderDeliveryActionEntity.belongsTo(RecievePointEntity);

// * [..] RentOrder has [..] RentItems and vice versa
      RentOrderEntity.belongsToMany(RentItemEntity,
         { through: RentItem_RentOrder_Hash });
      RentItemEntity.belongsToMany(RentOrderEntity,
         { through: RentItem_RentOrder_Hash });

// * [..] RentOffer has [..] OfferDiscount and vice versa
      RentOfferEntity.belongsToMany(OfferDiscountEntity,
         { through: RentOffer_OfferDiscount_Hash });
      OfferDiscountEntity.belongsToMany(RentOfferEntity,
         { through: RentOffer_OfferDiscount_Hash });

// * [..] RentOffer has [..] RentOrders and vice versa
      RentOfferEntity.belongsToMany(RentOrderEntity,
         { through: RentOffer_RentOrder_Hash });
      RentOrderEntity.belongsToMany(RentOfferEntity,
         { through: RentOffer_RentOrder_Hash });

// * [..] RentOffer has [..] OfferRentItems and vice versa
      RentOfferEntity.belongsToMany(OfferRentItemEntity,
         { through: RentOffer_OfferRentItem_Hash });
         OfferRentItemEntity.belongsToMany(RentOfferEntity,
         { through: RentOffer_OfferRentItem_Hash});

// * [..] RentOffer has [..] RecievePoints and vice versa
      let OfferRentItems2 = RentOfferEntity.belongsToMany(RecievePointEntity,
         { through: RentOffer_RecievePoint_Hash});
      RecievePointEntity.belongsToMany(RentOfferEntity,
         { through: RentOffer_RecievePoint_Hash });

      __logger.logInfo(rentalSchemaName + ' relations set');

   //--> 4. SYNC MODEL WITH DB
      RentOffer_OfferRentItem_Hash.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentOfferToOfferRentItemEntityName+' table synchronized');
         this.isRentalSchemaSynced = true;     
         __logger.logInfo(rentalSchemaName + ' schema synchronized'); 
         afterRentalSchemaSync();
      });
      RentOffer_RecievePoint_Hash.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentOfferToRentOrderModelName+' table synchronized');
         RentOffer_OfferRentItem_Hash.sync({ force: this._forceSync });
      });
      RentOffer_RentOrder_Hash.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentOfferToRentOrderModelName+' table synchronized');
         RentOffer_RecievePoint_Hash.sync({ force: this._forceSync });
      });
      RentOffer_OfferDiscount_Hash.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentOfferToOfferDiscountModelName+' table synchronized');
         RentOffer_RentOrder_Hash.sync({ force: this._forceSync });
      });
      RentItem_RentOrder_Hash.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentItemToRentOrderModelName+' table synchronized');
         RentOffer_OfferDiscount_Hash.sync({ force: this._forceSync });
      });
      OrderDeliveryActionEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +OrderDeliveryActionModelName+' table synchronized');
         RentItem_RentOrder_Hash.sync({ force: this._forceSync });
      });
      DeliveryInfoEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +DeliveryInfoModelName+' table synchronized');
         OrderDeliveryActionEntity.sync({ force: this._forceSync });
      });
      RentItemDamageEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentItemDamageModelName+' table synchronized');
         DeliveryInfoEntity.sync({ force: this._forceSync });
      });
      OfferRentItemEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + OfferRentItemModelName + ' table synchronized');
         RentItemDamageEntity.sync({ force: this._forceSync });
      });
      CustomerDiscountHistoryEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +CustomerDiscountHistoryModelName+' table synchronized');
         OfferRentItemEntity.sync({ force: this._forceSync });
      });
      RentOrderEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentOrderModelName+' table synchronized');
         CustomerDiscountHistoryEntity.sync({ force: this._forceSync });
      });
      OrderDeliveryEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +OrderDeliveryModelName+' table synchronized');
         RentOrderEntity.sync({ force: this._forceSync });
      });
      CustomerEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +CustomerModelName+' table synchronized');
         OrderDeliveryEntity.sync({ force: this._forceSync });
      });
      OfferInfoEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + OfferInfoModelName + ' table synchronized');
         CustomerEntity.sync({ force: this._forceSync });
      });
      OfferDiscountEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + OfferDiscountModelName + ' table synchronized');
         OfferInfoEntity.sync({ force: this._forceSync });
      });
      RentOfferEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + RentOfferModelName + ' table synchronized');
         OfferDiscountEntity.sync({ force: this._forceSync });
      });
      RecievePointEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + RecievePointModelName + ' table synchronized');
         RentOfferEntity.sync({ force: this._forceSync });
      });
      RentItemEntity.afterSync(() => {
         __logger.logInfo(rentalSchemaName + '_' +RentItemModelName+' table synchronized');
         RecievePointEntity.sync({ force: this._forceSync });
      });
      AddressEntity.afterSync(() => {
         __logger.logInfo(
            rentalSchemaName + '_' + AddressModelName + ' table synchronized');
         RentItemEntity.sync({ force: this._forceSync });
      });
      AddressEntity.sync({ force: this._forceSync });

   //--> 5. RETURN MODULE WITH RENTAL SCHEMA
      return this as unknown as RentalDataModule;
   }
}