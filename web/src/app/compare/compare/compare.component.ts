import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CompareService } from 'src/app/shared/services/compare.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../../../../libs/models/src/product';

@UntilDestroy()
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit, OnDestroy {
  brands: any = [];
  products: Product[] = [];
  headings: any[] = [];
  data: any = [];

  constructor(
    private productService: ProductService,
    private compareService: CompareService,
  ) {

  }
  getBlankIndex() {
    return this.compareService.getBlankIndex();
  }

  setProduct(item, index: any) {
    this.productService.getProduct(item.slug).then((newProduct: any) => {
      this.compareService.addToCompare(newProduct.data, index);
    }).catch((error) => {

    });
  }

  ngOnInit() {
    this.compareService.loadCompares();
    this.products = this.compareService.compares;

    this.compareService.$compares
      .pipe(untilDestroyed(this))
      .subscribe((products: any) => {
        if (products) {
          this.products = products;
          if (this.products.length > 0) {
            this.loadHeading(this.products[0]);
          }
        } else {
          this.products = [];
        }
       
      });
  }


  loadHeading(product: Product) {
    this.headings = [
      { title: 'Price', key: 'selling_price', type: 'amount' },
    ];
    if (product && product.product_attributes) {
      let index = 0;
      product.product_attributes.forEach((item) => {
        this.headings.push({ title: item.name, key: `product_attributes.${index}.value`});
        index++;
      });
    }
  }


  removeCompare(id: any) {
    this.compareService.removeCompare(id);
  }


  unique(array: any[]) {
    return array.filter((el, index, arr) => {
      return index === arr.indexOf(el);
    });
  }

  getValue(obj, key) {
    return key.split('.').reduce((o, x) => {
      return (typeof o === 'undefined' || o === null) ? o : o[x];
    }, obj);
  }

  ngOnDestroy(): void {
  }

}
