import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Order, Pagination, Product } from '@models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }

  saveOrder(request?: any) {
    return this.http.post<Order>(`order`, request).toPromise();
  }

  getOrders() {
    return this.http.get<Pagination<Order[]>>(`order`).toPromise().then((resp: ApiResponse<Order>): Order => {
      return resp;
    });
  }

  orderAgain(request?: any) {
    return this.http.get<Pagination<Product[]>>(`order-again`, request).toPromise();
  }

  getOrder(id?: any) {
    return this.http.get(`order/${id}`).toPromise().then((resp: ApiResponse<Order>): Order => {
      return resp.data;
    });
  }
  updateOrderAddress(request, id) {
    return this.http.put(`order-address/${id}`,  request).toPromise();
  }

  saveRating(request?:any){
    return this.http.post(`save-rating`, request).toPromise();
  }

  pendingOrder(request?: any) {
    return this.http.post<Order>(`pending-order`, request).toPromise();
  }
  
  updateOrder(request?: any) {
    return this.http.post<Order>(`update-order`, request).toPromise();
  }

  payUMonyPayment(request?: any) {
    return this.http.post(`payumoney`, request).toPromise();
  }

}
