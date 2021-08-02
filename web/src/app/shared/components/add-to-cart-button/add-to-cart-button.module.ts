import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartButtonComponent } from './add-to-cart-button/add-to-cart-button.component';
import { QuantityUpdateModule } from '../quantity-update/quantity-update.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AddToCartButtonComponent],
  exports: [AddToCartButtonComponent],
  imports: [
    CommonModule,
    QuantityUpdateModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class AddToCartButtonModule { }
