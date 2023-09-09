import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { TableService, ITableState, TableResponseModel } from 'src/app/_metronic/shared/crud-table';
import { environment } from 'src/environments/environment';
import { Customer } from './_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class TableDemoService extends TableService<Customer> implements OnDestroy {
  API_URL = `${environment.apiUrl}/customers`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Customer>> {
    return this.http.get<Customer[]>(this.API_URL).pipe(
      map((response: Customer[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<Customer> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach((id) => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }

  updateStatusForItems(ids: number[], status: number): Observable<any> {
    return this.http.get<Customer[]>(this.API_URL).pipe(
      map((customers: Customer[]) => {
        return customers
          .filter((c) => ids.indexOf(c.id) > -1)
          .map((c) => {
            c.status = status;
            return c;
          });
      }),
      exhaustMap((customers: Customer[]) => {
        const tasks$ = [];
        customers.forEach((customer) => {
          tasks$.push(this.update(customer));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
