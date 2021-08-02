import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Product } from '@models';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProductService } from '../../services/product.service';
import { OptionsScrollDirective } from '../../diractive/options-scroll.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../../services/auth/user.service';
import { isEmpty } from '@utils';


@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  filterProductRequest: any = {
    search: '',
    page: 1,
    limit: 15,
  };
  search: string;
  searchType: string = 'product';

  @Input() allowVendorSearch = false;
  @Input() categoryId;
  @Input() formSubmit = true;
  @Input() redirectToDetails = true;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') searchInput: NgModel;
  filteredProduct: Product[];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.searchInput
      .valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
      ).subscribe((val) => {
        this.filterProductRequest.search = val;
        this.filterProductRequest.page = 1;
        this.filter().then((resp) => {
          this.filteredProduct = resp.data;
        });
      });
  }


  displayFn(product: any) {
    return product ? product.name : null;
  }

  searchProduct() {
    if (!isEmpty(this.search)) {
      if (this.searchType == 'vendor') {
        return;
      }
      if (this.formSubmit) {
        return this.router.navigate(['/product'], {
          queryParams: {
            search: this.search
          }
        });
      }
    }

  }

  viewProduct(product: Product) {
    return this.router.navigate(['/product', product.slug]);
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    if (this.searchType == 'vendor') {
      const user = $event.option.value;
      return this.router.navigate(['/vendor-profile', user.slug || user.id]);
    } else {
      if (this.redirectToDetails) {
        this.viewProduct($event.option.value);
      }

    }
    this.optionSelected.emit($event.option.value);
  }


  onScroll($event: OptionsScrollDirective) {
    this.filterProductRequest.page++;
    this.filter().then((resp: any) => {
      this.filteredProduct = this.filteredProduct.concat(resp.data);
      $event.complete();
    }).catch(() => {
      $event.disabled();
    });
  }

  filter() {
    if (this.searchType === 'vendor') {
      this.filterProductRequest.page = 1;
      return this.userService.getSearchVendor(this.filterProductRequest);
    } else {
      if (this.categoryId) {
        this.filterProductRequest.category_ids = [this.categoryId];
      } else {
        delete this.filterProductRequest.category_ids;
      }
      return this.productService.getProducts(this.filterProductRequest);
    }
  }

  submit(value: any) {

    if (this.redirectToDetails) {
      this.router.navigate(['/search'], {
        queryParams: {
          search: value
        }
      });
    }
  }

}
