import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CityComponent } from './list/city/city.component';
import { HttpClientModule } from '@angular/common/http';
import { PluralForCityPipe } from './shared/pipes/plural-for-city.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CityComponent,
    PluralForCityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [

  ],
  providers: [HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
