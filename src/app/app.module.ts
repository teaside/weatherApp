import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './list/city/city.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PluralNamePipe } from './shared/pipes/plural-for-city.pipe';
import { PaginatorComponent } from './list/paginator/paginator.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './shared/classes/error-interceptor';
import { CityListComponent } from './list/city-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityComponent,
    PluralNamePipe,
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
  providers: [
    HttpClientModule,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
