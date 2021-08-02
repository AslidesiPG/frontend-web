import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CartItem, Product } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ContactForPriceComponent } from '../../contact-for-price/contact-for-price/contact-for-price.component';

@UntilDestroy()
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private _product: Product = {};
  @Input()
  public get product(): Product {
    return this._product;
  }
  public set product(value: Product) {
    this._product = value;
    if (value && value.cart_items && value.cart_items.length > 0){
      this.cardItem  = value.cart_items[0];
    }
  }
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  isLogin: any;
  cardItem: CartItem;

  constructor(
    private helperService: HelperService,
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
      });

  }


  wishlist(product) {
    if (!this.isLogin) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }
    if (product.is_in_wishlist == true) {
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

  addCart() {
    if (!this.isLogin) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }
    this.cartService.addCart(this.product.id, 1).then((cardItem) => {
      this.product.cart_qty = cardItem.quantity;
      this.cardItem = cardItem;
    });
  }

  updateCart(quantity) {
    this.cartService.updateCart(this.cardItem.id, quantity).then((item) => {
      console.log(item);
      this.product.cart_qty = item.quantity;
    });
  }

  contactForPrice(product_id?: number) { alert();
    if (!this.isLogin) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }
    this.matDialog.open(ContactForPriceComponent, {
      data: { item: product_id }
    });
  }

  ngOnDestroy(): void {
  }
}
