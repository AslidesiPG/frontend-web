import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'assetspath' })
export class AssetsPath implements PipeTransform {
  transform(value: any) {
    if (value !== undefined && value !== null) {
      const baseUrl = environment.baseUrl;
      value = value.replace(/^\s+/, '');
      if (value.substring(0, value.length) === value){
        return baseUrl + value;
      }else{
        return baseUrl + "/" + value;
      }
    }
  }
}
