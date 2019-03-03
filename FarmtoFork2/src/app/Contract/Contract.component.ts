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
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract',
  templateUrl: './Contract.component.html',
  styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractId = new FormControl('', Validators.required);
  manufacturer = new FormControl('', Validators.required);
  warehouseman = new FormControl('', Validators.required);
  farmer = new FormControl('', Validators.required);
  distributor = new FormControl('', Validators.required);
  retailer = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  input = new FormControl('', Validators.required);
  product = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  unitCount = new FormControl('', Validators.required);
  termsandcondtns = new FormControl('', Validators.required);

  constructor(public serviceContract: ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractId: this.contractId,
      manufacturer: this.manufacturer,
      warehouseman: this.warehouseman,
      farmer: this.farmer,
      distributor: this.distributor,
      retailer: this.retailer,
      shipper: this.shipper,
      input: this.input,
      product: this.product,
      unitPrice: this.unitPrice,
      unitCount: this.unitCount,
      termsandcondtns: this.termsandcondtns
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContract.getAll()
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
      $class: 'org.mahyco.farmtofork.Contract',
      'contractId': this.contractId.value,
      'manufacturer': this.manufacturer.value,
      'warehouseman': this.warehouseman.value,
      'farmer': this.farmer.value,
      'distributor': this.distributor.value,
      'retailer': this.retailer.value,
      'shipper': this.shipper.value,
      'input': this.input.value,
      'product': this.product.value,
      'unitPrice': this.unitPrice.value,
      'unitCount': this.unitCount.value,
      'termsandcondtns': this.termsandcondtns.value
    };

    this.myForm.setValue({
      'contractId': null,
      'manufacturer': null,
      'warehouseman': null,
      'farmer': null,
      'distributor': null,
      'retailer': null,
      'shipper': null,
      'input': null,
      'product': null,
      'unitPrice': null,
      'unitCount': null,
      'termsandcondtns': null
    });

    return this.serviceContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractId': null,
        'manufacturer': null,
        'warehouseman': null,
        'farmer': null,
        'distributor': null,
        'retailer': null,
        'shipper': null,
        'input': null,
        'product': null,
        'unitPrice': null,
        'unitCount': null,
        'termsandcondtns': null
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
      $class: 'org.mahyco.farmtofork.Contract',
      'manufacturer': this.manufacturer.value,
      'warehouseman': this.warehouseman.value,
      'farmer': this.farmer.value,
      'distributor': this.distributor.value,
      'retailer': this.retailer.value,
      'shipper': this.shipper.value,
      'input': this.input.value,
      'product': this.product.value,
      'unitPrice': this.unitPrice.value,
      'unitCount': this.unitCount.value,
      'termsandcondtns': this.termsandcondtns.value
    };

    return this.serviceContract.updateAsset(form.get('contractId').value, this.asset)
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

    return this.serviceContract.deleteAsset(this.currentId)
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

    return this.serviceContract.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractId': null,
        'manufacturer': null,
        'warehouseman': null,
        'farmer': null,
        'distributor': null,
        'retailer': null,
        'shipper': null,
        'input': null,
        'product': null,
        'unitPrice': null,
        'unitCount': null,
        'termsandcondtns': null
      };

      if (result.contractId) {
        formObject.contractId = result.contractId;
      } else {
        formObject.contractId = null;
      }

      if (result.manufacturer) {
        formObject.manufacturer = result.manufacturer;
      } else {
        formObject.manufacturer = null;
      }

      if (result.warehouseman) {
        formObject.warehouseman = result.warehouseman;
      } else {
        formObject.warehouseman = null;
      }

      if (result.farmer) {
        formObject.farmer = result.farmer;
      } else {
        formObject.farmer = null;
      }

      if (result.distributor) {
        formObject.distributor = result.distributor;
      } else {
        formObject.distributor = null;
      }

      if (result.retailer) {
        formObject.retailer = result.retailer;
      } else {
        formObject.retailer = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.input) {
        formObject.input = result.input;
      } else {
        formObject.input = null;
      }

      if (result.product) {
        formObject.product = result.product;
      } else {
        formObject.product = null;
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
      'contractId': null,
      'manufacturer': null,
      'warehouseman': null,
      'farmer': null,
      'distributor': null,
      'retailer': null,
      'shipper': null,
      'input': null,
      'product': null,
      'unitPrice': null,
      'unitCount': null,
      'termsandcondtns': null
      });
  }

}
