import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneLoginComponent } from './phone-login/phone-login.component';

const routes: Routes = [
  {
    path: '',
    component: PhoneLoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneLoginRoutingModule { }
