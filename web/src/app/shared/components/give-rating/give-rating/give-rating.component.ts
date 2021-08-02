import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/services/helper.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { PageService } from 'src/app/shared/services/page.service';
import { RequestCallBackComponent } from '../../request-call-back/request-call-back/request-call-back.component';

@Component({
  selector: 'app-give-rating',
  templateUrl: './give-rating.component.html',
  styleUrls: ['./give-rating.component.scss']
})
export class GiveRatingComponent implements OnInit {
  form: FormGroup;
  httpError: any;


  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<RequestCallBackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let data = this.data.item;
    console.log(data);
    this.form = this.formBuilder.group({
      rating: [1],
      comment: [''],
    });
  }
  send() {
    let response;
    const request = {
      product_id: this.data?.item?.product_id,
      order_id: this.data?.item?.order_id,
      order_item_id: this.data?.item?.id,
      ...(this.form.value)
    }
    
    response = this.orderService.saveRating(request);
    response.then((data: any) => {
      this.dialogRef.close();
      this.helperService.successMessage({ message: data?.message});
    }).catch((error) => {
      this.httpError = error.error;
      this.helperService.errorMessage(error.error);
    });
  }
}
