import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { City } from '../shared/classes/city';
import { PagerService } from '../shared/services/pager.service';
import { PageProperties } from '../shared/classes/page-properties';
import { CurrentCity } from '../shared/classes/current-city';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private pagerService: PagerService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    const storage = JSON.parse(localStorage.getItem('cities'));
    if (storage.length !== 0) {
        this.cities = storage;
        this.setPage(1);
    }
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByCoodrinates(position.coords.longitude, position.coords.latitude).subscribe((data: CurrentCity) => {
          this.currentCity = data;
          this.spinner.hide();
          // setTimeout(() => {this.spinner.hide(); }, 3000);
        });
      });
    } else {
      // can't show the waether in the current place
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.cities.length, page);
    this.pagedCities = this.cities.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  private addCity(cityInputValue): void {
    this.spinner.show();
    if (cityInputValue.trim().length !== 0) {
      this.weatherService.getWeatherInfoByCity(cityInputValue).subscribe((newCity: City) => {

        try {
            for (let i = 0; i < this.cities.length; i++) {
              if (this.cities[i].id === newCity.id) {
                alert('already added');
                this.spinner.hide();
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
        this.spinner.hide();
          // }
        } catch (err) {
          console.log('Already added');
        }
      }, error => {
        alert(`can't find city by this name`);
    });
  }
}
  private isNeedToOpenNewPage(): boolean {
    return this.pagedCities.length + 1 > 5;
  }
  private isPagedCitiesEmpty(): boolean {
    return this.pagedCities.length === 0;
  }

  private deleteCity(id: number): void {
    this.spinner.show();
    this.cities = this.cities.filter((city) => {
      return city.id !== id;
    });

    this.reWriteLocalStorage();

      const storage = JSON.parse(localStorage.getItem('cities'));
      this.cities = storage;
      if (this.cities.length > 5 && this.pagedCities.length - 1 !== 0) {
        this.setPage(this.pager.currentPage);
      } else if (this.cities.length > 5 && this.pagedCities.length - 1 === 0) {
        this.setPage(this.pager.currentPage - 1);
      } else if (this.cities.length <= 5) {
        this.setPage(1);
      }
      this.spinner.hide();
  }

  private reWriteLocalStorage(): void {
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  public getListLength(): number {
    return this.cities.length;
  }
}
