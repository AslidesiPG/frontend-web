import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    SharedModule,
    MatIconModule,
  ]
})
export class MyOrdersModule { }
