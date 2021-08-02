import { Attribute, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CheckoutStepModule } from 'src/app/shared/components/checkout-step/checkout-step.module';
import { AddToCartButtonModule } from 'src/app/shared/components/add-to-cart-button/add-to-cart-button.module';
import { DialogsModule } from 'src/app/shared/modules/dialogs/dialogs.module';
import { AttributesModule } from 'src/app/shared/components/attributes/attributes.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    CheckoutStepModule,
    AddToCartButtonModule,
    DialogsModule, 
    AttributesModule,
    MatIconModule                                       
  ]
})
export class CartModule { }
