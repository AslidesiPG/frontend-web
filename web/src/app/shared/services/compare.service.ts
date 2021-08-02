import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  dataSource: {
    phones: any;
    filters: any;
    compares: Array<any>;
  };
  _compares: BehaviorSubject<any>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.dataSource = {
      phones: {}, filters: {},
      compares: [
        {},
        {},
        {}
      ]
    };
    this._compares = new BehaviorSubject(this.dataSource.compares);

  }

  get compares() {
    return this.dataSource.compares;
  }
  get $compares() {
    return this._compares.asObservable();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set compares(value) {
    this.dataSource.compares = value;
    this._compares.next(value);
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('compare-list', JSON.stringify(this.dataSource.compares));
    }
  }

  addToCompare(phone: any = {}, index?: any) {
    if (!this.dataSource.compares) {
      this.dataSource.compares = [];
    }
    const phones: any[] = this.compares;
    if (index !== undefined) {
      phones[index] = phone;
    } else {
      phones[0] = phone;
      phones[1] = {};
      phones[2] = {};
    }

    this.compares = phones;
  }

  getBlankIndex() {
    const phones: Array<any> = this.compares;
    if (!phones || !phones[0] || !phones[0].id) {
      return 0;
    }
    if (!phones || !phones[1] || !phones[1].id) {
      return 1;
    }
    if (!phones || !phones[2] || !phones[2].id) {
      return 2;
    }
    return 2;
  }

  removeCompare(id: any) {
    const phones: Array<any> = this.compares.filter((item) => id !== item.id);
    if (phones.length < 3) {
      for (let index = phones.length; index < 3; index++) {
        phones[index] = {};
      }
    }
    this.compares = phones;
  }

  removeComparesByIndex(index: number) {
    this.compares[index] = {};
    this.compares = this.compares[index];
  }

  loadCompares() {
    let phones = [];
    if (isPlatformBrowser(this.platformId)) {
      phones = JSON.parse(window.localStorage.getItem('compare-list'));
    }
    if (phones === undefined || phones === null) {
      phones = [];
    }
    if (phones.length < 3) {
      for (let index = phones.length; index < 3; index++) {
        phones[index] = {};
      }
    }
    this.compares = phones;
  }
}
