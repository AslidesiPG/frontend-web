import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorProfileRoutingModule } from './vendor-profile-routing.module';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StarRatingModule } from '../shared/components/star-rating/star-rating.module';
import { ProductItemModule } from '../shared/components/product-item/product-item.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [VendorProfileComponent],
  imports: [
    CommonModule,
    VendorProfileRoutingModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    StarRatingModule,
    ProductItemModule,
    MatPaginatorModule,
    SharedModule,
    LoadingModule,
    InfiniteScrollModule
  ]
})
export class VendorProfileModule { }
