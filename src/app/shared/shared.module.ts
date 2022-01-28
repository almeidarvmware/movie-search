import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericLoadingComponent } from './components/generic-loading/generic-loading.component';

@NgModule({
  declarations: [
    GenericLoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericLoadingComponent,
  ]
})
export class SharedModule { }
