import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getTitle } from '@utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/shared/services/helper.service';

@UntilDestroy()
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  registerMessage: any = null;
  inputType = 'password';
  visible = false;
  environment = environment;
  conutries = [];
  states = [];
  cites = [];
  uploadedFiles: any = {};


  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private helperService: HelperService,
    private router: Router,
    private fb: FormBuilder,
    title: Title,
  ) {
    title.setTitle(getTitle('Register'));
  }


  ngOnInit(): void {

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressline1: ['', Validators.required],
      addressline2: [''],
      gst_number: [''],
      photo: [''],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      zip_code: ['', Validators.required],
      gender: ['male', Validators.required],
    });

    this.form.controls.country_id.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.commonService.getState(value).then((req: any) => {
        this.states = req.data;
      });
    });

    this.form.controls.state_id.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.commonService.getCity(value).then((req: any) => {
        this.cites = req.data;
      });
    });

    this.commonService.getCountry().then((req: any) => {
      this.conutries = req.data;
    });
  }

  send() {
    this.registerMessage = null;
    const request = {
      ...(this.form.value),
      ...this.uploadedFiles,
    }
    console.log(this.form);
    if (this.form.valid) {
      this.authService.createProfile(request).then(() => {
        this.router.navigate(['/my-account']);
      }).catch((error) => {
        window.scrollTo(0, 0)
        console.log(error);
        this.registerMessage = error.error;
      });
    }
  }

  onFileChange(event, key) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.uploadedFiles[key] = file;
    }
  }



  ngOnDestroy(): void { }
}
