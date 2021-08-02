import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'product',
    data: {
      tab: 'latest',
      type: 'products',
      title: 'Latest Products',
    },
    component: ProductComponent
  },
  {
    path: 'product/category/:slug',
    data: {
      type: 'category',
    },
    component: ProductComponent
  },
  {
    path: 'product-best-selling',
    data: {
      tab: 'best-selling',
      title: 'Best Selling Products',
    },
    component: ProductComponent
  },
  {
    path: 'product-most-view-selling',
    data: {
      tab: 'most-view',
      title: 'Most Viewed Products',
    },
    component: ProductComponent
  },
  {
    path: 'product-featured',
    data: {
      tab: 'featured',
      title: 'Featured Products',
    },
    component: ProductComponent
  },
  {
    path: 'product-discount',
    data: {
      tab: 'discount',
      title: 'Discounted Products',
    },
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
