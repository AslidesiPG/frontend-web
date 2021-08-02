import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Brand, Category, Pagination, Product } from '@models';
import { toParams } from '@utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /* product api */
  getProducts(request?: any) {
    return this.http.get<Pagination<Product>>(`product`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getProduct(id, request?: any) {
    return this.http.get(`product/${id}`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

//This method responsible
  getProduct$(id, request?: any) {
    return this.http.get(`product/${id}`, {
      params: request ? toParams(request) : {},
    });
  }

  /* Category api */

  getCategories(request?: any) {
    return this.http.get<ApiResponse<Category[]>>(`product-category`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getCategory(slug: string, request?: any) {
    return this.http.get<ApiResponse<Category>>(`product-category/${slug}`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getBrands(request?: any) {
    return this.http.get<ApiResponse<Brand[]>>(`brands`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  /* Wishlist api */
  getWishlist(request: any = {}) {
    return this.http.get<Pagination<Product>>(`wishlist`, { params: toParams(request) }).toPromise();
  }

  addWishlist(productId: number) {
    return this.http.post(`wishlist/${productId}`, {}).toPromise();
  }

  removeWishlist(productId: number) {
    return this.http.delete(`wishlist/${productId}`).toPromise();
  }

  getRating(productId?: number, request?:any){
    return this.http.get(`get-rating/${productId}`, {
      params: request ? toParams(request) : {},
    }).toPromise();

  }

  getRatings(request?: any) {
    return this.http.get(`get-rating`, {
      params: request ? toParams(request) : {},
    }).toPromise();

  }
}
