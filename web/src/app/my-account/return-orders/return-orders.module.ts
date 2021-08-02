import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnOrdersRoutingModule } from './return-orders-routing.module';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';


@NgModule({
  declarations: [ReturnOrdersComponent],
  imports: [
    CommonModule,
    ReturnOrdersRoutingModule
  ]
})
export class ReturnOrdersModule { }
