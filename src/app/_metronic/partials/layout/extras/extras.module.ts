import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserDropdownInnerComponent } from './dropdown-inner/user-dropdown-inner/user-dropdown-inner.component';
import { SearchOffcanvasComponent } from './offcanvas/search-offcanvas/search-offcanvas.component';
import { NotificationsOffcanvasComponent } from './offcanvas/notifications-offcanvas/notifications-offcanvas.component';
import { QuickPanelOffcanvasComponent } from './offcanvas/quick-panel-offcanvas/quick-panel-offcanvas.component';
import { UserOffcanvasComponent } from './offcanvas/user-offcanvas/user-offcanvas.component';
import { CoreModule } from '../../../core';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    UserDropdownInnerComponent,
    NotificationsOffcanvasComponent,
    SearchOffcanvasComponent,
    QuickPanelOffcanvasComponent,
    UserOffcanvasComponent,
    ScrollTopComponent
  ],
  imports: [CommonModule, InlineSVGModule, PerfectScrollbarModule, CoreModule, RouterModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    UserDropdownInnerComponent,
    SearchOffcanvasComponent,
    NotificationsOffcanvasComponent,
    QuickPanelOffcanvasComponent,
    UserOffcanvasComponent,
    ScrollTopComponent
  ]
})
export class ExtrasModule {}
