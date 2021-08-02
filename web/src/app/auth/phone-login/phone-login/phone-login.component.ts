import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginMessage: any = null;

  loading = false;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  formSubmited: boolean;
  disable: boolean;
  environment = environment;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }
 

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ['', Validators.required],
    });

 /*    this.form.controls.phone.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      if (isEmpty(value)){

      }
    }); */
  }
  submit() {
    this.formSubmited = true;
    this.loginMessage = null;
    if (this.form.valid) {
      this.loading = true;
      const phone = this.form.value.phone;
      const request = {
        phone_country_code: phone.dialCode.replace(/\+/g, ''),
        phone: phone.number.replace(/\s+/g, ''),
      };
      this.authService.sendOtp(request)
        .then(() => {
          this.authService.phoneNumber = request;
          this.router.navigate(['/otp-verify'], { queryParams: this.activatedRoute.snapshot.queryParams });
        })
        .catch((error) => {
          this.loginMessage = error;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {};

}
