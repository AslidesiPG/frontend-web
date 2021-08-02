import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingComponent } from './shipping/shipping.component';
import { MatButtonModule } from '@angular/material/button';
import { AddEditAddressModule } from 'src/app/shared/components/add-edit-address/add-edit-address.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutStepModule } from 'src/app/shared/components/checkout-step/checkout-step.module';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';


@NgModule({
  declarations: [ShippingComponent],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    MatButtonModule,
    AddEditAddressModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CheckoutStepModule,
    HttpMessageModule,
    LoadingModule,
  ]
})
export class ShippingModule { }
