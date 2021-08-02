import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, Product } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEmpty } from '@utils';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  recentProducts = [];
  cart: any = {};
  productCount: number;
  wishlists = [];
  orders = [];
  user: any;
  cardData: CartItem;
  isLogin: any;
  labelIndex: any = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private helperService: HelperService,
    private authService: AuthService,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.cartService.$cartItems.pipe(untilDestroyed(this)).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.productCount = cartItems?.length;
    });
    this.cartService.$cart.pipe(untilDestroyed(this)).subscribe((cart) => {
      this.cart = cart;
    });

    this.productService.getWishlist({ limit: 5 }).then((req) => {
      this.wishlists = req.data;
    });

    this.productService.getProducts({ limit: 8, type: 'recent' }).then((req: any) => {
      this.recentProducts = req.data;
    });

    this.reorder();
  }


  addCart(product) {
    this.cartService.addCart(product.id, 1).then((cardItem) => {
      product.cart_qty = cardItem.quantity;
    });
  }

  updateCart(quantity, product) {
    this.cartService.updateCart(this.cardData.id, quantity).then((item) => {
      console.log(item);
      product.cart_qty = item.quantity;
    });
  }

  minus(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.updateCart(cartItem.id, cartItem.quantity);
      if (this.cart?.coupon) {
        this.cartService.removeCoupon();
      }
    }
  }

  plus(cartItem: CartItem) {
    cartItem.quantity++;
    if (this.cart?.coupon) {
      this.cartService.removeCoupon();
    }
    this.cartService.updateCart(cartItem.id, cartItem.quantity);
  }

  deleteCart(cartItem) {
    this.cartService.deleteCart(cartItem)
  }

  /*  addCart(productId) {
     this.cartService.addCart(productId, 1);
   } */

  reorder() {
    this.orderService.orderAgain({ limit: 16 }).then((resp: any) => {
      this.orders = resp?.data;
    })
  }

  shippingNext() {
    this.authService
      .$user
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        if (this.cartItems?.length > 0) {
          if (isEmpty(user.profile_created_at)) {
            this.router.navigate(['/create-profile'])
          }
          else {
            this.router.navigate(['/shipping'])
          }
        }
      });
  }

  tabChanged(event) {
    this.labelIndex = event.index;
  }

  wishlist(product) {
    if (product.is_in_wishlist === true) {
      this.productService.removeWishlist(product.id).then(() => {
        product.is_in_wishlist = false;
      });
    } else {
      this.productService.addWishlist(product.id)
        .then(() => {
          product.is_in_wishlist = true;
        })
        .catch((error) => {
          this.helperService.errorMessage(error.error);
        });
    }
  }
  ngOnDestroy(): void { }
}