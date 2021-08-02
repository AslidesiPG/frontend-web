import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatExpansionModule } from '@angular/material/expansion';
import { CheckoutStepModule } from 'src/app/shared/components/checkout-step/checkout-step.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    NgxPayPalModule,
    MatExpansionModule,
    CheckoutStepModule,
    LoadingModule,
  ]
})
export class PaymentModule { }
