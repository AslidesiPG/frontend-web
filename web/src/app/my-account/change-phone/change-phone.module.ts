import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePhoneComponent } from './change-phone.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgOtpInputModule } from 'src/app/packages/ng-otp-input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ChangePhoneComponent],
  entryComponents: [ChangePhoneComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    HttpMessageModule,
    MatIconModule,
    NgxIntlTelInputModule,
    NgOtpInputModule,
    MatButtonModule,
  ]
})
export class ChangePhoneModule { }
