import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneLoginRoutingModule } from './phone-login-routing.module';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [PhoneLoginComponent],
  imports: [
    CommonModule,
    PhoneLoginRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpMessageModule,
    MatButtonModule,
    NgxIntlTelInputModule,
    HttpMessageModule,
  ]
})
export class PhoneLoginModule { }
