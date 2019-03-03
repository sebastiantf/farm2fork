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
import { CreateProductService } from './CreateProduct.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createproduct',
  templateUrl: './CreateProduct.component.html',
  styleUrls: ['./CreateProduct.component.css'],
  providers: [CreateProductService]
})
export class CreateProductComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  name = new FormControl('', Validators.required);
  variety = new FormControl('', Validators.required);
  productType = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  productStatus = new FormControl('', Validators.required);
  harvestLocation = new FormControl('', Validators.required);
  daysForExpiry = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCreateProduct: CreateProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      name: this.name,
      variety: this.variety,
      productType: this.productType,
      quantity: this.quantity,
      productStatus: this.productStatus,
      harvestLocation: this.harvestLocation,
      daysForExpiry: this.daysForExpiry,
      rating: this.rating,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.mahyco.farmtofork.CreateProduct',
      'name': this.name.value,
      'variety': this.variety.value,
      'productType': this.productType.value,
      'quantity': this.quantity.value,
      'productStatus': this.productStatus.value,
      'harvestLocation': this.harvestLocation.value,
      'daysForExpiry': this.daysForExpiry.value,
      'rating': this.rating.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'name': null,
      'variety': null,
      'productType': null,
      'quantity': null,
      'productStatus': null,
      'harvestLocation': null,
      'daysForExpiry': null,
      'rating': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateProduct.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'name': null,
        'variety': null,
        'productType': null,
        'quantity': null,
        'productStatus': null,
        'harvestLocation': null,
        'daysForExpiry': null,
        'rating': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.mahyco.farmtofork.CreateProduct',
      'name': this.name.value,
      'variety': this.variety.value,
      'productType': this.productType.value,
      'quantity': this.quantity.value,
      'productStatus': this.productStatus.value,
      'harvestLocation': this.harvestLocation.value,
      'daysForExpiry': this.daysForExpiry.value,
      'rating': this.rating.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateProduct.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceCreateProduct.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceCreateProduct.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'name': null,
        'variety': null,
        'productType': null,
        'quantity': null,
        'productStatus': null,
        'harvestLocation': null,
        'daysForExpiry': null,
        'rating': null,
        'transactionId': null,
        'timestamp': null
      };

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

      if (result.daysForExpiry) {
        formObject.daysForExpiry = result.daysForExpiry;
      } else {
        formObject.daysForExpiry = null;
      }

      if (result.rating) {
        formObject.rating = result.rating;
      } else {
        formObject.rating = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'name': null,
      'variety': null,
      'productType': null,
      'quantity': null,
      'productStatus': null,
      'harvestLocation': null,
      'daysForExpiry': null,
      'rating': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
