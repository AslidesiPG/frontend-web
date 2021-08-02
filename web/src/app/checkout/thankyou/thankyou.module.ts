import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankyouRoutingModule } from './thankyou-routing.module';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    ThankyouRoutingModule,
    MatButtonModule,
    SharedModule,
  ]
})
export class ThankyouModule { }
