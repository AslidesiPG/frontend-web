import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToDate'
})
export class StrToDatePipe implements PipeTransform {

  transform(value: string): any {
    return this.parseDate(value);
  }

  parseDate(input: string, format: any = 'yyyy-MM-dd HH:mm:ss') {
    let parts:any = input.match(/(\d+)/g);
    let i = 0;
    let fmt = {};
    
    format.replace(/(yyyy|dd|MM|HH|mm|ss)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['MM']] - 1, parts[fmt['dd']], parts[fmt['HH']], parts[fmt['mm']], parts[fmt['ss']]);
  }

}
