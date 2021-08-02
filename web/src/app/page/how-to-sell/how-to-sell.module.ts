import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowToSellRoutingModule } from './how-to-sell-routing.module';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqModule } from 'src/app/shared/components/faq/faq.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RequestCallBackModule } from 'src/app/shared/components/request-call-back/request-call-back.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [HowToSellComponent],
  imports: [
    CommonModule,
    HowToSellRoutingModule,
    SharedModule,
    MatButtonModule,
    MatExpansionModule,
    FaqModule,
    CarouselModule,
    RequestCallBackModule,
    MatDialogModule,
    
  ]
})
export class HowToSellModule { }
