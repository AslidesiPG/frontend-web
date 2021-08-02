import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { getTitle } from '@utils';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],

})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });
  loginMessage: any;
  successMessage: any;
  loading: boolean;
 /*  icMail = icMail; */


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    title: Title,
  ) {
    title.setTitle(getTitle('Forgot Password'));
  }

  ngOnInit() {
  }

  send() {
    this.loading = true;
    this.successMessage = null;
    this.loginMessage = null;
    if (this.form.valid) {
      this.authService.forgotPassword(this.form.value).then((data) => {
        this.successMessage = data;
      }).catch((error) => {
        this.loginMessage = error.error;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
