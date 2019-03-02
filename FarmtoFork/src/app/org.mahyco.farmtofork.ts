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
      quantity: string;
      harvestLocation: string;
      owner: Actor;
      inCustodyOf: Actor;
   }
   export class Contract extends Asset {
      contractId: string;
      farmer: Farmer;
      distributor: Distributor;
      retailer: Retailer;
      product: Product;
      unitPrice: number;
      unitCount: number;
   }
   export class DummyData extends Transaction {
   }
   export class CreateProduct extends Transaction {
      name: string;
      variety: string;
      quantity: string;
      harvestLocation: string;
   }
   export class CreateContract extends Transaction {
      farmerId: string;
      distributorId: string;
      retailerId: string;
      productId: string;
      unitPrice: number;
      unitCount: number;
   }
   export class statusUpdate extends Transaction {
      product: Product;
      farmer: Farmer;
      distributor: Distributor;
      retailActor: Retailer;
   }
// }
