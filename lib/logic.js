/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
* DummyData - Generate Dummy Data
* @param {org.mahyco.farmtofork.DummyData} tx
* @transaction
*/
async function dummyData(tx) {
    // Farmer
    // Get the factory.
    var factory = getFactory();

    // Create a new Farmer.
    var farmer = factory.newResource('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    // Set the properties of the new farmer.
    farmer.firstName = 'Farmer 1';
    farmer.lastName = 'Farmer 1';
    farmer.accountBalance = 15000;
    // farmer.actorLocation = 'Farmer Location';

    // Create a new Shipper.
    var shipper = factory.newResource('org.mahyco.farmtofork', 'Shipper', 'SHIPPER_001');
    // Set the properties of the new farmer.
    shipper.firstName = 'Shipper 1';
    shipper.lastName = 'Shipper 1';
    shipper.accountBalance = 15000;
    // shipper.actorLocation = 'Shipper Location';

    // Create a new Warehouseman.
    var warehouseman = factory.newResource('org.mahyco.farmtofork', 'Warehouseman', 'WAREHOUSEMAN_001');
    // Set the properties of the new farmer.
    warehouseman.firstName = 'Warehouseman 1';
    warehouseman.lastName = 'Warehouseman 1';
    warehouseman.accountBalance = 15000;
    // warehouseman.actorLocation = 'Warehouseman Location';

    // Create a new Distributor.
    var distributor = factory.newResource('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');
    // Set the properties of the new farmer.
    distributor.firstName = 'Distributor 1';
    distributor.lastName = 'Distributor 1';
    distributor.accountBalance = 15000;
    // distributor.actorLocation = 'Distributor Location';


    // Create a new Retailer.
    var retailer = factory.newResource('org.mahyco.farmtofork', 'Retailer', 'RETAILER_001');
    // Set the properties of the new farmer.
    retailer.firstName = 'Retailer 1';
    retailer.lastName = 'Retailer 1';
    retailer.accountBalance = 15000;
    // retailer.actorLocation = 'Retailer Location';


    // Product
    var product = factory.newResource('org.mahyco.farmtofork', 'Product', 'PROD_001');
    // Set the properties of the new vehicle.
    product.name = 'Mango';
    product.variety = 'Malgova';
    product.productType = 'FOOD';
    product.quantity = '25kg';
    product.productStatus = 'INITIATED';
    product.harvestLocation = 'Thrissur';
    var manufactured = tx.timestamp;
    product.manufactured = manufactured;
    manufactured.setDate(manufactured.getDate() + 30);
    product.expiry = manufactured;
    product.pesticides = ['pesticide1', 'pesticide2', 'pesticide3'];
    product.fertilizers = ['fertilize1', 'fertilizer2', 'fertilizer3'];
    product.seeds = ['seed1', 'seed2', 'seed3'];
    product.rating = 4.5;
    product.owner = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    // var newTrace = factory.newConcept('org.mahyco.farmtofork', 'Trace');
    // newTrace.timestamp = tx.timestamp;
    // newTrace.location = product.owner.actorLocation;
    // newTrace.owner = product.owner;
    // product.trace.push(newTrace);

    // Contract1
    var contract1 = factory.newResource('org.mahyco.farmtofork', 'Contract', 'CON_001');
    // Set the properties of the new vehicle.
    contract1.farmer = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    contract1.distributor = factory.newRelationship('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');
    // contract1.retailer = factory.newRelationship('org.mahyco.farmtofork', 'Retailer', 'RETAILER_001');
    contract1.product = factory.newRelationship('org.mahyco.farmtofork', 'Product', 'PROD_001');
    contract1.unitPrice = 15;
    contract1.unitCount = 1000;
    contract1.termsandcondtns = 'These are the terms and conditions';
    var issuedDate1 = tx.timestamp;
    contract1.issuedDate = issuedDate1;
    issuedDate1.setDate(issuedDate1.getDate() + 30);
    contract1.promisedDate = issuedDate1;
    // contract1.issuedDate = tx.timestamp.getDate();
    // contract1.promisedDate = tx.timestamp.getDate() + 30;

    // Contract2
    var contract2 = factory.newResource('org.mahyco.farmtofork', 'Contract', 'CON_002');
    // Set the properties of the new vehicle.
    // contract2.farmer = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    contract2.distributor = factory.newRelationship('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');
    contract2.retailer = factory.newRelationship('org.mahyco.farmtofork', 'Retailer', 'RETAILER_001');
    contract2.product = factory.newRelationship('org.mahyco.farmtofork', 'Product', 'PROD_001');
    contract2.unitPrice = 15;
    contract2.unitCount = 1000;
    contract2.termsandcondtns = 'These are the terms and conditions';
    var issuedDate2 = tx.timestamp;
    contract2.issuedDate = issuedDate2;
    issuedDate2.setDate(issuedDate2.getDate() + 30);
    contract2.promisedDate = issuedDate2;

    // Shipment1
    var shipment1 = factory.newResource('org.mahyco.farmtofork', 'Shipment', 'SHIP_001');
    // Set the properties of the new vehicle.
    shipment1.contract = factory.newRelationship('org.mahyco.farmtofork', 'Contract', 'CON_001');
    shipment1.modeOfTransport = 'Truck';
    shipment1.currentLocation = 'Thrissur';
    shipment1.shipmentStatus = 'CREATED';
    shipment1.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');

    // Shipment2
    var shipment2 = factory.newResource('org.mahyco.farmtofork', 'Shipment', 'SHIP_002');
    // Set the properties of the new vehicle.
    shipment2.contract = factory.newRelationship('org.mahyco.farmtofork', 'Contract', 'CON_002');
    shipment2.modeOfTransport = 'Truck';
    shipment2.currentLocation = 'Thrissur';
    shipment2.shipmentStatus = 'CREATED';
    shipment2.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');


    return getParticipantRegistry('org.mahyco.farmtofork.Farmer')
        .then(function (farmerRegistry) {
            // add the growers
            return farmerRegistry.addAll([farmer]);
        })
        .then(function () {
            return getParticipantRegistry('org.mahyco.farmtofork.Shipper');
        })
        .then(function (shipperRegistry) {
            // add the importers
            return shipperRegistry.addAll([shipper]);
        })
        .then(function () {
            return getParticipantRegistry('org.mahyco.farmtofork.Warehouseman');
        })
        .then(function (warehousemanRegistry) {
            // add the importers
            return warehousemanRegistry.addAll([warehouseman]);
        })
        .then(function () {
            return getParticipantRegistry('org.mahyco.farmtofork.Distributor');
        })
        .then(function (distributorRegistry) {
            // add the shippers
            return distributorRegistry.addAll([distributor]);
        })
        .then(function () {
            return getParticipantRegistry('org.mahyco.farmtofork.Retailer');
        })
        .then(function (retailerRegistry) {
            // add the contracts
            return retailerRegistry.addAll([retailer]);
        })
        .then(function () {
            return getAssetRegistry('org.mahyco.farmtofork.Product');
        })
        .then(function (productRegistry) {
            // add the shipments
            return productRegistry.addAll([product]);
        })
        .then(function () {
            return getAssetRegistry('org.mahyco.farmtofork.Contract');
        })
        .then(function (contractRegistry) {
            // add the shipments
            return contractRegistry.addAll([contract1, contract2]);
        })
        .then(function () {
            return getAssetRegistry('org.mahyco.farmtofork.Shipment');
        })
        .then(function (shipmentRegistry) {
            // add the importers
            return shipmentRegistry.addAll([shipment1, shipment2]);
        });
}


// ------------------------------------------------------------------------------------------------
/**
 * CreateProduct - Farmer Creates Product
 * @param {org.mahyco.farmtofork.CreateProduct} tx
 * @transaction
 */
async function createProduct(tx) {
    var factory = getFactory();
    var product = factory.newResource('org.mahyco.farmtofork', 'Product', 'PROD_101');
    product.name = tx.name;
    product.variety = tx.variety;
    product.productType = tx.productType;
    product.quantity = tx.quantity;
    product.productStatus = tx.productStatus;
    product.harvestLocation = tx.harvestLocation;
    var manufactured = tx.timestamp;
    product.manufactured = manufactured;
    manufactured.setDate(manufactured.getDate() + 30);
    product.expiry = manufactured;
    product.pesticides = tx.pesticides;
    product.fertilizers = tx.fertilizers;
    product.seeds = tx.seeds;
    product.rating = tx.rating;

    // Get the current participant.
    // var currentParticipant = getCurrentParticipant();
    // var currentParticipantType = currentParticipant.getType();
    // var currentParticipantIdentifier = currentParticipant.getIdentifier();

    product.owner = factory.newRelationship('org.mahyco.farmtofork', tx.ownerType, tx.ownerId);
    // product.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', currentParticipantType, currentParticipantIdentifier);

    // var newTrace = factory.newConcept('org.mahyco.farmtofork', 'Trace');
    // newTrace.timestamp = tx.timestamp;
    // newTrace.location = product.owner.actorLocation;
    // newTrace.owner = product.owner;
    // product.trace.push(newTrace);

    return getAssetRegistry('org.mahyco.farmtofork.Product')
        .then(function (productAssetRegistry) {
            productAssetRegistry.addAll([product]);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * CreateContract - Any Actor Creates Contract
 * @param {org.mahyco.farmtofork.CreateContract} tx
 * @transaction
 */
async function createContract(tx) {
    var factory = getFactory();
    var contract = factory.newResource('org.mahyco.farmtofork', 'Contract', 'CON_101');

    //Participants in contract
    // if (tx.manufacturerId !== 'null'){
    //     contract.manufacturer = factory.newRelationship('org.mahyco.farmtofork', 'Manufacturer', tx.manufacturerId);
    // }
    if (tx.warehousemanId !== 'null') {
        contract.warehouseman = factory.newRelationship('org.mahyco.farmtofork', 'Warehouseman', tx.warehousemanId);
    }
    if (tx.farmerId !== 'null') {
        contract.farmer = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', tx.farmerId);
    }
    if (tx.distributorId !== 'null') {
        contract.distributor = factory.newRelationship('org.mahyco.farmtofork', 'Distributor', tx.distributorId);
    }
    if (tx.retailerId !== 'null') {
        contract.retailer = factory.newRelationship('org.mahyco.farmtofork', 'Retailer', tx.retailerId);
    }
    if (tx.shipperId !== 'null') {
        contract.shipper = factory.newRelationship('org.mahyco.farmtofork', 'Shipper', tx.shipperId);
    }
    // contract.input = factory.newRelationship('org.mahyco.farmtofork', 'Product', tx.inputProductId);
    contract.product = factory.newRelationship('org.mahyco.farmtofork', 'Product', tx.productId);
    contract.unitPrice = tx.unitPrice;
    contract.unitCount = tx.unitCount;
    contract.termsandcondtns = tx.termsandcondtns;
    var issuedDate = tx.timestamp;
    contract.issuedDate = issuedDate;
    issuedDate.setDate(issuedDate.getDate() + 30);
    contract.promisedDate = issuedDate;
    return getAssetRegistry('org.mahyco.farmtofork.Contract')
        .then(function (contractAssetRegistry) {
            contractAssetRegistry.addAll([contract]);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * CreateShipment - Any Actor Creates Shipment
 * @param {org.mahyco.farmtofork.CreateShipment} tx
 * @transaction
 */
async function createShipment(tx) {
    var factory = getFactory();
    var shipment = factory.newResource('org.mahyco.farmtofork', 'Shipment', 'Ship_101');
    shipment.contract = factory.newRelationship('org.mahyco.farmtofork', 'Contract', tx.contractId);
    shipment.modeOfTransport = tx.modeOfTransport;
    shipment.currentLocation = tx.currentLocation;
    shipment.shipmentStatus = tx.shipmentStatus;
    // shipment.owner = factory.newRelationship('org.mahyco.farmtofork', 'Contract', tx.ownerId);
    // shipment.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', 'Contract', tx.inCustodyOfId);
    // Get the current participant.
    // var currentParticipant = getCurrentParticipant();
    // var currentParticipantType = currentParticipant.getType();
    // var currentParticipantIdentifier = currentParticipant.getIdentifier();

    // // shipment.owner = factory.newRelationship('org.mahyco.farmtofork', currentParticipantType, currentParticipantIdentifier);
    shipment.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', tx.inCustodyOfType, tx.inCustodyOfId);

    return getAssetRegistry('org.mahyco.farmtofork.Shipment')
        .then(function (contractAssetRegistry) {
            contractAssetRegistry.addAll([shipment]);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * ShipmentStatusUpdate - Update Shipment status
 * @param {org.mahyco.farmtofork.ShipmentStatusUpdate} tx
 * @transaction
 */
async function shipmentStatusUpdate(tx) {
    tx.shipment.shipmentStatus = tx.shipmentStatus;

    const shipmentRegistry = await getAssetRegistry('org.mahyco.farmtofork.Shipment');
    await shipmentRegistry.update(tx.shipment);
}

/**
 * ProductStatusUpdate - Update Product Status
 * @param {org.mahyco.farmtofork.ProductStatusUpdate} tx
 * @transaction
 */
async function productStatusUpdate(tx) {
    tx.product.productStatus = tx.productStatus;

    const productRegistry = await getAssetRegistry('org.mahyco.farmtofork.Product');
    await productRegistry.update(tx.product);
}


/**
 * ProductOwnerChange - Change product owner
 * @param {org.mahyco.farmtofork.ProductOwnerChange} tx
 * @transaction
 */
async function productOwnerChange(tx) {
    var factory = getFactory();

    // Get the current participant.
    // var currentParticipant = getCurrentParticipant();
    // var currentParticipantType = currentParticipant.getType();
    // var currentParticipantIdentifier = currentParticipant.getIdentifier();

    tx.product.owner = factory.newRelationship('org.mahyco.farmtofork', tx.ownerType, tx.ownerId);
    const productRegistry = await getAssetRegistry('org.mahyco.farmtofork.Product');
    await productRegistry.update(tx.product);
}

/**
 * ShipmentInCustodyOfChange - Change Shipment custody
 * @param {org.mahyco.farmtofork.ShipmentInCustodyOfChange} tx
 * @transaction
 */
async function shipmentInCustodyOfChange(tx) {
    var factory = getFactory();

    // Get the current participant.
    // var currentParticipant = getCurrentParticipant();
    // var currentParticipantType = currentParticipant.getType();
    // var currentParticipantIdentifier = currentParticipant.getIdentifier();

    tx.shipment.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', tx.inCustodyOfType, tx.inCustodyOfId);
    const shipmentRegistry = await getAssetRegistry('org.mahyco.farmtofork.Shipment');
    await shipmentRegistry.update(tx.shipment);
}
