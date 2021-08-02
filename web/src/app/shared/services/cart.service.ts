import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiResponse, Cart, CartItem } from '@models';
import { toParams } from '@utils';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AppStorage } from './storage/app-storage';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  dataStore: {
    cartItems: CartItem[],
    cart: {
      delivery_date: any,
      days: any,
      total: any,
      coupon: any,
      coupon_discount: any,
      shipping: any,
    }
    address: any,
    postCode: any,
  };

  _cartItems: BehaviorSubject<CartItem[]>;
  _address: BehaviorSubject<any>;
  _cart: BehaviorSubject<any>;
  _postCode: BehaviorSubject<any>;

  constructor(
    @Inject(AppStorage) private appStorage: Storage,
    private http: HttpClient,
  ) {
    this.dataStore = {
      cartItems: [],
      address: null,
      postCode: null,
      cart: {
        delivery_date: null,
        total: 0,
        days: 0,
        coupon: 0,
        coupon_discount: 0,
        shipping: 0,
      },
    };
    this._cartItems = new BehaviorSubject(this.dataStore.cartItems);
    this._address = new BehaviorSubject(this.dataStore.address);
    this._cart = new BehaviorSubject(this.dataStore.cart);
    this._postCode = new BehaviorSubject(this.dataStore.postCode);
  }

  get cartItems(): CartItem[] {
    return this.dataStore.cartItems;
  }

  set cartItems(cartItems: CartItem[]) {
    this.dataStore.cartItems = cartItems;
    let sum = 0;
    let shipping_sum = 0;
    let days = 0;
    for (let index = 0; index < cartItems?.length; index++) {
      const cartItem = cartItems[index];
      sum += (cartItem?.quantity * cartItem?.price);
      if (days < cartItem?.product?.delivery_days) {
        days = parseInt(cartItem?.product?.delivery_days);
      }
      if (cartItem.shipping) {
        if (days < cartItem?.shipping.estimated_delivery_days) {
          days = parseInt(cartItem?.shipping.estimated_delivery_days);
        }
        shipping_sum += (cartItem?.shipping?.rate)
      }
      // shipping_sum += (cartItem?.quantity * cartItem?.product?.shipping_cost);
    }
    if (days == 0) {
      days = 4;
    }
    this.cart = {
      ...this.cart,
      total: sum,
      days: days,
      delivery_date: moment().add(days, 'day').format('YYYY-MM-DD'),
      shipping: shipping_sum,
    }
    this._cartItems.next(this.dataStore.cartItems);
  }

  get $cartItems() {
    return this._cartItems.asObservable();
  }

  get $postCode() {
    return this._postCode.asObservable();
  }

  get postCode(): any {
    return this.dataStore.postCode;
  }

  set postCode(postCode: any) {
    this.dataStore.postCode = postCode;
    if (postCode) {
      this.appStorage.setItem('postCode', this.dataStore.postCode);
    } else {
      this.appStorage.removeItem('postCode');
    }
    this._postCode.next(this.dataStore.postCode);
  }

  get $address() {
    return this._address.asObservable();
  }

  get address(): any {
    return this.dataStore.address;
  }

  set address(address: any) {
    this.dataStore.address = address;
    if (address) {
      this.appStorage.setItem('address', JSON.stringify(this.dataStore.address));
    } else {
      this.appStorage.removeItem('address');
    }
    this._address.next(this.dataStore.address);
  }



  get $cart() {
    return this._cart.asObservable();
  }

  get cart(): any {
    return this.dataStore.cart;
  }

  set cart(cart: any) {
    this.dataStore.cart = cart;
    if (cart) {
      this.appStorage.setItem('cart', JSON.stringify(this.dataStore.cart));
    } else {
      this.appStorage.removeItem('cart');
    }
    this._cart.next(this.dataStore.cart);
  }


  addCart(productId: number, quantity: number, attributes: any = {}) {
    return this.http
      .post<ApiResponse<CartItem>>(`cart`, { product_id: productId, quantity, attributes })
      .toPromise()
      .then((resp) => {

        this.updateCartItem(resp.data, resp.data.product_id);
        return resp.data;
      });
  }


  getCarts() {
    return this.http
      .get<ApiResponse<Cart>>(`cart`)
      .toPromise()
      .then((cart) => {
        this.cartItems = cart.data.cart_items;
        this.cart = {
          ...this.cart,
          coupon: cart.data.coupon,
          coupon_discount: cart.data.coupon.discount_amount,
        };
        return cart;
      });
  }

  getCoupons() {
    return this.http
      .get<ApiResponse<Cart>>(`coupons`)
      .toPromise()
      .then((coupons) => {
        return coupons;
      });
  }

  updateCart(cartItemId: number, quantity: number) {
    return this.http
      .put<ApiResponse<CartItem>>(`cart/${cartItemId}`, { quantity })
      .toPromise()
      .then((resp) => {
        this.updateCartItem(resp.data, cartItemId);
        return resp.data;
      });
  }

  deleteCart(cartItem: CartItem) {
    return this.http.delete<ApiResponse<any>>(`cart/${cartItem.id}`).toPromise()
      .then((resp) => {
        const index = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(index, 1);
        return resp;
      });
  }

  veryfyCouopn(request: any) {
    return this.http.get<ApiResponse<any>>(`coupon`, {
      params: request ? toParams(request) : {},
    }).toPromise().then((res) => {
      this.cart = {
        ...this.cart,
        coupon: res.data,
        coupon_discount: res.data.discount_amount,
      };
      return res;
    });
  }
  removeCoupon() {
    return this.http.delete<ApiResponse<any>>(`coupon`).toPromise().then((res) => {
      this.cart.coupon = 0;
      this.cart.coupon_discount = 0;
      this.cart = this.cart;
    });
  }

  getShippingPrice(request: any = {}) {
    return this.http.get<ApiResponse<any>>(`shipping-price`, {
      params: toParams(request)
    }).toPromise();
  }

  updateCartItem(cartItem: CartItem, cartId?: number) {
    if (cartItem && cartItem.product_id) {
      let find = false;
      this.cartItems = this.cartItems.map((item) => {
        if (item.product_id === cartItem.product_id) {
          find = true;
          return cartItem;
        } else {
          return item;
        }
      });
      if (!find) {
        this.cartItems = this.cartItems.concat([cartItem]);
      }
    } else {

      const find = this.cartItems.find((item) => item.product_id === cartId);
      this.cartItems = this.cartItems.filter((item) => cartItem !== find);
    }
  }

  async init() {
    try {
      this.address = JSON.parse(this.appStorage.getItem('address'));
      this.postCode = this.appStorage.getItem('postCode');
      await this.getCarts();
    } catch (error) {

    }
  }



  async clearCart() {
    try {
      this.cartItems = [];
      this.cart = {
        delivery_date: null,
        total: 0,
        days: 0,
        coupon: 0,
        coupon_discount: 0,
        shipping: 0,
      }
      this.appStorage.removeItem('postCode');
      this.appStorage.removeItem('cart');
      this.appStorage.removeItem('cartItems');
    } catch (error) {

    }
  }

}
