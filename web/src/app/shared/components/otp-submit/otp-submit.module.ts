import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpSubmitComponent } from './otp-submit/otp-submit.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpMessageModule } from '../../modules/http-message/http-message.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [OtpSubmitComponent],
  exports: [OtpSubmitComponent],
  entryComponents: [OtpSubmitComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    HttpMessageModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    LoadingModule,
  ]
})
export class OtpSubmitModule { }
