import { Component, OnInit, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { getTitle } from '@utils';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from 'src/environments/environment';
import { WindowRef } from 'src/app/shared/services/window-ref.service';
@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginMessage: any = null;
  inputType = 'password';
  fieldTextType: boolean;
  loading = false;
  formSubmite = false;
  environment = environment;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';

  constructor(
    private activatedRoute: ActivatedRoute,
    private windowRef: WindowRef,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    title: Title,
  ) {
    title.setTitle(getTitle('Login'));
  }
  ngOnDestroy(): void {
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params.get('jwt')) {
          this.authService.setAuth(params.get('jwt')).then(() => {
            this.router.navigateByUrl('/dashboard');
          });
        }
      });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      logged_in: ['']
    });
  }

  send() {
    this.formSubmite = true;
    if (this.form.valid) {
      console.log(this.form.value)
      this.authService.vendorLogin(this.form.value).then((data: any) => {
       // console.log(data);
        //this.router.navigateByUrl('/vendor-profile/'+data.id);
        const window = this.windowRef.getNativeWindow();
        window.location.href = data.url;
      }).catch((error) => {
        this.loginMessage = error;
      });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }




}
