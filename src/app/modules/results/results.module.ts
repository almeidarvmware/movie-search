import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsComponent } from './results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsTableComponent } from './results-table/results-table.component';

@NgModule({
  declarations: [
    ResultsComponent,
    ResultsTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ResultsModule { }
