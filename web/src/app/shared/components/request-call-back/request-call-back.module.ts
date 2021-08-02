import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCallBackComponent } from './request-call-back/request-call-back.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpMessageModule } from '../../modules/http-message/http-message.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [RequestCallBackComponent],
  exports: [RequestCallBackComponent],
  entryComponents: [RequestCallBackComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpMessageModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ]
})
export class RequestCallBackModule { }
