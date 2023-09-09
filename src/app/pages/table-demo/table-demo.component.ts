import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  PaginatorState,
  SortState,
  GroupingState
} from 'src/app/_metronic/shared/crud-table';
import { TableDemoService } from './table-demo.service';
import { EditCustomerModalComponent } from './components/edit-customer-modal/edit-customer-modal.component';
import { DeleteCustomerModalComponent } from './components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from './components/delete-customers-modal/delete-customers-modal.component';
import { FetchCustomersModalComponent } from './components/fetch-customers-modal/fetch-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from './components/update-customers-status-modal/update-customers-status-modal.component';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})

// tslint:disable:no-string-literal
export class TableDemoComponent
  implements
    OnInit,
    OnDestroy,
    ICreateAction,
    IEditAction,
    IDeleteAction,
    IDeleteSelectedAction,
    IFetchSelectedAction,
    IUpdateStatusForSelectedAction,
    ISortView,
    IFilterView,
    IGroupingView,
    ISearchView,
    IFilterView
{
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public tableDemoService: TableDemoService
  ) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.tableDemoService.fetch();
    this.grouping = this.tableDemoService.grouping;
    this.paginator = this.tableDemoService.paginator;
    this.sorting = this.tableDemoService.sorting;
    const sb = this.tableDemoService.isLoading$.subscribe((res) => (this.isLoading = res));
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: ['']
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() => this.filter())
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const type = this.filterGroup.get('type').value;
    if (type) {
      filter['type'] = type;
    }
    this.tableDemoService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: ['']
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.tableDemoService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.tableDemoService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.tableDemoService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditCustomerModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.tableDemoService.fetch(),
      () => {}
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteCustomerModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.tableDemoService.fetch(),
      () => {}
    );
  }

  deleteSelected() {
    const modalRef = this.modalService.open(DeleteCustomersModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.tableDemoService.fetch(),
      () => {}
    );
  }

  updateStatusForSelected() {
    const modalRef = this.modalService.open(UpdateCustomersStatusModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.tableDemoService.fetch(),
      () => {}
    );
  }

  fetchSelected() {
    const modalRef = this.modalService.open(FetchCustomersModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.tableDemoService.fetch(),
      () => {}
    );
  }
}
