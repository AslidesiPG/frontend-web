import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpMessageModule } from '../../modules/http-message/http-message.module';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [AddEditAddressComponent],
  exports: [AddEditAddressComponent],
  entryComponents: [AddEditAddressComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpMessageModule,
  ]
})
export class AddEditAddressModule { }
