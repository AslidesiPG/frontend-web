import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorRegisterComponent } from './vendor-register/vendor-register.component';

const routes: Routes = [
  {
    path: '',
    component: VendorRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRegisterRoutingModule { }
