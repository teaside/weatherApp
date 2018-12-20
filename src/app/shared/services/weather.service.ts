import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../classes/city';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeatherInfoByCity(city: string): Observable<City> {
    if (city !== null && city !== undefined && city !== '') {
      return this.http.get<City>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${environment.appId}`);
    } else {
      return null;
    }
  }

  getWeatherByCoodrinates(lng, lat): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${environment.appId}`);
  }
}
