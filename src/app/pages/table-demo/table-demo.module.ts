import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDemoComponent } from './table-demo.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { DeleteCustomerModalComponent } from './components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from './components/delete-customers-modal/delete-customers-modal.component';
import { EditCustomerModalComponent } from './components/edit-customer-modal/edit-customer-modal.component';
import { FetchCustomersModalComponent } from './components/fetch-customers-modal/fetch-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from './components/update-customers-status-modal/update-customers-status-modal.component';

@NgModule({
  declarations: [
    TableDemoComponent,
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    FetchCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    EditCustomerModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: TableDemoComponent
      }
    ])
  ],
  entryComponents: [
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    FetchCustomersModalComponent,
    EditCustomerModalComponent
  ]
})
export class TableDemoModule {}
