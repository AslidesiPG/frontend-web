import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toFormData, toParams } from '@utils';
import { Pagination } from '@models';


@Injectable({
    providedIn: 'root'
})
export class UserService {
   

    isLoggedIn = false;

    constructor(
        private http: HttpClient
    ) {

    }

    changePassword(request?: any) {
        return this.http.post('change-password', request).toPromise();
    }

    getUser() {
        return this.http.get('user/me').toPromise();
    }

    updateUser(request?: any ){
        return this.http.post(`profile`, toFormData({...request, _method: 'put'})).toPromise();
    }

    verifyPhoneOtp(request: any) {
        return this.http.put(`phone/verify-otp`, request).toPromise();
    }

    updateAddress(id?: number, request?: any): any {
        return this.http.put(`address/${id}`, request).toPromise();
    }
    addAddress(request?: any): any {
        return this.http.post('address', request).toPromise();
    }
    getAddress() {
        return this.http.get(`address`).toPromise();
    }
    deleteAddress(id?: number): any {
        return this.http.delete(`address/${id}`).toPromise();
    }

    getVendor(id?: number) {
        return this.http.get(`vendor-profile/${id}`).toPromise();
    }

    getSearchVendor(request) {
        return this.http.get<Pagination<any>>(`search-vendor`, {
            params: request ? toParams(request) : {},
        }).toPromise();
    }

    getSellerType(){
        return this.http.get(`seller-type`).toPromise();
    }

}
