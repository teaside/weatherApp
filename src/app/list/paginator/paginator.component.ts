import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageProperties } from 'src/app/shared/classes/page-properties';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input('pager') pager: PageProperties = null;
  @Output() setPageEvent = new EventEmitter<number>();
  constructor() { }

  setPage(value: number) {
    this.setPageEvent.emit(value);
  }

}
