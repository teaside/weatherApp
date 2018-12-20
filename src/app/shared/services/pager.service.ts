import { Injectable } from '@angular/core';
import { PageProperties } from '../classes/page-properties';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5): PageProperties {

    const totalPages: number = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    const startIndex: number = (currentPage - 1) * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages: number[] = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return new PageProperties(totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages);
}
}
