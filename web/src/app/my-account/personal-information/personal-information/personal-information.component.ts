import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ChangePhoneComponent } from '../../change-phone/change-phone.component';

@UntilDestroy()
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  mode: 'create' | 'update' = 'update';
  user: any = {};
  httpError: any;
  isEdit = false;
  formSubmited: boolean;
  url: string | ArrayBuffer;
  uploadedFiles: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private matDialog: MatDialog,
    private helperService: HelperService,
  ) { }


  ngOnInit(): void {

    this.authService
      .$user
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user)
      });

    const profile = this.user || {};



    this.form = this.fb.group({
      first_name: [profile.first_name || ''],
      last_name: [profile.last_name || ''],
      // phone_country_code: [profile.phone_country_code || '91'],
      // phone: [profile.phone || ''],
      gst_number: [''],
      email: [profile.email || ''],
      dob: [profile.dob ? profile.dob : null],
      gender: [profile.gender || ''],
    });
  }
  send() {
    console.log(this.form)
    this.formSubmited = true;
    if (this.form.valid) {
      const request = {
        ...this.form.value,
        dob: this.form.value.dob ? moment(this.form.value.dob).format('YYYY-MM-DD') : null,
      };

      this.userService.updateUser(request).then((res: any) => {
        this.user = res.user;
        this.authService.user = res.user;
        this.isEdit = false;
        
        this.helperService.successMessage('Profile info successfully updated');
      }).catch((error) => {
        this.httpError = error.error;
      });
    }
  }

  onSelectFile(event, key) {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      this.uploadedFiles[key] = file;
      this.userService.updateUser(this.uploadedFiles).then((req:any)=>{
        console.log(req)
        this.authService.user = {
          ...this.authService.user,
          photo: req.user.photo,
          photo_urls: req.user.photo_urls,
          
        }
      })
    }
  }

  editPhone() {
    this.matDialog
      .open(ChangePhoneComponent, {
        data: {
          item: {
            phone_country_code: this.user.phone_country_code,
            phone: this.user.phone,
          }
        }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.user.phone_country_code = value.phone_country_code;
          this.user.phone = value.phone;
          this.user = this.user;
        }
      });
  }
  ngOnDestroy(): void { }

}
