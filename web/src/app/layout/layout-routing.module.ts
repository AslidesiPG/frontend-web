import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { ComponentComponent } from './component/component.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('src/app/auth/phone-login/phone-login.module').then((m) => m.PhoneLoginModule),
      },
      {
        path: 'vendor-login',
        loadChildren: () => import('src/app/auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('src/app/auth/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule),
      },
      {
        path: 'otp-verify',
        loadChildren: () => import('src/app/auth/otp-verify/otp-verify.module').then((m) => m.OtpVerifyModule),
      },
/*      {
        path: 'register',
        loadChildren: () => import('src/app/auth/register/register.module').then((m) => m.RegisterModule),
      },*/
      {
        path: 'vendor-register',
        loadChildren: () => import('src/app/auth/vendor-register/vendor-register.module').then((m) => m.VendorRegisterModule),
      },
      {
        path: 'create-profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/auth/create-profile/create-profile.module').then((m) => m.CreateProfileModule),
      },
      {
        path: '',
        loadChildren: () => import('src/app/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/checkout/checkout.module').then((m) => m.CheckoutModule),
      },
      {
        path: '',
        loadChildren: () => import('src/app/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'category',
        loadChildren: () => import('src/app/category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'product',
        loadChildren: () => import('src/app/product-details/product-details.module').then((m) => m.ProductDetailsModule),
      },
      {
        path: 'my-account',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/my-account/my-account.module').then((m) => m.MyAccountModule),
      },
      {
        path: 'order-details',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/my-account/order-details/order-details.module').then((m) => m.OrderDetailsModule),
      },
      {
        path: 'vendor-faq',
        loadChildren: () => import('src/app/vendor-faq/vendor-faq.module').then((m) => m.VendorFaqModule),
      },
      {
        path: 'faqs',
        loadChildren: () => import('src/app/page/faqs/faqs.module').then((m) => m.FaqsModule),
      },
      {
        path: 'vendor-profile',
        loadChildren: () => import('src/app/vendor-profile/vendor-profile.module').then((m) => m.VendorProfileModule),
      },
      {
        path: 'compare',
        loadChildren: () => import('src/app/compare/compare.module').then((m) => m.CompareModule),
      },
      {
        path: 'payment-fail',
        loadChildren: () => import('src/app/page/payment-fail/payment-fail.module').then((m) => m.PaymentFailModule),
      },
      {
        path: '',
        loadChildren: () => import('src/app/page/page.module').then((m) => m.PageModule),
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
