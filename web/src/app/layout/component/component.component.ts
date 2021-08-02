import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Category } from '@models';
import { CommonService } from 'src/app/shared/services/common.service';
import { AppInitService } from 'src/app/shared/services/app-init.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SettingsService } from 'src/app/shared/services/settings.service';

@UntilDestroy()
@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;
  isLogin: boolean;
  user: any = {};

  cartCount: number;
  loading: boolean;
  categories: Category[] = [];
  settings: any = {};

  search = '';
  isOpenCategoriesDropdown: boolean = true;
  categoriesLoading: boolean;
  cart: any;
  total: any;
  menuOpen: any;
  activeCurrency: 'rs' | 'usd' = 'rs';
  wishlistCounts: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private commonService: CommonService,
    private appInitService: AppInitService,
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private settingsService: SettingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    //this.cartService.getShippingPrice();

    this.settings = this.appInitService.settings;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
      });
    this.authService
      .$user
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
      });

    this.cartService.$cart
      .pipe(untilDestroyed(this))
      .subscribe((cart) => {
        this.cart = cart;
      });

    this.cartService.$cartItems.subscribe((cartItems) => {
      this.cartCount = cartItems?.length;
    });

    this.settingsService.$currency.pipe(untilDestroyed(this)).subscribe((currency) => {
      this.activeCurrency = currency;
    });

    this.productService.getWishlist().then((req) => {
      this.wishlistCounts = req.data?.length;
    });

    this.toggleCategoriesDropdown();
    /* this.productService.getCategories().then((resp: any) => {
      this.perantCategories = resp.data;
    }) */
  }

  changeCurrency(currency) { console.log(currency);
    this.settingsService.currency = currency;
  }

  viewProduct(event: MatAutocompleteSelectedEvent) {
    return this.router.navigate(['/product', event.option.value.slug]);
  }
  ngAfterViewInit() {
    this.router.events
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isOpenCategoriesDropdown = false;
          this.menuOpen = false;
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.isOpenCategoriesDropdown = false;
          this.menuOpen = false;
          this.loading = false;
        }
      });

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleCategoriesDropdown() {
    window.scroll(0, 0);
    this.isOpenCategoriesDropdown = !this.isOpenCategoriesDropdown;
    if (this.categories.length === 0) {
      this.categoriesLoading = true;
      this.productService.getCategories({ with: 'children' }).then((categories) => {
        this.categories = categories.data;
      }).finally(() => {

        this.categoriesLoading = false;
      });
    }
  }


  subscribers() {
    this.commonService.subscriber(this.form.value).then((req) => {
      this.helperService.successMessage(req);
      this.form.reset();
    }).catch((error) => {
      this.helperService.errorMessage(error.error.message);
      console.log(error.error.message);
    });
  }

  ngOnDestroy(): void {
  }

}
