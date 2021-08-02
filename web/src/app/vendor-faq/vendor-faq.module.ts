import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFaqRoutingModule } from './vendor-faq-routing.module';
import { VendorFaqComponent } from './vendor-faq/vendor-faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { FaqModule } from '../shared/components/faq/faq.module';


@NgModule({
  declarations: [VendorFaqComponent],
  imports: [
    CommonModule,
    VendorFaqRoutingModule,
    MatExpansionModule,
    SharedModule,
    FaqModule,
  ]
})
export class VendorFaqModule { }
