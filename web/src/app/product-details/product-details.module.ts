import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductItemModule } from '../shared/components/product-item/product-item.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxGalleryModule } from 'src/app/packages/ngx-gallery';
import { QuantityUpdateModule } from '../shared/components/quantity-update/quantity-update.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StarRatingModule } from '../shared/components/star-rating/star-rating.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ShareButtonsModule } from '../shared/components/share-buttons/share-buttons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpMessageModule } from '../shared/modules/http-message/http-message.module';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SharedModule,
    MatButtonModule,
    ProductItemModule,
    ReactiveFormsModule,
    FormsModule,
    NgxGalleryModule,
    QuantityUpdateModule,
    CarouselModule,
    StarRatingModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    ShareButtonsModule,
    MatIconModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    HttpMessageModule,
  ]
})
export class ProductDetailsModule { }
