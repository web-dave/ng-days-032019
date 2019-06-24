import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hurz'
})
export class HurzPipe implements PipeTransform {
  transform(value: any): any {
    // console.log('pipe', value);
    return value;
  }
}
