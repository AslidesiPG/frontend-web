import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand, Category, PaginationMeta, Product } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LabelType, Options } from 'ng5-slider';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CurrencyPipe } from 'src/app/shared/pipes/currency.pipe';
import { ProductService } from 'src/app/shared/services/product.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@UntilDestroy()
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  request: any = {
    limit: 12,
    page: 1,
    type: 'latest',
    category_ids: [],
  };
  showFilter: boolean = false;
  shortBy = 'name_asc';
  products: Product[] = [];
  title = 'All Products';
  quantity = 1;
  loading;
  activeTab = 'latest';
  hasMorePage: boolean;
  pageMeta: PaginationMeta;

  categoriesLoading: boolean;
  categories: Category[];
  category: Category;

  updateProduct$ = new Subject();
  brands: Brand[];
  type: 'product' | 'category';
  slug: string;

  isSearcPage: boolean;
  isBrowser: boolean;

  private _minValue = 1;
  private _maxValue;
  
  options: Options = { floor: 1 };
  maxPriceInRs: number;
  public get minValue() {
    return this._minValue;
  }
  public set minValue(value) {
    this._minValue = value;
    this.applyFilter('price');
  }
  public get maxValue() {
    return this._maxValue;
  }
  public set maxValue(value) {
    this._maxValue = value;
    this.applyFilter('price');
  }
  
  page: number = 1;
  productsList:any [] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private currencyPipe: CurrencyPipe,
    private cd: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.activatedRoute
      .data
      .pipe(untilDestroyed(this),
    )
      .subscribe(async (data) => {
        this.type = data.type;
        this.title = data.title;
        this.request.type = data.tab;
        this.products = [];
        this.categories = [];
      });

    this.activatedRoute
      .queryParams
      .pipe(untilDestroyed(this),
    ).subscribe(async (query) => {
      if (query.search) {
        this.title = query.search;
        this.request.search = query.search;
      }
      this.updateProduct$.next();
    });


    this.activatedRoute
      .params
      .pipe(untilDestroyed(this),
    ).subscribe(async (params) => {
      this.loading = true;
      if (this.type === 'category' && params.slug) {
        await this.getCategory(params.slug);
        this.title = this.category.name;
      }
      this.getCategories();
      this.getBrands();
      this.updateProduct$.next();
    });

    this.settingsService.$rate.pipe(untilDestroyed(this)).subscribe((rate) => {
      
      this.options.ceil = this.maxPriceInRs * rate;
      this._maxValue = this.maxPriceInRs * rate;
      this.options.translate =  (value: number, label: LabelType): any => {
          switch (label) {
            case LabelType.Low:
              return this.currencyPipe.transform(value);
            case LabelType.High:
              return this.currencyPipe.transform(value);
            default:
              return value;
          }
        }
      this.cd.markForCheck();
    });

  }


  ngOnInit(): void {
    this.updateProduct$
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
      )
      .subscribe(() => {
        this.getProducts();
      });

    this.updateProduct$.next();
  }

  typeProduct(value) {
    if (value !== 'latest') {
      this.router.navigate(['/product', value]);
    } else {
      this.router.navigate(['/product']);
    }
  }

  shortProduct() {
    switch (this.shortBy) {

      case 'rating':
        this.request.order_by = 'avg_rating';
        this.request.order = 'desc';
        break;

      case 'price_asc':
        this.request.order_by = 'price';
        this.request.order = 'asc';
        break;

      case 'price_desc':
        this.request.order_by = 'price';
        this.request.order = 'desc';

        break;
      case 'name_asc':
        this.request.order_by = 'name';
        this.request.order = 'asc';

        break;
      case 'name_desc':
        this.request.order_by = 'name';
        this.request.order = 'desc';
        break;

      default:
        this.request.order_by = 'name';
        this.request.order = 'asc';
        break;
    }
    this.request.page = 1;
    this.updateProduct$.next();
  }

  applyFilter(type = '') {
   
    if (type === 'category') {
      this.getBrands({
        category_ids: this.request.category_ids.map((category) => category.value),
      });
    }

    if (type === 'price') {
      this.request.price = {
        min: this.minValue,
        max : this.maxValue,
      }
    }

    this.request.page = 1;
    this.request.limit = 12;
    this.updateProduct$.next();
  }
 /*  toggleFilter() {
    //this.showFilter = true;
    
    if (this.showFilter = false) {
      this.showFilter = true;
    } 
    if (this.showFilter = true) {
      this.showFilter = false;
    }
    console.log(this.showFilter);
    

  } */

  getProducts() {
    
    if(this.request.page > 1) this.loading = false;
     
    const request = Object.assign({}, this.request);
    if (request.category_ids && request.category_ids.length > 0) {
      request.category_ids = request.category_ids.map((category) => {
        return category.value;
      });
    }
    if (request.brand_ids && request.brand_ids.length > 0) {
      request.brand_ids = request.brand_ids.map((category) => {
        return category.value;
      });
    }
    if (this.category) {
      if (request.category_ids && request.category_ids.length > 0) {
        request.category_ids.push(this.category.id);
      } else {
        request.category_ids = [this.category.id];
      }
    }
   
    return this.productService.getProducts(request).then((req) => {
      this.hasMorePage = req.meta.current_page <= req.meta.last_page;
      this.pageMeta = req.meta;
      if(this.request.page == 1){
        this.products = req.data;
      }
      this.maxPriceInRs = Math.ceil(req.max_price);
      this.options.ceil = this.maxPriceInRs;
      if (!this._maxValue){
        this._maxValue = this.maxPriceInRs;
      }
      this.onScrollSuccess(req)
      //return req;
    }).finally(() => {
      if (isPlatformBrowser(this.platformId)) {
        //window.scrollTo(0, 0);
      }
      this.loading = false;
    });
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

  getCategories() {
    this.categoriesLoading = true;
    const request: any = { with: ['children'] };
    if (this.category) {
      request.category_id = this.category.id;
    }

    if (this.category && this.category.children) {
      this.categories = this.category.children;
      return;
    }

    return this.productService.getCategories(request).then((req) => {
      this.categories = req.data;
      return req;
    }).finally(() => {
      this.categoriesLoading = false;
    });
  }

  getCategory(slug) {
    const request = { with: ['children', 'parent'] };
    return this.productService.getCategory(slug, request).then((req) => {
      this.category = req.data;
      return req;
    });
  }

  getBrands(filter: any = {}) {
    this.categoriesLoading = true;
    const request: any = Object.assign({ with: ['children'] }, filter);
    if (this.category) {
      if (request.category_ids && request.category_ids.length > 0) {
        request.category_ids.push(this.category.id);
      } else {
        request.category_ids = [this.category.id];
      }
    }
    return this.productService.getBrands(request).then((req) => {
      this.brands = req.data;
      return req;
    }).finally(() => {
      this.categoriesLoading = false;
    });
  }


  loadeMoreProducts(event: any) {
    this.request.limit = event.pageSize;
    this.request.page = event.pageIndex + 1;
    this.getProducts();
  }

   // When scroll down the screen
   onScroll(){
    console.log("Scrolled");
    this.request.page = this.request.page + 1;
    this.getProducts();
  }


  ngOnDestroy() {
  }
}
