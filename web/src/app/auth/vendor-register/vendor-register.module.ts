import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRegisterRoutingModule } from './vendor-register-routing.module';
import { VendorRegisterComponent } from './vendor-register/vendor-register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqModule } from 'src/app/shared/components/faq/faq.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OtpSubmitModule } from 'src/app/shared/components/otp-submit/otp-submit.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [VendorRegisterComponent],
  imports: [
    CommonModule,
    VendorRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpMessageModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatStepperModule,
    NgxIntlTelInputModule,
    MatExpansionModule,
    FaqModule,
    NgxCaptchaModule,
    OtpSubmitModule,
    MatSelectModule,
  ]
})
export class VendorRegisterModule { }
