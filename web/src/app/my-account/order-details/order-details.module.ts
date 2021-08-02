import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditAddressModule } from 'src/app/shared/components/add-edit-address/add-edit-address.module';
import { MatButtonModule } from '@angular/material/button';
import { ProductItemModule } from 'src/app/shared/components/product-item/product-item.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { GiveRatingModule } from 'src/app/shared/components/give-rating/give-rating.module';
import { StarRatingModule } from 'src/app/shared/components/star-rating/star-rating.module';
import { AttributesModule } from 'src/app/shared/components/attributes/attributes.module';


@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    AddEditAddressModule,
    ProductItemModule,
    CarouselModule,
    MatIconModule,
    GiveRatingModule,
    StarRatingModule,
    AttributesModule
  ]
})
export class OrderDetailsModule { }
