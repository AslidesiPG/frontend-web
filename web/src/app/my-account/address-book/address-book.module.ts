import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressBookRoutingModule } from './address-book-routing.module';
import { AddressBookComponent } from './address-book/address-book.component';
import { MatButtonModule } from '@angular/material/button';
import { AddEditAddressModule } from 'src/app/shared/components/add-edit-address/add-edit-address.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AddressBookComponent],
  imports: [
    CommonModule,
    AddressBookRoutingModule,
    MatButtonModule,
    AddEditAddressModule,
    SharedModule,
    MatIconModule
  ]
})
export class AddressBookModule { }
