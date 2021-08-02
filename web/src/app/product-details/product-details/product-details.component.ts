import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'src/app/packages/ngx-gallery';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from '@models';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { ContactForPriceComponent } from 'src/app/shared/components/contact-for-price/contact-for-price/contact-for-price.component';
import { MatDialog } from '@angular/material/dialog';


@UntilDestroy()
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  isLogin: any;
  shipping: any;
  errorMessage: any;
  shippingFree: boolean;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private authService: AuthService,
    private cartService: CartService,
    private compareService: CompareService,
    private matDialog: MatDialog,
    private router: Router,

  ) { }
  sellerProducts: Product[] = [];
  recentProducts: Product[] = [];
  ratings: any = [];

  product: Product = {};
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  quantity = 1;
  loading = true;
  sellerProductLoading = true;
  recentProductLoading = true;
  ratingLoading = true;
  userId: number[] = [];

  attributes: any = {};
  post_code: any;

  request: any = {
    limit: 10,
    rating: 5,
    page: 1,
  }

  occasionOptions: OwlOptions = {
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

  ngOnInit(): void {

    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.loading = false;
        this.product = data.product;
        if (this.product.shipping_free) {
          this.shippingFree = true;
          this.shipping = true;
        }
        if (this.product.images && this.product.images.length > 0) {
          this.galleryImages = this.product.images.map((image) => {
            return {
              small: image.image_urls.xs,
              medium: image.image_urls.md,
              big: image.image_urls.full,
            };
          });
        }
        this.userId = [this.product.user_id];

        for (let index = 0; index < this.product.product_inputs.length; index++) {
          const input = this.product.product_inputs[index];
          if (input.input_type === 'checkbox') {
            this.attributes[input.id] = {};
          } else {
            this.attributes[input.id] = null;
          }
        }

        this.sellerProductLoading = true;
        this.productService.getProducts({ limit: 10, user_ids: this.userId })
          .then((req: any) => {
            this.sellerProducts = req.data;
          })
          .finally(() => this.sellerProductLoading = false);

        this.recentProductLoading = true;
        this.productService.getProducts({ limit: 10, category_ids: [this.product.category_id] })
          .then((req: any) => {
            this.recentProducts = req.data;
          })
          .finally(() => this.recentProductLoading = false);

        /* ---- Rating api ---- */

        this.getRating();
      });

    this.cartService.$postCode
      .pipe(untilDestroyed(this))
      .subscribe((post_code) => {
        const request = {
          pickup_postcode: this.product?.user?.vendor_profile?.zip_code,
          delivery_postcode: post_code,
          weight: this.product?.weight || 0.5,
          cod: 0,
        }
        if (post_code) {
          this.post_code = post_code;
          this.cartService.getShippingPrice(request).then((resp: any) => {
            this.shipping = resp.data.available_courier_companies[0];
          }).catch((error) => {
            this.shipping = null;
            this.errorMessage = 'Product not available in your area';
          });
        }

      });

    this.galleryOptions = [
      {
        width: '500px',
        height: '550px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        arrowPrevIcon: 'icon-left-arrow-2',
        arrowNextIcon: 'icon-right-arrow-2',
        closeIcon: 'icon-close',
        fullscreenIcon: 'icon-fullscreen',
        spinnerIcon: '',
        zoomInIcon: 'icon-zoom-in',
        zoomOutIcon: 'icon-zoom-out',
        rotateLeftIcon: 'icon-rotate-left',
        rotateRightIcon: 'icon-rotating-right',
        downloadIcon: 'icon-download',
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        this.isLogin = isLogin;
      });
  }

  postCodeSubmit() {
    if (this.post_code) {
      this.errorMessage = null
      this.cartService.postCode = this.post_code;
    } else {
      this.errorMessage = 'Please enter your post code'
    }

  }

  ngOnDestroy(): void {
  }

  getOptions(input: string): string[] {
    return input.split('\n');
  }

  setRatingByStar(value) {
    this.request.rating = value;
    this.getRating();
  }

  getRating() {
    this.ratingLoading = true;
    this.productService.getRating(this.product.id, this.request).then((resp: any) => {
      this.ratings = resp.data;
    })
      .finally(() => this.ratingLoading = false);
  }


  updateCart(product_id) {
    if (this.isLogin) {
      console.log(product_id);  
      const attributes = this.parseAttrsToRequest();
      this.cartService.addCart(product_id, this.quantity, attributes).then((item) => {
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

  parseAttrsToRequest() {
    const reqeustData: any = {};
    for (let index = 0; index < this.product.product_inputs.length; index++) {
      const input: any = this.product.product_inputs[index];
      if (this.attributes[input.id]) {
        if (input.input_type === 'checkbox') {
          reqeustData[input.id] = [];
          for (const key in this.attributes[input.id]) {
            if (Object.prototype.hasOwnProperty.call(this.attributes[input.id], key)) {
              if (this.attributes[input.id][key]) {
                reqeustData[input.id].push(key);
              }
            }
          }
        } else {
          reqeustData[input.id] = this.attributes[input.id];
        }
      }
    }
    return reqeustData;
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
    if (product.is_in_wishlist == false) {
      this.productService.addWishlist(product.id)
        .then(() => {
          product.is_in_wishlist = true;
        })
        .catch((error) => {
          this.helperService.errorMessage(error.error);
        });
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

  addToCompares(product: Product) {
    this.compareService.addToCompare(product);
    this.router.navigateByUrl('/compare');
  }
}
