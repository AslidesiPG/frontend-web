import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutStepComponent } from './checkout-step/checkout-step.component';



@NgModule({
  declarations: [CheckoutStepComponent],
  exports: [CheckoutStepComponent],
  entryComponents: [CheckoutStepComponent],
  imports: [
    CommonModule
  ]
})
export class CheckoutStepModule { }
