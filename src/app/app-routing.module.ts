import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  // {path: '', component: AppComponent},
  // {path: 'details/:cityId', component: DetailsComponent},
  {path: 'list', component: ListComponent},
  {path: '**', redirectTo: 'add'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
