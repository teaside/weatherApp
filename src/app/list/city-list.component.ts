import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { City, fromOpenWeatherToClientApi } from '../shared/classes/city';
import { PagerService } from '../shared/services/pager.service';
import { PageProperties } from '../shared/classes/page-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  cities: City[] = [];
  pagedCities: City[] = [];
  currentCity = null;
  pager: PageProperties = null;

  constructor(
    private weatherService: WeatherService,
    private pagerService: PagerService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    Promise.all([
      this.getCitiesFromStorage(),
      this.getGeolocation()
    ]).then(() => {
      this.spinner.hide();
    });
  }

  private getCitiesFromStorage() {
    const storage = JSON.parse(localStorage.getItem('cities'));
    if (!_.isEmpty(storage)) {
        this.cities = storage;
        this.setPage(1);
    }
  }

  private getGeolocation(): void {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByCoodrinates(position.coords.longitude, position.coords.latitude).subscribe((data) => {
          this.updateCurrentCity(data);
        });
      });
    } else {
      alert('Не удаётся получить доступ к местоположению :(');
    }
  }

  private updateCurrentCity(data): void {
    this.currentCity = data;
    const ZERO_KELVIN = 273.15;
    this.currentCity.main.temp = this.currentCity.main.temp - ZERO_KELVIN;
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.cities.length, page);
    this.pagedCities = this.cities.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  private addCity(cityInputValue): void {
    this.spinner.show();
    if (cityInputValue.trim().length !== 0) {
      this.weatherService.getWeatherInfoByCity(cityInputValue).subscribe((newCity) => {
          newCity = fromOpenWeatherToClientApi(newCity);
          if (this.isNewCity(newCity)) {
            this.cities.push(newCity);
            this.rewriteLocalStorage();
            this.openRequiredPage();
          } else {
            alert('Этот город уже добавлен');
          }
          this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      });
  }
}

  private isNewCity(city: City): boolean {
    if (this.cities.length > 0) {
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].id === city.id) {
          return false;
        }
      }
    }
    return true;
  }

  private openRequiredPage(): void {
    if (this.isNeedToOpenNewPage()) {
      this.setPage(this.pager.currentPage + 1);
    } else {
      if (this.isPagedCitiesEmpty()) {
        this.setPage(1);
      } else {
        this.setPage(this.pager.currentPage);
      }
      const cityInput: HTMLInputElement = document.getElementById('city') as HTMLInputElement;
      cityInput.value = '';
    }
  }

  private isNeedToOpenNewPage(): boolean {
    return this.pagedCities.length + 1 > 5;
  }

  private isPagedCitiesEmpty(): boolean {
    return this.pagedCities.length === 0;
  }

  public deleteCityByid(id: number): void {
    this.spinner.show();
    this.cities = this.cities.filter((city) => {
      return city.id !== id;
    });
    this.rewriteLocalStorage();
    this.getCitiesFromStorage();
    this.openRequiredPage();
    this.spinner.hide();
  }

  private rewriteLocalStorage(): void {
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  public getListLength(): number {
    return this.cities.length;
  }

  public isHaveAccessToCurrentPosition(): boolean {
    return this.currentCity !== null;
  }

  public iShowCityItems(): boolean {
    if (this.pagedCities && this.pagedCities.length) {
      return this.pagedCities && this.pagedCities.length > 0;
    }
    return false;
  }

  public isShowPaginator(): boolean {
    if (this.cities && this.cities.length) {
      return this.cities && this.cities !== null && this.cities.length > 0;
    }
    return false;
  }
}
