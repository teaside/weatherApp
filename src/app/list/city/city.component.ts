import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/shared/classes/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input() city: City;
  @Output() delete = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  private deleteThisCity() {
    this.delete.emit(this.city.id);
  }

}
