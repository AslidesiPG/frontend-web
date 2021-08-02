import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('src/app/checkout/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'shipping',
    loadChildren: () => import('src/app/checkout/shipping/shipping.module').then((m) => m.ShippingModule),
  },
  {
    path: 'payment',
    loadChildren: () => import('src/app/checkout/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'thank-you',
    loadChildren: () => import('src/app/checkout/thankyou/thankyou.module').then((m) => m.ThankyouModule),
  },
  {
    path: 'error',
    loadChildren: () => import('src/app/checkout/error/error.module').then((m) => m.ErrorModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
