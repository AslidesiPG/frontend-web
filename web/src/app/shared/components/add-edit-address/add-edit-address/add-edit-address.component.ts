import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { OrderService } from 'src/app/shared/services/order.service';

@UntilDestroy()
@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit, OnDestroy {

  constructor(
    private helperService: HelperService,
    private userService: UserService,
    private orderService: OrderService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  type: 'phone' | 'address' | 'all' = 'all';
  addressType: 'product' | 'order' = 'product';
  countries = [];
  states = [];
  cites = [];

  httpError: any;

  ngOnInit() {
    const item = this.data.item || {};


    if (this.data && this.data.type) {
      this.type = this.data.type;
    }

    if (this.data && this.data.type) {
      this.addressType = this.data.address_type;
    }

    if (item && item.id) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
    }

    this.form = this.formBuilder.group({
      first_name: [item.first_name || ''],
      last_name: [item.last_name || ''],
      email: [item.email || ''],
      phone_country_code: [item.phone_country_code || '91'],
      phone: [item.phone || ''],
      addressline1: [item.addressline1 || ''],
      addressline2: [item.addressline2 || ''],
      country_id: [item.country_id || ''],
      state_id: [item.state_id || ''],
      city_id: [item.city_id || ''],
      zip_code: [item.zip_code || ''],
    });

    if (this.type === 'all' || this.type === 'address') {
      if (item) {
        if (item.country_id) {
          this.commonService.getState(item.country_id).then((req: any) => {
            this.states = req.data;
          });
        }
        if (item.state_id) {
          this.commonService.getCity(item.state_id).then((req: any) => {
            this.cites = req.data;
          });
        }
      }

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
        this.countries = req.data;
      });
    }
  }

  save() {
    if (this.type === 'all' && this.addressType === 'product') {
      if (this.form.valid) {
        let res;
        if (this.mode === 'create') {
          res = this.userService.addAddress(this.form.value);
        } else {
          res = this.userService.updateAddress(this.data.item.id, this.form.value);
        }

        res.then((data: any) => {
          if (this.mode === 'create') {
            this.helperService.successMessage({ message: 'Address added successfully' });
          } else {
            this.helperService.successMessage({ message: 'Address updated successfully' });
          }
          this.dialogRef.close(data);
        }).catch((error) => {
          this.httpError = error;
        });
      }
    }
    if (this.type === 'phone' && this.addressType === 'order') {
      let response;
      const phone = this.form.value.phone;
      const request = {
        phone_country_code: phone?.dialCode?.replace(/\+/g, ''),
        phone: phone?.number?.replace(/\s+/g, ''),
      }
      response = this.orderService.updateOrderAddress(request, this.data.item.id);
      response.then((data: any) => {
        this.helperService.successMessage({ message: 'Address updated successfully' });
        this.dialogRef.close(data);
      }).catch((error) => {
        this.httpError = error;
      });
    }

    if (this.type === 'address' && this.addressType === 'order') {
      let response2;
       const request = {
        ...(this.form.value),
      }
      delete request.phone;
      response2 = this.orderService.updateOrderAddress(request, this.data.item.id);
      response2.then((data: any) => {
        this.helperService.successMessage({ message: 'Address updated successfully' });
        this.dialogRef.close(data);
      }).catch((error) => {
        this.httpError = error;
      });
    }
  }
  /* getConutrys(){
    this.commonService.getConutry().then((req: any)=>{
      console.log(req);
    });
  } */


  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  ngOnDestroy(): void {
  }

}
