import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductItemModule } from '../shared/components/product-item/product-item.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestCallBackModule } from '../shared/components/request-call-back/request-call-back.module';
import { AddToCartButtonModule } from '../shared/components/add-to-cart-button/add-to-cart-button.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule,
    CarouselModule,
    MatTabsModule,
    ProductItemModule,
    MatDialogModule,
    RequestCallBackModule,
    AddToCartButtonModule
  ]
})
export class HomeModule { }
