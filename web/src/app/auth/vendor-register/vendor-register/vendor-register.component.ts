import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomValidator } from 'src/app/shared/validator';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OtpSubmitComponent } from 'src/app/shared/components/otp-submit/otp-submit/otp-submit.component';
import { UserService } from 'src/app/shared/services/auth/user.service';

@UntilDestroy()
@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.scss'],

})
export class VendorRegisterComponent implements OnInit, OnDestroy {
  registerMessage: any = null;
  countries = [];
  states = [];
  cites = [];
  savedForm: any;
  is_iec_code = false;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  basicForm: FormGroup;
  businessForm: FormGroup;
  documentsForm: FormGroup;

  passwordInputType = 'password';
  @ViewChild('stepper') matStepper: MatHorizontalStepper;

  uploadedFiles: any = {};
  vendorFaqs: any;
  queryStringData: any = {};

  siteKey = environment.reCaptchaSiteKey;
  isBrowser: boolean;
  mySelections: any;
  sellerTypes: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private matDialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }




  ngOnInit(): void {

    this.activatedRoute.queryParams
      //.pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        if (params?.name) {
          this.queryStringData.firstName = params?.name.split(' ').slice(0, -1).join(' ');
          this.queryStringData.lastName = params?.name.split(' ').slice(-1).join(' ');
        }
        const phoneValue = {
          number: params?.phone,
        }
        this.queryStringData.phone = phoneValue?.number;
        this.queryStringData.term_condition = params?.term_condition;
        this.queryStringData.business_name = params?.business_name;

      });
    console.log(this.queryStringData)



    this.basicForm = this.fb.group({
      first_name: [this.savedForm?.first_name || this.queryStringData.firstName || ''],
      last_name: [this.savedForm?.last_name || this.queryStringData.lastName || ''],
      display_name: [this.savedForm?.display_name || ''],
      seller_types: [this.savedForm?.seller_types || ''],
      email: [this.savedForm?.email || ''],
      phone: [this.savedForm?.phone || this.queryStringData.phone || ''],
      address1: [this.savedForm?.address1 || ''],
      password: [this.savedForm?.password || '', CustomValidator.minLength(6)],
      //confirmPassword: ['', Validators.required],
      country_id: [this.savedForm?.country_id || ''],
      state_id: [this.savedForm?.state_id || ''],
      city_id: [this.savedForm?.city_id || ''],
      zip_code: [this.savedForm?.zip_code || ''],
      term_condition: [this.savedForm?.term_condition || this.queryStringData.term_condition || ''],
      business_name: [this.savedForm?.business_name || this.queryStringData?.business_name || ''],
      cod_status: [this.savedForm?.cod_status || ''],
      iec_code: [null],
      //recaptcha: ['', Validators.required]
      confirmPassword: [this.savedForm?.confirmPassword || '', CustomValidator.minLength(6)]
    });
 

    this.businessForm = this.fb.group({
      account_number: [this.savedForm?.account_number || ''],
      confirm_account_number: [this.savedForm?.confirm_account_number || '', CustomValidator.isEqual(this.businessForm, 'account_number')],
      gst_number: [this.savedForm?.gst_number || ''],
      pan_number: [this.savedForm?.pan_number || ''],
      account_holder_name: [this.savedForm?.account_holder_name || ''],
      bank_name: [this.savedForm?.bank_name || ''],
      ifsc_code: [this.savedForm?.ifsc_code || ''],
    });

    this.documentsForm = this.fb.group({
      gst: [this.savedForm?.gst || ''],
      pan_card: [this.savedForm?.pan_card || ''],
      address_proof: [this.savedForm?.address_proof || ''],
      cancel_cheque: [this.savedForm?.cancel_cheque || ''],
    });

    this.commonService.vendorFaq({ limit: 10, page: 1 }).then((resp: any) => {
      this.vendorFaqs = resp.data;
    });

    this.userService.getSellerType().then((resp:any)=>{
      this.sellerTypes = resp.data;
    })

    this.commonService.getCountry().then((req: any) => {
      this.countries = req.data;
    });

    this.basicForm.controls.country_id.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.commonService.getState(value).then((req: any) => {
        this.states = req.data;
      });
    });
    this.basicForm.controls.state_id.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.commonService.getCity(value).then((req: any) => {
        this.cites = req.data;
      });
    });

    /*this.savedForm = this.fb.group({
      password: [this.savedForm?.password || ''],
      confirmPassword: [this.savedForm?.confirmPassword || '', CustomValidator.isEqual(this.savedForm, 'password')],
    });*/

  }

  async basicSubmit($event) {
    try {
      console.log(this.basicForm.valid);
      if (this.basicForm.valid) {
        this.savedForm = this.getFormValue();
        const phone = this.basicForm.value.phone;
        const request = {
          phone_country_code: phone?.dialCode?.replace(/\+/g, ''),
          ...(this.basicForm.value),
          phone: phone?.number?.replace(/\s+/g, ''),
        };

        console.log(request);
        this.commonService.emailValidaton(request).then((resp: any) => {
          console.log(resp);
          this.registerMessage = null;
          this.matStepper.next();
        }).catch((error) => {
          window.scrollTo(0, 0);
          this.registerMessage = error.error;
        })

      }
    } catch (error) {
      this.helperService.errorMessage(error.error);
    }
  }

  changed(value) {
    const phoneControl = this.basicForm.get('iec_code');
    if(value.indexOf(8) !== -1){
      this.is_iec_code = true;
      phoneControl.setValidators([Validators.required]);
    }else{
      this.is_iec_code = false;
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
    /* console.log(this.basicForm.value.seller_types, value)
    if (this.basicForm.value?.seller_types?.length < 2) {
      this.mySelections = value;
    } else {
      this.basicForm.value.seller_types = this.mySelections;
    } */
  }

  async businessSubmit($event) {

    try {
      if (this.basicForm.valid) {
        this.savedForm = this.getFormValue();
        this.matStepper.next();
      }
    } catch (error) {
      this.helperService.errorMessage(error.error);
    }
  }
  /* async submit() {
    this.phoneData = this.basicForm.value.phone;
    this.request = {
      phone_country_code: this.phoneData?.dialCode?.replace(/\+/g, ''),
      ...(this.basicForm.value),
      ...(this.documentsForm.value),
      ...(this.businessForm.value),
      phone: this.phoneData?.number?.replace(/\s+/g, ''),
      ...this.uploadedFiles,
    };
    this.authService.vendorRegistration(request).then((req) => {
      sessionStorage.removeItem('signup_data');
      this.router.navigate(['/vendor-login'])
    }).catch((error) => {
      window.scrollTo(0, 0);
      this.registerMessage = error.error;
    });
  } */


  submit() {
    if (this.basicForm.valid) {
      const phoneData = this.basicForm.value.phone;
      const requestData = {
        phone_country_code: phoneData?.dialCode?.replace(/\+/g, ''),
        ...(this.basicForm.value),
        ...(this.documentsForm.value),
        ...(this.businessForm.value),
        phone: phoneData?.number?.replace(/\s+/g, ''),
        ...this.uploadedFiles,
      };
      const phone = {
        phone_country_code: phoneData.dialCode.replace(/\+/g, ''),
        phone: phoneData.number.replace(/\s+/g, ''),
      };
      this.authService.sendOtp(phone).then(() => {
        this.matDialog.open(OtpSubmitComponent, {
          data: { phone: phone, request: requestData }
        }).afterClosed()
      }).catch((error) => {
        this.helperService.errorMessage(error.error);
      })
    }

  }


  onFileChange(event, key) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.uploadedFiles[key] = file;
    }
  }

  handleSuccess() {

  }


  getFormValue() {
    let savedForm: any = {};
    try {
      const signupData = sessionStorage.getItem('signup_data');
      savedForm = JSON.parse(signupData);
      savedForm = savedForm ? savedForm : {};
    } catch (error) {
      savedForm = {};
    }
    return savedForm;
  }


  ngOnDestroy(): void { }

}
