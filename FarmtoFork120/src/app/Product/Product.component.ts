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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  productId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  variety = new FormControl('', Validators.required);
  productType = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  productStatus = new FormControl('', Validators.required);
  harvestLocation = new FormControl('', Validators.required);
  manufactured = new FormControl('', Validators.required);
  expiry = new FormControl('', Validators.required);
  pesticides = new FormControl('', Validators.required);
  fertilizers = new FormControl('', Validators.required);
  seeds = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceProduct: ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      productId: this.productId,
      name: this.name,
      variety: this.variety,
      productType: this.productType,
      quantity: this.quantity,
      productStatus: this.productStatus,
      harvestLocation: this.harvestLocation,
      manufactured: this.manufactured,
      expiry: this.expiry,
      pesticides: this.pesticides,
      fertilizers: this.fertilizers,
      seeds: this.seeds,
      rating: this.rating,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.mahyco.farmtofork.Product',
      'productId': this.productId.value,
      'name': this.name.value,
      'variety': this.variety.value,
      'productType': this.productType.value,
      'quantity': this.quantity.value,
      'productStatus': this.productStatus.value,
      'harvestLocation': this.harvestLocation.value,
      'manufactured': this.manufactured.value,
      'expiry': this.expiry.value,
      'pesticides': this.pesticides.value,
      'fertilizers': this.fertilizers.value,
      'seeds': this.seeds.value,
      'rating': this.rating.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'productId': null,
      'name': null,
      'variety': null,
      'productType': null,
      'quantity': null,
      'productStatus': null,
      'harvestLocation': null,
      'manufactured': null,
      'expiry': null,
      'pesticides': null,
      'fertilizers': null,
      'seeds': null,
      'rating': null,
      'owner': null
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'productId': null,
        'name': null,
        'variety': null,
        'productType': null,
        'quantity': null,
        'productStatus': null,
        'harvestLocation': null,
        'manufactured': null,
        'expiry': null,
        'pesticides': null,
        'fertilizers': null,
        'seeds': null,
        'rating': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.mahyco.farmtofork.Product',
      'name': this.name.value,
      'variety': this.variety.value,
      'productType': this.productType.value,
      'quantity': this.quantity.value,
      'productStatus': this.productStatus.value,
      'harvestLocation': this.harvestLocation.value,
      'manufactured': this.manufactured.value,
      'expiry': this.expiry.value,
      'pesticides': this.pesticides.value,
      'fertilizers': this.fertilizers.value,
      'seeds': this.seeds.value,
      'rating': this.rating.value,
      'owner': this.owner.value
    };

    return this.serviceProduct.updateAsset(form.get('productId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProduct.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'productId': null,
        'name': null,
        'variety': null,
        'productType': null,
        'quantity': null,
        'productStatus': null,
        'harvestLocation': null,
        'manufactured': null,
        'expiry': null,
        'pesticides': null,
        'fertilizers': null,
        'seeds': null,
        'rating': null,
        'owner': null
      };

      if (result.productId) {
        formObject.productId = result.productId;
      } else {
        formObject.productId = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.variety) {
        formObject.variety = result.variety;
      } else {
        formObject.variety = null;
      }

      if (result.productType) {
        formObject.productType = result.productType;
      } else {
        formObject.productType = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.productStatus) {
        formObject.productStatus = result.productStatus;
      } else {
        formObject.productStatus = null;
      }

      if (result.harvestLocation) {
        formObject.harvestLocation = result.harvestLocation;
      } else {
        formObject.harvestLocation = null;
      }

      if (result.manufactured) {
        formObject.manufactured = result.manufactured;
      } else {
        formObject.manufactured = null;
      }

      if (result.expiry) {
        formObject.expiry = result.expiry;
      } else {
        formObject.expiry = null;
      }

      if (result.pesticides) {
        formObject.pesticides = result.pesticides;
      } else {
        formObject.pesticides = null;
      }

      if (result.fertilizers) {
        formObject.fertilizers = result.fertilizers;
      } else {
        formObject.fertilizers = null;
      }

      if (result.seeds) {
        formObject.seeds = result.seeds;
      } else {
        formObject.seeds = null;
      }

      if (result.rating) {
        formObject.rating = result.rating;
      } else {
        formObject.rating = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'productId': null,
      'name': null,
      'variety': null,
      'productType': null,
      'quantity': null,
      'productStatus': null,
      'harvestLocation': null,
      'manufactured': null,
      'expiry': null,
      'pesticides': null,
      'fertilizers': null,
      'seeds': null,
      'rating': null,
      'owner': null
      });
  }

}
