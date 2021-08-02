import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationMeta, Product } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { ProductService } from 'src/app/shared/services/product.service';

@UntilDestroy()
@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit, OnDestroy {
  shortBy = 'recent';
  products: Product[] = [];
  vendorData: any;
  ratings: any;

  venderId: number;
  request: any = {
    limit: 12,
    page: 1,
    type: 'latest',
  };

  vendorRating: any = {
    limit: 10,
    page: 1,
    order_by: 'created_at',
    order: 'desc',
  };

  loading: boolean ;
  hasMorePage: boolean;

  minValue = 1;
  maxValue = 400;


  pageMeta: PaginationMeta;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) { }


  ngOnInit(): void {


    this.loading = true
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        this.venderId = params.id;
        this.request.user_ids = [this.venderId];
        this.vendorRating.user_id = this.venderId;

        this.userService.getVendor(this.venderId).then((resp: any) => {
          this.vendorData = resp;
          this.getRating();
          this.getProducts();
        });
      });


  }

  getProducts() {
    return this.productService.getProducts(this.request).then((req) => {
      this.hasMorePage = req.meta.current_page <= req.meta.last_page;
      this.pageMeta = req.meta;
      //this.products = req.data;
      if(this.request.page == 1){
        this.products = req.data;
      }
      this.onScrollSuccess(req);
      //return req;
    }).finally(() => {
      if (isPlatformBrowser(this.platformId)) {
        //window.scrollTo(0, 0);
      }
      this.loading = false;
    });
  }

  loadeMoreProducts(event: any) {
    this.request.limit = event.pageSize;
    this.request.page = event.pageIndex + 1;
    this.getProducts();
  }

  shortvendor() {
    switch (this.shortBy) {

      case 'recent':
        this.vendorRating.order_by = 'created_at';
        this.vendorRating.order = 'desc';
        break;

      case 'rating_desc':
        this.vendorRating.order_by = 'rating';
        this.vendorRating.order = 'desc';
        break;

      case 'rating_asc':
        this.vendorRating.order_by = 'rating';
        this.vendorRating.order = 'asc';
        break;
    }
    console.log(this.vendorRating);
    this.getRating();
  }
  getRating() {
    this.productService.getRatings(this.vendorRating).then((resp: any) => {
      this.ratings = resp.data;
    });
  }

  // When scroll down the screen
  onScroll(){
    console.log("Scrolled");
    this.request.page = this.request.page + 1;
    this.getProducts();
  }

    
   // When we got data on a scroll success
   onScrollSuccess(res) {
    console.log(res);
    if (res != undefined) {
      res.data.forEach(item => {
        console.log('worked', res.meta);
        this.request.limit = res.meta?.per_page || 12;
        //this.request.page = res.meta.current_page-1;
        this.products.push(item);
      });
    }
  }
  ngOnDestroy(): void { }

}
