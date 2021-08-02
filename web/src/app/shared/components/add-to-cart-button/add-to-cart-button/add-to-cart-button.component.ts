import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItem, Product } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ContactForPriceComponent } from '../../contact-for-price/contact-for-price/contact-for-price.component';

@UntilDestroy()
@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {
  private _product: Product = {};
  
  @Input()
  public get product(): Product {
    return this._product;
  }
  public set product(value: Product) {
    this._product = value;
    if (value && value.cart_items && value.cart_items.length > 0) {
      this.cardItem = value.cart_items[0];
    }
  }
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  isLogin: any;
  loading: boolean;
  cardItem: CartItem;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
      });
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
    this.loading = true;
    this.cartService.addCart(this.product.id, 1).then((cardItem) => {
      this.product.cart_qty = cardItem.quantity;
      this.cardItem = cardItem;
    }).finally(() => {
      this.loading = false;
    });
  }

  updateCart(quantity) {
    this.loading = true;
    this.cartService.updateCart(this.cardItem.id, quantity).then((item) => {
      this.product.cart_qty = item.quantity;
    }).finally(() => {
      this.loading = false;
    });
  }

  contactForPrice(product_id?: number) {
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
}
