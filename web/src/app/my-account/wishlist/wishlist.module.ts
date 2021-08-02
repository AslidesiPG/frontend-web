import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductItemModule } from 'src/app/shared/components/product-item/product-item.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModule,
    ProductItemModule,
    MatPaginatorModule,
  ]
})
export class WishlistModule { }
