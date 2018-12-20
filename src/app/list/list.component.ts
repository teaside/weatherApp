import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../shared/services/weather.service';
import { City } from '../shared/classes/city';
import { throwError } from 'rxjs';
import { store } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

cities: City[] = [];

  constructor(
    private weatherService: WeatherService
  ) {

  }

  ngOnInit() {
    const storage = JSON.parse(localStorage.getItem('cities'));
      if (storage.length !== 0) {
        this.cities = storage;
      }
  }

  private addCity(cityInputValue: string): void {
    if (cityInputValue.trim().length !== 0) {
      this.weatherService.getWeatherInfoByCity(cityInputValue).subscribe((newCity: City) => {
        // try {
        //   if (newCity) {
        //     this.cities.forEach(city => {
        //       if (city.cod === newCity.cod) {
        //         throw(1);
        //       }
        //     });
            this.cities.push(newCity);
            this.reWriteLocalStorage();
            cityInputValue = '';
      //     }
      //   } catch (err) {
      //     console.log('Already added')
      //   }
      });
    }
  }

  private deleteCity(id: number): void {
    this.cities = this.cities.filter((city) => {
      return city.id !== id;
    });
    this.reWriteLocalStorage();
  }

  private reWriteLocalStorage(): void {
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

}
