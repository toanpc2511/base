import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { UsersTable } from './fake-db/users.table';
import { CarsTable } from './fake-db/cars.table';
import { ECommerceDataContext } from '../pages/table-demo/fake-server/_e-commerce.data-context';

@Injectable({
  providedIn: 'root'
})
export class FakeAPIService implements InMemoryDbService {
  constructor() {}

  /**
   * Create Fake DB and API
   */
  createDb(): {} | Observable<{}> {
    // tslint:disable-next-line:class-name
    const db = {
      // auth module
      users: UsersTable.users,

      // data-table
      cars: CarsTable.cars,

      customers: ECommerceDataContext.customers,
      // products
      products: ECommerceDataContext.cars,
      productRemarks: ECommerceDataContext.remarks,
      productSpecs: ECommerceDataContext.carSpecs
    };
    return db;
  }
}
