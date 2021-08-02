import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerifyRoutingModule } from './otp-verify-routing.module';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { NgOtpInputModule } from 'src/app/packages/ng-otp-input';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';


@NgModule({
  declarations: [OtpVerifyComponent],
  imports: [
    CommonModule,
    OtpVerifyRoutingModule,
    SharedModule,
    MatButtonModule,
    NgOtpInputModule,
    HttpMessageModule,
  ]
})
export class OtpVerifyModule { }
