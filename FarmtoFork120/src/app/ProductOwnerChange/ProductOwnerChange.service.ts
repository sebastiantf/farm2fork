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

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ProductOwnerChange } from '../org.mahyco.farmtofork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProductOwnerChangeService {

  private NAMESPACE = 'ProductOwnerChange';

  constructor(private dataService: DataService<ProductOwnerChange>) {
  };

  public getAll(): Observable<ProductOwnerChange[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<ProductOwnerChange> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<ProductOwnerChange> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<ProductOwnerChange> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<ProductOwnerChange> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

