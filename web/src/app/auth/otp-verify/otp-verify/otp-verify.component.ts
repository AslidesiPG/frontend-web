import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from '@utils';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit, OnDestroy {
  otp: number;
  phone: any = {};
  timeLeft = 30;
  interval;
  loading: boolean;
  loginMessage: any;
  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    private authService: AuthService,
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.phone = this.authService.phoneNumber;
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
      otp: this.otp,
      phone: this.phone.phone,
      phone_country_code: this.phone.phone_country_code,
    };

    this.loading = true;
    this.loginMessage = null;
    this.authService.verifyOtp(request)
      .then((req: any) => {
        if (this.activatedRoute.snapshot.queryParams.returnUrl) {
          this.router.navigate(['/'+this.activatedRoute.snapshot.queryParams.returnUrl]);
          //this.router.navigateByUrl('/' + (this.activatedRoute.snapshot.queryParams.returnUrl as string));
        }else{
            this.router.navigate(['/']);
        }
        /* if (!isEmpty(req.user.profile_created_at)) {
          this.router.navigate(['/my-account']);
        } else {
          this.router.navigate(['/']);
        } */
      })
      .catch((error) => {
        this.loginMessage = error.error;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  resend() {
    const request = {
      phone: this.phone.phone,
      phone_country_code: this.phone.phone_country_code,
    };
    this.loginMessage = null;
    this.authService.resendOtp(request).then((data) => {
      this.helperService.successMessage(data);
    }).catch((error) => {
      this.loginMessage = error.error;
    });
  }
  ngOnDestroy(): void { }

}