import { Component, Inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PageService } from 'src/app/shared/services/page.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RequestCallBackComponent } from '../../request-call-back/request-call-back/request-call-back.component';

@Component({
  selector: 'app-contact-for-price',
  templateUrl: './contact-for-price.component.html',
  styleUrls: ['./contact-for-price.component.scss']
})
export class ContactForPriceComponent implements OnInit {
  form: FormGroup;
  httpError: any;
  user: any;
  constructor(

    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private pageService: PageService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RequestCallBackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.authService
      .$user
      .pipe()
      .subscribe((isLogin) => {
        this.user = isLogin;
      });

      console.log(this.user);
    this.form = this.formBuilder.group({
      name: [(this.user ? this.user.name : ''), Validators.required],
      phone: [(this.user ? this.user.phone : ''), Validators.required],
      email: [(this.user ? this.user.email : ''), Validators.required],
      weight: [''],

      message: [''],
    });
  }

  send() {
    let response;
    const request={
      product_id: this.data.item,
      ...(this.form.value)
    }
    // console.log(request);
    response = this.pageService.contactForPrice(request);
    response.then((data: any) => {
      this.dialogRef.close(data);
      this.helperService.successMessage({ message: data?.message });
    }).catch((error) => {
      this.httpError = error.error;
    });

  }

}
