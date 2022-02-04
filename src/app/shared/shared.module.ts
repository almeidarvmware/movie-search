import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericLoadingComponent } from './components/generic-loading/generic-loading.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    GenericLoadingComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericLoadingComponent
  ]
})
export class SharedModule { }
