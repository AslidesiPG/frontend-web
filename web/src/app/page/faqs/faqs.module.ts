import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqModule } from 'src/app/shared/components/faq/faq.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FaqsComponent],
  imports: [
    CommonModule,
    FaqsRoutingModule,
    SharedModule,
    FaqModule,
  ]
})
export class FaqsModule { }
