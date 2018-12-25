import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../classes/city';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeatherInfoByCity(city: string): Observable<City> {
    if (!_.isEmpty(city)) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<City>(`${environment.apiPath}/weather?q=${city}&units=imperial&APPID=${environment.openWeatherAppId}`);
    }
  }

  getWeatherByCoodrinates(lng, lat): Observable<any> {
      // if (!_.isEmpty) {
      // tslint:disable-next-line:max-line-length
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${environment.openWeatherAppId}`);
    // }
  }
}
