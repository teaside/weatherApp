import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../shared/services/weather.service';
import { City } from '../shared/classes/city';
import { throwError, Observable } from 'rxjs';
import { store } from '@angular/core/src/render3/instructions';
import { PagerService } from '../shared/services/pager.service';
import { PageProperties } from '../shared/classes/page-properties';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities: City[] = [];
  pagedCities: City[] = [];
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
        this.setPage(1);
    }
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByCoodrinates(position.coords.longitude , position.coords.latitude).subscribe(data => {
          console.log(data.name);
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
        // try {
        //   if (newCity) {
        //     this.cities.forEach(city => {
        //       if (city.cod === newCity.cod) {
        //         throw(1);
        //       }
        //     });

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
      //     }
      //   } catch (err) {
      //     console.log('Already added')
      //   }
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
    this.cities = this.cities.filter((city) => {
      return city.id !== id;
    });
    this.pagedCities = this.pagedCities.filter((city) => {
      return city.id !== id;
    });
    this.reWriteLocalStorage();
    if (this.pagedCities.length === 0) {
      const storage = JSON.parse(localStorage.getItem('cities'));
      if (storage.length !== 0) {
        this.cities = storage;
        this.setPage(this.pager.currentPage - 1);
      }
    }
  }

  private reWriteLocalStorage(): void {
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

}
