import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowToBuyRoutingModule } from './how-to-buy-routing.module';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqModule } from 'src/app/shared/components/faq/faq.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HowToBuyComponent],
  imports: [
    CommonModule,
    HowToBuyRoutingModule,
    SharedModule,
    MatExpansionModule,
    FaqModule,
    MatButtonModule,
  ]
})
export class HowToBuyModule { }
