import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateComponent } from './validate/validate.component';
import { NgSelectModule } from './ng-select/public-api';

import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [ValidateComponent],
  imports: [CommonModule, NgSelectModule, RouterModule, ReactiveFormsModule, DirectivesModule],
  exports: [ValidateComponent]
})
export class SharedComponentsModule {}
