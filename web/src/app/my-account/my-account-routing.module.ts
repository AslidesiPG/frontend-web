import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: '',
        loadChildren: () => {
          return import('src/app/my-account/personal-information/personal-information.module').then((m) => m.PersonalInformationModule);
        },
      },
      {
        path: 'my-orders',
        loadChildren: () => import('src/app/my-account/my-orders/my-orders.module').then((m) => m.MyOrdersModule),
      },
      {
        path: 'return-orders',
        loadChildren: () => import('src/app/my-account/return-orders/return-orders.module').then((m) => m.ReturnOrdersModule),
      },
      {
        path: 'address-book',
        loadChildren: () => import('src/app/my-account/address-book/address-book.module').then((m) => m.AddressBookModule),
      },
       {
        path: 'wishlist',
        loadChildren: () => import('src/app/my-account/wishlist/wishlist.module').then((m) => m.WishlistModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
