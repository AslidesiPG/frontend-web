import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFailComponent } from './payment-fail.component';
import { PaymentFailRoutingModule } from './payment-fail.routing.module';


@NgModule({
    declarations: [PaymentFailComponent],
    imports: [
        CommonModule,
        PaymentFailRoutingModule
    ],
    bootstrap: [PaymentFailComponent]
})
export class PaymentFailModule { }
