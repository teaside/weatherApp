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
  ) {

  }

  ngOnInit() {
    const storage = JSON.parse(localStorage.getItem('cities'));
      if (storage.length !== 0) {
        this.cities = storage;
      }
  }
}
