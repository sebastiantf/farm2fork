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
import { CreateContractService } from './CreateContract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createcontract',
  templateUrl: './CreateContract.component.html',
  styleUrls: ['./CreateContract.component.css'],
  providers: [CreateContractService]
})
export class CreateContractComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  manufacturerId = new FormControl('', Validators.required);
  warehousemanId = new FormControl('', Validators.required);
  farmerId = new FormControl('', Validators.required);
  distributorId = new FormControl('', Validators.required);
  retailerId = new FormControl('', Validators.required);
  shipperId = new FormControl('', Validators.required);
  inputProductId = new FormControl('', Validators.required);
  productId = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  unitCount = new FormControl('', Validators.required);
  termsandcondtns = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCreateContract: CreateContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      manufacturerId: this.manufacturerId,
      warehousemanId: this.warehousemanId,
      farmerId: this.farmerId,
      distributorId: this.distributorId,
      retailerId: this.retailerId,
      shipperId: this.shipperId,
      inputProductId: this.inputProductId,
      productId: this.productId,
      unitPrice: this.unitPrice,
      unitCount: this.unitCount,
      termsandcondtns: this.termsandcondtns,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateContract.getAll()
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
      $class: 'org.mahyco.farmtofork.CreateContract',
      'manufacturerId': this.manufacturerId.value,
      'warehousemanId': this.warehousemanId.value,
      'farmerId': this.farmerId.value,
      'distributorId': this.distributorId.value,
      'retailerId': this.retailerId.value,
      'shipperId': this.shipperId.value,
      'inputProductId': this.inputProductId.value,
      'productId': this.productId.value,
      'unitPrice': this.unitPrice.value,
      'unitCount': this.unitCount.value,
      'termsandcondtns': this.termsandcondtns.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'manufacturerId': null,
      'warehousemanId': null,
      'farmerId': null,
      'distributorId': null,
      'retailerId': null,
      'shipperId': null,
      'inputProductId': null,
      'productId': null,
      'unitPrice': null,
      'unitCount': null,
      'termsandcondtns': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateContract.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'manufacturerId': null,
        'warehousemanId': null,
        'farmerId': null,
        'distributorId': null,
        'retailerId': null,
        'shipperId': null,
        'inputProductId': null,
        'productId': null,
        'unitPrice': null,
        'unitCount': null,
        'termsandcondtns': null,
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
      $class: 'org.mahyco.farmtofork.CreateContract',
      'manufacturerId': this.manufacturerId.value,
      'warehousemanId': this.warehousemanId.value,
      'farmerId': this.farmerId.value,
      'distributorId': this.distributorId.value,
      'retailerId': this.retailerId.value,
      'shipperId': this.shipperId.value,
      'inputProductId': this.inputProductId.value,
      'productId': this.productId.value,
      'unitPrice': this.unitPrice.value,
      'unitCount': this.unitCount.value,
      'termsandcondtns': this.termsandcondtns.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateContract.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.serviceCreateContract.deleteTransaction(this.currentId)
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

    return this.serviceCreateContract.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'manufacturerId': null,
        'warehousemanId': null,
        'farmerId': null,
        'distributorId': null,
        'retailerId': null,
        'shipperId': null,
        'inputProductId': null,
        'productId': null,
        'unitPrice': null,
        'unitCount': null,
        'termsandcondtns': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.manufacturerId) {
        formObject.manufacturerId = result.manufacturerId;
      } else {
        formObject.manufacturerId = null;
      }

      if (result.warehousemanId) {
        formObject.warehousemanId = result.warehousemanId;
      } else {
        formObject.warehousemanId = null;
      }

      if (result.farmerId) {
        formObject.farmerId = result.farmerId;
      } else {
        formObject.farmerId = null;
      }

      if (result.distributorId) {
        formObject.distributorId = result.distributorId;
      } else {
        formObject.distributorId = null;
      }

      if (result.retailerId) {
        formObject.retailerId = result.retailerId;
      } else {
        formObject.retailerId = null;
      }

      if (result.shipperId) {
        formObject.shipperId = result.shipperId;
      } else {
        formObject.shipperId = null;
      }

      if (result.inputProductId) {
        formObject.inputProductId = result.inputProductId;
      } else {
        formObject.inputProductId = null;
      }

      if (result.productId) {
        formObject.productId = result.productId;
      } else {
        formObject.productId = null;
      }

      if (result.unitPrice) {
        formObject.unitPrice = result.unitPrice;
      } else {
        formObject.unitPrice = null;
      }

      if (result.unitCount) {
        formObject.unitCount = result.unitCount;
      } else {
        formObject.unitCount = null;
      }

      if (result.termsandcondtns) {
        formObject.termsandcondtns = result.termsandcondtns;
      } else {
        formObject.termsandcondtns = null;
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
      'manufacturerId': null,
      'warehousemanId': null,
      'farmerId': null,
      'distributorId': null,
      'retailerId': null,
      'shipperId': null,
      'inputProductId': null,
      'productId': null,
      'unitPrice': null,
      'unitCount': null,
      'termsandcondtns': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
