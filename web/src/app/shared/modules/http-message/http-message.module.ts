import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpMessageComponent } from './http-message.component';


@NgModule({
  declarations: [
    HttpMessageComponent,
  ],
  exports: [
    HttpMessageComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class HttpMessageModule { }
