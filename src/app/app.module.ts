import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CityComponent } from './list/city/city.component';
import { HttpClientModule } from '@angular/common/http';
import { PluralForCityPipe } from './shared/pipes/plural-for-city.pipe';
import { PaginatorComponent } from './list/paginator/paginator.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CityComponent,
    PluralForCityPipe,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  exports: [

  ],
  providers: [HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
