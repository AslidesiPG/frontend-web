import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: unknown, type: 'percentage' | 'flat' = 'percentage'): unknown {
    return type === 'percentage' ? value + '%' : ('₹ ' + parseInt(value + '', 10));
  }

}
