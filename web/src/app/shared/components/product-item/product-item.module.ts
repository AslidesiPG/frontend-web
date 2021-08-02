import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { QuantityUpdateModule } from '../quantity-update/quantity-update.module';
import { FormsModule } from '@angular/forms';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button/add-to-cart-button.component';
import { AddToCartButtonModule } from '../add-to-cart-button/add-to-cart-button.module';
import { ContactForPriceModule } from '../contact-for-price/contact-for-price.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogsModule } from '../../modules/dialogs/dialogs.module';



@NgModule({
  declarations: [ProductItemComponent],
  exports: [ProductItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    QuantityUpdateModule,
    FormsModule,
    AddToCartButtonModule,
    ContactForPriceModule,
    
  ]
})
export class ProductItemModule { }
