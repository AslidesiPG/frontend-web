import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/services/helper.service';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { CountryISO, NgxIntlTelInputComponent, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.scss']
})
export class ChangePhoneComponent implements OnInit {

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  @ViewChild('phoneInput') phoneInput: NgxIntlTelInputComponent;

  httpError: any;
  isOTP = false;
  formSubmited: boolean;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  loading: boolean;
  otp: any;
  phone: any;
  interval: any;
  timeLeft: number;

  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChangePhoneComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private helperService: HelperService,
  ) {

  }

  ngOnInit() {
    const item = this.data.item || {};

    const phoneValue = {
      // number: item.phone,
      // dialCode: item.phone_country_code,
    }
    this.form = this.fb.group({
      phone: [phoneValue, Validators.required],
    });



    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        }
      }, 1000);
    }
  }

  save() {
    this.formSubmited = true;
    if (this.form.valid) {
      this.loading = true;
      const phone = this.form.value.phone;
      const request = {
        phone_country_code: phone.dialCode.replace(/\+/g, ''),
        phone: phone.number.replace(/\s+/g, ''),
      };
      this.authService.sendOtp(request).then((data: any) => {
        this.helperService.successMessage(data);
        this.phone = request;
        this.isOTP = true;
      }).catch((error) => {
        this.httpError = error;
      }).finally(() => {
        this.loading = false;
      });
    }
  }

  onOtpChange(event) {
    this.otp = event;
  }


  resend() {
    this.httpError = null;
    this.authService.resendOtp(this.phone).then((data) => {
      this.helperService.successMessage(data);
    }).catch((error) => {
      this.httpError = error;
    });
  }

  verifyPhoneOtp() {
    this.httpError = null;
    this.loading = true;
    const request = {
      otp: this.otp,
      ...this.phone
    };
    this.userService.verifyPhoneOtp(request).then((data: any) => {
      this.helperService.successMessage('Phone number updated successfully');
      this.dialogRef.close(request);
    }).catch((error) => {
      this.httpError = error;
    }).finally(() => {
      this.loading = false;
    });
  }
}
