import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [DashboardWrapperComponent],
  imports: [CommonModule, WidgetsModule],
  exports: [DashboardWrapperComponent]
})
export class DashboardsModule {}
