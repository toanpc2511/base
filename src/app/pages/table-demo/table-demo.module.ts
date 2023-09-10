import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDemoComponent } from './table-demo.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbPopoverModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { DeleteCustomerModalComponent } from './components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from './components/delete-customers-modal/delete-customers-modal.component';
import { EditCustomerModalComponent } from './components/edit-customer-modal/edit-customer-modal.component';
import { FetchCustomersModalComponent } from './components/fetch-customers-modal/fetch-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from './components/update-customers-status-modal/update-customers-status-modal.component';
import { FullcalenderComponent } from './fullcalender/fullcalender.component';
import {
  DateStringPipe,
  DisplayStartEndCalendarPipe,
  DisplayTimePipe,
  IsFeatureDatePipe
} from './fullcalender/shift.pipe';

@NgModule({
  declarations: [
    TableDemoComponent,
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    FetchCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    EditCustomerModalComponent,
    FullcalenderComponent,
    DateStringPipe,
    DisplayStartEndCalendarPipe,
    DisplayTimePipe,
    IsFeatureDatePipe
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
    FullCalendarModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: TableDemoComponent
      },
      {
        path: 'calender',
        component: FullcalenderComponent
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
