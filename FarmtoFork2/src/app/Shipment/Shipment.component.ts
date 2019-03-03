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
import { ShipmentService } from './Shipment.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-shipment',
  templateUrl: './Shipment.component.html',
  styleUrls: ['./Shipment.component.css'],
  providers: [ShipmentService]
})
export class ShipmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  shipmentId = new FormControl('', Validators.required);
  contract = new FormControl('', Validators.required);
  modeOfTransport = new FormControl('', Validators.required);
  currentLocation = new FormControl('', Validators.required);
  shipmentStatus = new FormControl('', Validators.required);
  inCustodyOf = new FormControl('', Validators.required);

  constructor(public serviceShipment: ShipmentService, fb: FormBuilder) {
    this.myForm = fb.group({
      shipmentId: this.shipmentId,
      contract: this.contract,
      modeOfTransport: this.modeOfTransport,
      currentLocation: this.currentLocation,
      shipmentStatus: this.shipmentStatus,
      inCustodyOf: this.inCustodyOf
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceShipment.getAll()
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
      $class: 'org.mahyco.farmtofork.Shipment',
      'shipmentId': this.shipmentId.value,
      'contract': this.contract.value,
      'modeOfTransport': this.modeOfTransport.value,
      'currentLocation': this.currentLocation.value,
      'shipmentStatus': this.shipmentStatus.value,
      'inCustodyOf': this.inCustodyOf.value
    };

    this.myForm.setValue({
      'shipmentId': null,
      'contract': null,
      'modeOfTransport': null,
      'currentLocation': null,
      'shipmentStatus': null,
      'inCustodyOf': null
    });

    return this.serviceShipment.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'shipmentId': null,
        'contract': null,
        'modeOfTransport': null,
        'currentLocation': null,
        'shipmentStatus': null,
        'inCustodyOf': null
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
      $class: 'org.mahyco.farmtofork.Shipment',
      'contract': this.contract.value,
      'modeOfTransport': this.modeOfTransport.value,
      'currentLocation': this.currentLocation.value,
      'shipmentStatus': this.shipmentStatus.value,
      'inCustodyOf': this.inCustodyOf.value
    };

    return this.serviceShipment.updateAsset(form.get('shipmentId').value, this.asset)
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

    return this.serviceShipment.deleteAsset(this.currentId)
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

    return this.serviceShipment.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'shipmentId': null,
        'contract': null,
        'modeOfTransport': null,
        'currentLocation': null,
        'shipmentStatus': null,
        'inCustodyOf': null
      };

      if (result.shipmentId) {
        formObject.shipmentId = result.shipmentId;
      } else {
        formObject.shipmentId = null;
      }

      if (result.contract) {
        formObject.contract = result.contract;
      } else {
        formObject.contract = null;
      }

      if (result.modeOfTransport) {
        formObject.modeOfTransport = result.modeOfTransport;
      } else {
        formObject.modeOfTransport = null;
      }

      if (result.currentLocation) {
        formObject.currentLocation = result.currentLocation;
      } else {
        formObject.currentLocation = null;
      }

      if (result.shipmentStatus) {
        formObject.shipmentStatus = result.shipmentStatus;
      } else {
        formObject.shipmentStatus = null;
      }

      if (result.inCustodyOf) {
        formObject.inCustodyOf = result.inCustodyOf;
      } else {
        formObject.inCustodyOf = null;
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
      'shipmentId': null,
      'contract': null,
      'modeOfTransport': null,
      'currentLocation': null,
      'shipmentStatus': null,
      'inCustodyOf': null
      });
  }

}
