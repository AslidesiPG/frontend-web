import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForPriceComponent } from './contact-for-price/contact-for-price.component';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpMessageModule } from '../../modules/http-message/http-message.module';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [ContactForPriceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpMessageModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ContactForPriceModule { }
