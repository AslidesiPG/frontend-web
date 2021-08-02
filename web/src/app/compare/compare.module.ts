import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare/compare.component';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../shared/components/search/search.module';

@NgModule({
  declarations: [CompareComponent],
  imports: [
    CommonModule,
    SharedModule,
    CompareRoutingModule,
    SearchModule,
  ]
})
export class CompareModule { }
