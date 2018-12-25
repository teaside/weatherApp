import { Pipe, PipeTransform } from '@angular/core';
import { noun } from 'plural-ru';

@Pipe({
  name: 'pluralNamePipe'
})
export class PluralNamePipe implements PipeTransform {

  transform(value: any, pl1: string, pl2: string, pl3: string): any {
    return `${value} ${noun(value, pl1, pl2, pl3)}`;
  }

}
