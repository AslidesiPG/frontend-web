import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fileUrl } from '@utils';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppInitService } from 'src/app/shared/services/app-init.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RequestCallBackComponent } from 'src/app/shared/components/request-call-back/request-call-back/request-call-back.component';
import { ContactForPriceComponent } from 'src/app/shared/components/contact-for-price/contact-for-price/contact-for-price.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = [];
  products = [];
  request = {
    limit: 10,
    page: 1,
    type: 'latest',
  };


  productLoading: boolean;
  page: any;
  fileUrl = fileUrl;
  settings: any;
  featuredProducts: any;
  bestSellProducts: any;
  productOccasionLoading: boolean;
  occasionCategories: any;
  isLogin: any;

  constructor(
    private commonService: CommonService,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private appInitService: AppInitService,
    private helperService: HelperService,
    private matDialog: MatDialog,
    private router: Router,
    private seo: SeoService,
  ) {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 2
      },
      450: {
        items: 3
      },
      680: {
        items: 5
      },
      850: {
        items: 6
      },
      980: {
        items: 6
      },
      1200: {
        items: 8
      }
    },
    nav: false
  };
  occasionOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      750: {
        items: 3
      },
      1000: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: false
  };

  bannerOptions: OwlOptions = {
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
      });
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ page }) => {
      if (!page) {
        this.router.navigate(['404']);
      } else {
        this.seo.setTitle(page?.extras?.meta_title);
        this.seo.setDescription(page?.extras?.meta_description);
        this.seo.setKeywords(page?.extras?.meta_keywords);
        this.page = page;
        this.productOccasionLoading = true;
        this.productService.getCategories({ parent_id: this.page.extras.occasion_category_id }).then((req: any) => {
          this.occasionCategories = req.data;
        }).finally(() => {
          this.productOccasionLoading = false;
        });
      }
    });
    this.settings = this.appInitService.settings;
    this.productService.getCategories().then((req: any) => {
      this.categories = req.data;
    });
    // this.getProducts();

    /*  this.request.type = 'latest';
     this.getProducts()
       .then((req: any) => {
         this.products = req.data;
       })
       .finally(() => this.productLoading = false); */

    this.request.type = 'featured';
    this.getProducts()
      .then((req: any) => {
        this.featuredProducts = req.data;
      })
      .finally(() => this.productLoading = false);

    /*  this.request.type = 'best_sell';
     this.getProducts()
       .then((req: any) => {
         this.bestSellProducts = req.data;
       })
       .finally(() => this.productLoading = false); */
  }


  getProducts() {
    this.productLoading = true;
    return this.productService.getProducts(this.request);
  }

  addToCart(product) {
    if (this.isLogin) {
      this.cartService.addCart(product.id, 1).then((item) => {
        this.router.navigate(['/cart']);
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }
  }

  savePhone(value) {
    this.commonService.callRequest({ phone: value }).then((resp) => {
      this.helperService.successMessage(resp);
    }).catch((error) => {
      this.helperService.errorMessage(error.error);
    });
  }

  scroll() {
    const el = document.querySelector('.subscribe-element');
    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    if (el.querySelector('.email-input')) {
      const input: HTMLElement = el.querySelector('.email-input');
      input.focus();
    }
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

  addPhoneNumber($event) {
    $event.stopPropagation();
    this.matDialog.open(RequestCallBackComponent)
  }

  ngOnDestroy() {
  }
}
