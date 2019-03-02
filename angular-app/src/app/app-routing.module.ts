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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ProductComponent } from './Product/Product.component';
import { ContractComponent } from './Contract/Contract.component';

import { FarmerComponent } from './Farmer/Farmer.component';
import { WarehousemanComponent } from './Warehouseman/Warehouseman.component';
import { DistributorComponent } from './Distributor/Distributor.component';
import { RetailerComponent } from './Retailer/Retailer.component';

import { DummyDataComponent } from './DummyData/DummyData.component';
import { CreateProductComponent } from './CreateProduct/CreateProduct.component';
import { CreateContractComponent } from './CreateContract/CreateContract.component';
import { statusUpdateComponent } from './statusUpdate/statusUpdate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'Farmer', component: FarmerComponent },
  { path: 'Warehouseman', component: WarehousemanComponent },
  { path: 'Distributor', component: DistributorComponent },
  { path: 'Retailer', component: RetailerComponent },
  { path: 'DummyData', component: DummyDataComponent },
  { path: 'CreateProduct', component: CreateProductComponent },
  { path: 'CreateContract', component: CreateContractComponent },
  { path: 'statusUpdate', component: statusUpdateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
