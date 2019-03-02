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
 * CreateProduct - Farmer Creates Product
 * @param {org.mahyco.farmtofork.CreateProduct} tx
 * @transaction
 */
async function createProduct(tx) {
    // Get the factory.
    var factory = getFactory();
    // Create a new vehicle.
    var product = factory.newResource('org.mahyco.farmtofork', 'Product', 'PROD_001');
    // Set the properties of the new vehicle.
    product.name = 'Mango';
    product.variety = 'Malgova';
    product.quantity = '25kg';
    product.manufactured = '2019-03-02T06:05:12.285Z';
    product.harvestLocation = 'Thrissur';
    product.owner = 'resource:org.mahyco.farmtofork.Farmer#FARMER_001';
    product.inCustodyOf = 'resource:org.mahyco.farmtofork.Farmer#FARMER_001';

    // Get the vehicle asset registry.
    return getAssetRegistry('org.mahyco.farmtofork.Product')
        .then(function (prodcutAssetRegistry) {
            // Call methods on the vehicle asset registry.
            prodcutAssetRegistry.add(product);
        })
        .catch(function (error) {
            // Add optional error handling here.
            console.log(error);
        });
}
