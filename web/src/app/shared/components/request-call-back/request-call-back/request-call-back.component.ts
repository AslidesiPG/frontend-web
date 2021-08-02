import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-request-call-back',
  templateUrl: './request-call-back.component.html',
  styleUrls: ['./request-call-back.component.scss']
})
export class RequestCallBackComponent implements OnInit {
  form: FormGroup;
  httpError: any;
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<RequestCallBackComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  save() {
    if (this.form.valid) {
      let response;
      response = this.commonService.callRequest(this.form.value);
      response.then((data: any) => {
        this.dialogRef.close(data);
        this.helperService.successMessage({ message: data?.message });
      }).catch((error) => {
        this.httpError = error.error;
      });
    }


  }

}
