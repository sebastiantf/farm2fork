import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.mahyco.farmtofork{
   export abstract class Actor extends Participant {
      firstName: string;
      lastName: string;
      accountBalance: number;
   }
   export class Farmer extends Actor {
      farmerId: string;
   }
   export class Shipper extends Actor {
      shipperId: string;
   }
   export class Warehouseman extends Actor {
      warehousemanId: string;
   }
   export class Distributor extends Actor {
      distributorId: string;
   }
   export class Retailer extends Actor {
      retailerId: string;
   }
   export class Product extends Asset {
      productId: string;
      name: string;
      variety: string;
      productType: ProductType;
      quantity: string;
      productStatus: ProductStatus;
      harvestLocation: string;
      manufactured: Date;
      expiry: Date;
      pesticides: string[];
      fertilizers: string[];
      seeds: string[];
      rating: number;
      owner: Actor;
   }
   export enum ProductType {
      FERTILIZER,
      PESTICIDE,
      SEED,
      FOOD,
   }
   export enum ProductStatus {
      INITIATED,
      HARVESTED,
   }
   export class Contract extends Asset {
      contractId: string;
      warehouseman: Warehouseman;
      farmer: Farmer;
      distributor: Distributor;
      retailer: Retailer;
      shipper: Shipper;
      product: Product;
      unitPrice: number;
      unitCount: number;
      termsandcondtns: string;
      issuedDate: Date;
      promisedDate: Date;
   }
   export class Shipment extends Asset {
      shipmentId: string;
      contract: Contract;
      modeOfTransport: string;
      currentLocation: string;
      shipmentStatus: ShipmentStatus;
      inCustodyOf: Actor;
   }
   export enum ShipmentStatus {
      CREATED,
      IN_TRANSIT,
      AT_WAREHOUSE,
      AT_DISTRIBUTOR,
      AT_RETAILER,
   }
   export class DummyData extends Transaction {
   }
   export class CreateProduct extends Transaction {
      name: string;
      variety: string;
      productType: ProductType;
      quantity: string;
      productStatus: ProductStatus;
      harvestLocation: string;
      daysForExpiry: number;
      pesticides: string[];
      fertilizers: string[];
      seeds: string[];
      rating: number;
      ownerType: string;
      ownerId: string;
   }
   export class CreateContract extends Transaction {
      warehousemanId: string;
      farmerId: string;
      distributorId: string;
      retailerId: string;
      shipperId: string;
      productId: string;
      unitPrice: number;
      unitCount: number;
      termsandcondtns: string;
      promisedNoOfDays: number;
   }
   export class CreateShipment extends Transaction {
      contractId: string;
      modeOfTransport: string;
      currentLocation: string;
      shipmentStatus: ShipmentStatus;
      inCustodyOfType: string;
      inCustodyOfId: string;
   }
   export class ShipmentStatusUpdate extends Transaction {
      shipment: Shipment;
      shipmentStatus: ShipmentStatus;
   }
   export class ProductStatusUpdate extends Transaction {
      product: Product;
      productStatus: ProductStatus;
   }
   export class ProductOwnerChange extends Transaction {
      product: Product;
      ownerType: string;
      ownerId: string;
   }
   export class ShipmentInCustodyOfChange extends Transaction {
      shipment: Shipment;
      inCustodyOfType: string;
      inCustodyOfId: string;
   }
// }
