import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toParams } from '@utils';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }
  getSettings() {
    return this.http.get(`settings`).toPromise();
  }
  getCountry() {
    return this.http.get(`countreis`).toPromise();
  }
  getState(id?: number) {
    return this.http.get(`states/${id}`).toPromise();
  }
  getCity(id?: number) {
    return this.http.get(`cities/${id}`).toPromise();
  }

  subscriber(request?: any) {
    return this.http.post(`subscriber`, request).toPromise();
  }

  callRequest(request?: any) {
    return this.http.post(`call-request`, request).toPromise();
  }

  vendorFaq(request?:any) {
    return this.http.get(`vendor-faq`, {
      params: request ? toParams(request) : {},
    } ).toPromise();
  }

  emailValidaton(request:any ={}) {
    return this.http.post(`validation-vendor`, request).toPromise();
  }

  faqs(request:any= {}) {
    return this.http.get(`faqs`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }
  
}
