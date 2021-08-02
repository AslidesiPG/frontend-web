import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpMessageModule } from 'src/app/shared/modules/http-message/http-message.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    CarouselModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpMessageModule,
    MatIconModule,
    HttpMessageModule,
    NgxCaptchaModule,
    MatFormFieldModule

  ]
})
export class AboutModule { }
