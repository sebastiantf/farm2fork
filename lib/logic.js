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

    // Create a new Warehouseman.
    var warehouseman = factory.newResource('org.mahyco.farmtofork', 'Warehouseman', 'WAREHOUSEMAN_001');
    // Set the properties of the new farmer.
    warehouseman.firstName = 'Warehouseman 1';
    warehouseman.lastName = 'Warehouseman 1';
    warehouseman.accountBalance = 15000;

    // Create a new Distributor.
    var distributor = factory.newResource('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');
    // Set the properties of the new farmer.
    distributor.firstName = 'Warehouseman 1';
    distributor.lastName = 'Warehouseman 1';
    distributor.accountBalance = 15000;

    // Create a new Retailer.
    var retailer = factory.newResource('org.mahyco.farmtofork', 'Retailer', 'RETAILER_001');
    // Set the properties of the new farmer.
    retailer.firstName = 'Retailer 1';
    retailer.lastName = 'Retailer 1';
    retailer.accountBalance = 15000;

    // Product
    var product = factory.newResource('org.mahyco.farmtofork', 'Product', 'PROD_001');
    // Set the properties of the new vehicle.
    product.name = 'Mango';
    product.variety = 'Malgova';
    product.quantity = '25kg';
    // product.manufactured = "2019-03-02T06:05:12.285Z";
    product.harvestLocation = 'Thrissur';
    product.owner = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    product.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');

    // Contract
    var contract = factory.newResource('org.mahyco.farmtofork', 'Contract', 'CON_001');
    // Set the properties of the new vehicle.
    contract.farmer = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
    contract.warehouseman = factory.newRelationship('org.mahyco.farmtofork', 'Warehouseman', 'WAREHOUSEMAN_001');
    contract.distributor = factory.newRelationship('org.mahyco.farmtofork', 'Distributor', 'DISTRIBUTOR_001');
    contract.retailer = factory.newRelationship('org.mahyco.farmtofork', 'Retailer', 'RETAILER_001');
    contract.product = factory.newRelationship('org.mahyco.farmtofork', 'Product', 'PROD_001');
    contract.unitPrice = 15;
    contract.unitCount = 1000;
    // contract.issuedDate = "2019-03-02T06:05:12.285Z";
    // contract.dateOfPromise = "2019-03-02T06:05:12.285Z";

    return getParticipantRegistry('org.mahyco.farmtofork.Farmer')
        .then(function (farmerRegistry) {
            // add the growers
            return farmerRegistry.addAll([farmer]);
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
            return contractRegistry.addAll([contract]);
        });
}


// ------------------------------------------------------------------------------------------------
// /**
//  * CreateProduct - Farmer Creates Product
//  * @param {org.mahyco.farmtofork.CreateProduct} tx
//  * @transaction
//  */
// async function createProduct(tx) {
//     // Get the factory.
//     var factory = getFactory();
//     // Create a new vehicle.
//     var product = factory.newResource('org.mahyco.farmtofork', 'Product', 'PROD_001');
//     // Set the properties of the new vehicle.
//     product.name = 'Mango';
//     product.variety = 'Malgova';
//     product.quantity = '25kg';
//     // product.manufactured = "2019-03-02T06:05:12.285Z";
//     product.harvestLocation = 'Thrissur';
//     product.owner = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');
//     product.inCustodyOf = factory.newRelationship('org.mahyco.farmtofork', 'Farmer', 'FARMER_001');

//     // Get the vehicle asset registry.
//     return getAssetRegistry('org.mahyco.farmtofork.Product')
//         .then(function (productAssetRegistry) {
//             // Call methods on the vehicle asset registry.
//             productAssetRegistry.addAll([product]);
//         })
//         .catch(function (error) {
//             // Add optional error handling here.
//             console.log(error);
//         });
// }
