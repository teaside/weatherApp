import { Pipe, PipeTransform } from '@angular/core';
import { noun } from 'plural-ru';

@Pipe({
  name: 'pluralForCity'
})
export class PluralForCityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${value} ${noun(value, 'город', 'города', 'городов')}`;
  }

}
