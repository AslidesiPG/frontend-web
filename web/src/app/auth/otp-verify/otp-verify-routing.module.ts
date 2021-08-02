import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpVerifyModule } from './otp-verify.module';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';

const routes: Routes = [
  {
    path: '',
    component: OtpVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpVerifyRoutingModule { }
