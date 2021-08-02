import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getCartTotal } from '@utils';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { AddEditAddressComponent } from 'src/app/shared/components/add-edit-address/add-edit-address/add-edit-address.component';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CartItem } from '../../../../../../libs/models/src/cart';

@UntilDestroy()
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  cart: any = {};
  total: any;
  addresses = [];
  coupons = [];
  addressSelected: any;
  deliverySpeed = 'normal';
  form: FormGroup;
  getCartTotal = getCartTotal;
  loading: boolean;
  cartItems: CartItem[] = [];
  errorMessages: any = [];
  shippingData: any;
  shipping$ = new Subject<any>();

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private helperService: HelperService,
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      coupon: ['', Validators.required],
    });
    this.cartService.$cart
      .pipe(untilDestroyed(this))
      .subscribe((cart) => {
        this.cart = cart;
        this.total = cart.total - cart.coupon_discount;
      });

    this.cartService.$cartItems
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.cartItems = res;
      });

    this.cartService.$address
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.addressSelected = res;
        this.shipping$.next();
      });

    this.shipping$
      .pipe(untilDestroyed(this), debounceTime(300))
      .subscribe(() => {
        this.shippingCharge()
      });

    this.userService.getAddress().then((req: any) => {
      this.addresses = req.addresses;
      if (!this.addressSelected) {
        this.selectAddress(this.addresses[0]);
      }
      else {
        this.shipping$.next();
      }
    });

    this.cartService.getCoupons().then((req: any) => {
      this.coupons = req.data;
      console.log(this.coupons);
    });
  }

  addEditAddress($event, address?: any) {
    $event.stopPropagation();
    this.matDialog.open(AddEditAddressComponent, {
      data: { item: address }
    }).afterClosed()
      .subscribe((res: any) => {
        if (res.address.id && res.address) {
          let update = false;
          this.addresses = this.addresses.map((item) => {
            if (item.id === res.address.id) {
              update = true;
              return res.address;
            }
            else {
              return item;
            }
          });
          if (!update) {
            this.addresses = this.addresses.concat([res.address]);
          }
          if (this.addressSelected.id === res.address.id) {
            this.selectAddress(res.address);
          }
        }
      });
  }

  selectAddress(address) {
    this.cartService.address = address;
    this.addressSelected = address;
    this.shipping$.next();
  }

  selectDeliverySpeed(value) {
    this.deliverySpeed = value;
  }

  async shippingCharge() {

    this.loading = true;
    this.errorMessages = [];
    for (let index = 0; index < this.cartItems?.length; index++) {
      const item = this.cartItems[index];
      const weight = (item?.product?.weight * item?.quantity);

      if (!item?.product?.shipping_free) {
        const request = {
          pickup_postcode: item?.product?.user?.vendor_profile?.zip_code,
          delivery_postcode: this.addressSelected?.zip_code,
          weight: weight,
          cod: 0,
        }
        await this.cartService.getShippingPrice(request).then((resp: any) => {
          item.shipping = resp.data.available_courier_companies[0];

        }).catch((error) => {
          this.errorMessages = this.errorMessages.concat(['<strong>' + item?.product?.name + '</strong> this product not deliverable on this address ']);
          //this.helperService.errorMessage('shipping not available');
        });
      }

    }
    this.loading = false;
    this.cartService.cartItems = this.cartItems;

  }

  CouponSubmit() {
    const request = {
      coupon: this.form.get('coupon').value,
      total: this.cart.total,
    };
    this.cartService.veryfyCouopn(request).then((data: any) => {
      this.helperService.successMessage(data);
    }).catch((error) => {
      this.helperService.errorMessage(error.error);
    });

  }

  removeCoupon() {
    this.cartService.removeCoupon();
  }

  applycoupanbyradio(event,coupon){
    this.form.get("coupon").setValue(coupon.code);
    this.CouponSubmit();
  }

  goPayment() {
    if (!this.cartService.address) {
      this.helperService.errorMessage('Please select address');
      return;
    }

    if (!this.deliverySpeed) {
      this.helperService.errorMessage('Please select delivery speed');
      return;
    }
    this.router.navigate(['/payment']);
  }

  getDeliveyDate(type) {
    if (type === 'one-day') {
      return moment().add(1, 'day').format('DD-MM-YYYY');
    }
    if (type === 'two-day') {
      return moment().add(2, 'day').format('DD-MM-YYYY') + ' - ' + moment().add(3, 'day').format('DD-MM-YYYY');
    }
    if (type === 'normal') {
      return moment().add(3, 'day').format('DD-MM-YYYY') + ' - ' + moment().add(5, 'day').format('DD-MM-YYYY');
    }
  }
  ngOnDestroy(): void { }
}
