import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { getTitle } from '@utils';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  registerMessage: any = null;
  inputType = 'password';
  visible = false;
  environment = environment;

  constructor(
    private authService: AuthService,
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
      password: ['', Validators.required],
      confirm_password: ['', [Validators.required]],
      addressline1: ['', Validators.required],
      addressline2: ['', Validators.required],
      phone: ['', Validators.required],
      country_code: ['91', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      zip_code: ['', Validators.required],
    });
  }

  send() {
   /*  this.registerMessage = null;
    if (this.form.valid) {
      const requestData = this.form.value;
      requestData.user_type = 'User';
      this.authService.register(requestData).then(() => {
        this.router.navigate(['/profile']);
      }).catch((error) => {
        this.registerMessage = error;
      });
    } */
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
    } else {
      this.inputType = 'text';
      this.visible = true;
    }
  }
}
