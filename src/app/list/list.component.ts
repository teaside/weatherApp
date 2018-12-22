import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../shared/services/weather.service';
import { City } from '../shared/classes/city';
import { throwError, Observable } from 'rxjs';
import { store } from '@angular/core/src/render3/instructions';
import { PagerService } from '../shared/services/pager.service';
import { PageProperties } from '../shared/classes/page-properties';
import { CurrentCity } from '../shared/classes/current-city';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities: City[] = [];
  pagedCities: City[] = [];
  currentCity: CurrentCity = null;
  pager: PageProperties = null;

  constructor(
    private weatherService: WeatherService,
    private pagerService: PagerService
  ) {
  }

  ngOnInit() {
    const storage = JSON.parse(localStorage.getItem('cities'));
    if (storage.length !== 0) {
        this.cities = storage;
        console.log(this.cities);
        this.setPage(1);
    }
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByCoodrinates(position.coords.longitude, position.coords.latitude).subscribe((data: CurrentCity) => {
          this.currentCity = data;
        });
      });
    } else {}
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.cities.length, page);
    this.pagedCities = this.cities.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  private addCity(cityInputValue): void {
    if (cityInputValue.trim().length !== 0) {
      this.weatherService.getWeatherInfoByCity(cityInputValue).subscribe((newCity: City) => {

        try {
            for (let i = 0; i < this.cities.length; i++) {
              if (this.cities[i].id === newCity.id) {
                alert('already added');
                return;
              }
            }

          this.cities.push(newCity);
          this.reWriteLocalStorage();

          if (this.isNeedToOpenNewPage()) {
          this.setPage(this.pager.currentPage + 1);
        } else {
          if (this.isPagedCitiesEmpty()) {
            this.setPage(1);
          } else {
            this.setPage(this.pager.currentPage);
          }
          cityInputValue = '';
        }
          // }
        } catch (err) {
          console.log('Already added');
        }
      }, error => {console.log(`can't find city by this name`); });
    }
  }
  private isNeedToOpenNewPage(): boolean {
    return this.pagedCities.length + 1 > 5;
  }
  private isPagedCitiesEmpty(): boolean {
    return this.pagedCities.length === 0;
  }

  private deleteCity(id: number): void {
    this.cities = this.cities.filter((city) => {
      return city.id !== id;
    });

    this.reWriteLocalStorage();

      const storage = JSON.parse(localStorage.getItem('cities'));
      this.cities = storage;
      console.log(this.pagedCities.length - 1);
      if (this.cities.length > 5 && this.pagedCities.length - 1 !== 0) {
        this.setPage(this.pager.currentPage);
      } else if (this.cities.length > 5 && this.pagedCities.length - 1 === 0) {
        this.setPage(this.pager.currentPage - 1);
      } else if (this.cities.length <= 5) {
        this.setPage(1);
      }
  }

  private reWriteLocalStorage(): void {
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  public getListLength(): number {
    return this.cities.length;
  }
}
