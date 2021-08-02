import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-otp-submit',
  templateUrl: './otp-submit.component.html',
  styleUrls: ['./otp-submit.component.scss']
})
export class OtpSubmitComponent implements OnInit {

  otp: number;
  timeLeft = 30;
  interval;
  loading: boolean;
  message: any;
phone:any ={};
  requestData: any;
  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    private authService: AuthService,
    private helperService: HelperService,
    private router: Router,
    public dialogRef: MatDialogRef<OtpSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.phone = this.data.phone;
    this.requestData = this.data.request;

    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        }
      }, 1000);
    }
  }

  onOtpChange(event) {
    this.otp = event;
  }

  otpSubmit() {
    const request = {
      ...(this.requestData),
      otp: this.otp,
      phone: this.phone.phone,
      phone_country_code: this.phone.phone_country_code,
    };

    this.loading = true;
    this.message = null;
        this.authService.vendorRegistration(request).then(() => {
          sessionStorage.removeItem('signup_data');
          this.dialogRef.close();
          this.router.navigate(['/vendor-login'])
        }).catch((error) => {
          this.message = error.error;
        }).finally(()=>{
          this.loading = false;
        });
  }

  resend() {
    const request = {
      phone: this.phone.phone,
      phone_country_code: this.phone.phone_country_code,
    };
    this.message = null;
    this.authService.resendOtp(request).then((data) => {
      this.helperService.successMessage(data);
    }).catch((error) => {
      this.message = error.error;
    });
  }

}
