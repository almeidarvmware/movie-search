import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { ResultsComponent } from './modules/results/results.component';
import { ResultsModule } from './modules/results/results.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: (): Promise<HomeModule> => import('./modules/home/home.module').then(mod => mod.HomeModule)
  },
  { 
    path: 'results',  
    component: ResultsComponent,
    loadChildren: (): Promise<ResultsModule> => import('./modules/results/results.module').then(mod => mod.ResultsModule) 
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
