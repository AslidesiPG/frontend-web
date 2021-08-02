import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddEditAddressComponent } from 'src/app/shared/components/add-edit-address/add-edit-address/add-edit-address.component';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { CartService } from 'src/app/shared/services/cart.service';

@UntilDestroy()
@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses = [];
  addressSelected: any;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
  ) { }


  ngOnInit(): void {


    /* this.cartService.$address
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.addressSelected = res;
      }); */

    this.userService.getAddress().then((req: any) => {
      this.addresses = req.addresses;
      /* if (!this.addressSelected) {
        this.addressSelected = this.addresses[0];
      } */
    });

  }
  addEditAddress($event, address?: any) {
    $event.stopPropagation();
    this.matDialog.open(AddEditAddressComponent, {
      data: { item: address }
    }).afterClosed()
      //.pipe(untilDestroyed(this))
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
        }
      });
  }
  deleteAddress(address) {
    this.userService.deleteAddress(address.id).then((resp) => {
      const index = this.addresses.indexOf(address);
      this.addresses.splice(index, 1);
      return resp;
    });/* pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        console.log(res);
        this.addresses = this.addresses.map((item) => {
          if (item.id === res.address.id) {
            return res.address;
          }
          else {
            return item;
          }
        });
      }); */
  }
  selectAddress(address) {
    // this.cartService.address = address;
  }
  ngOnDestroy(): void { }
}
