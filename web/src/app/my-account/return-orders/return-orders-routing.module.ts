import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnOrdersRoutingModule { }
