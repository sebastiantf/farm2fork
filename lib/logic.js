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
 * Sample transaction
 * @param {org.mahyco.farmtofork.MoveProduct} tx
 * @transaction
 */
async function moveProduct(tx) {
    // Save the old value of the asset.
    const oldOwner = tx.product.owner;

    // Update the asset with the new value.
    tx.product.owner = tx.newOwner;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.mahyco.farmtofork.Product');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.product);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.mahyco.farmtofork', 'MoveProductEvent');
    event.product = tx.product;
    event.oldOwner = oldOwner;
    event.newOwner = tx.newOwner;
    emit(event);
}
