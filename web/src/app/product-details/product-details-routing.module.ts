import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoductDetailsResolver } from '../shared/resolver/product/poduct-details-resolver';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: ':slug',
    component: ProductDetailsComponent,
    resolve: {
      product: PoductDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
